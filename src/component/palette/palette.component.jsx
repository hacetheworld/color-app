import React, { Component } from 'react';
import ColorBox from '../colorBox/colorBox.component'
import './palette.style.css';

export default class Palette extends Component {
    render() {
        const colorBoxes = this.props.colors.map(color => (
            <ColorBox background={color.color} name={color.name} />
        ))
        return (
            <div className='Palette'>
                {/* Navbars will go here */}
                <div className='Palette-colors'>

                    {colorBoxes}
                </div>

                {/* Footer */}
            </div>
        )
    }
}