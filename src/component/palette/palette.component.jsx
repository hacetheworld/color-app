import React, { Component } from 'react';
import ColorBox from '../colorBox/colorBox.component'
import './palette.style.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class Palette extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: 500
        }
    }

    changeLevel = (level) => {
        this.setState({ level })
    }

    render() {
        const { colors } = this.props.palette;
        const { level } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ))
        return (
            <div className='Palette'>
                <Slider defaultValue={level} min={100} max={900} onAfterChange={this.changeLevel} step={100} />
                {/* Navbars will go here */}
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>

                {/* Footer */}
            </div>
        )
    }
}