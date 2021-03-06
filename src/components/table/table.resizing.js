import {$} from '../../core/dom';

export const resizing = (event, $root) => {
    return new Promise((resolve) => {
        const $resizer = $(event.target);
        const $parent = $resizer.closest('[data-type=resizable]');
        const coords = $parent.getCoords();
        const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
        const type = $resizer.data.resize;
        let value;

        $resizer.css({opacity: 1, [type === 'col' ? 'bottom' : 'right']: `${type === 'col' ? '-100vh' : '-100vw'}`});
    
        document.onmousemove = (e) =>{
            if(type === 'col'){
                const delta = e.pageX - coords.right;
                value = coords.width + delta;
                $resizer.css({right: -delta + 'px'});
            } else {
                const delta = e.pageY - coords.bottom;
                value = coords.height + delta;
                $resizer.css({bottom: -delta + 'px'});
            }
    
        }
    
        document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
            if(type === 'col'){
                $parent.css({width: value + 'px'});
                cells.forEach((el) => {el.style.width = value + 'px';});
            } else {
                $parent.css({height: value + 'px'});
            }

            resolve({
                value,
                id: $parent.data[type],
                type: type
            });

            $resizer.css({opacity: 0, bottom: 0, right: 0})
        }
    });
}