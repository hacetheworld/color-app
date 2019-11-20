import React from 'react';
import DraggableColorBox from './dragable.component'
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({ colors, deletePalette }) => {
    return (
        <div style={{ height: '100%' }}>
            {colors.map((color, i) => (
                <DraggableColorBox
                    index={i}
                    key={color.name}
                    color={color.color}
                    name={color.name}
                    handleClick={() => deletePalette(color.name)} />
            ))}
        </div>
    );
})

export default DraggableColorList;
