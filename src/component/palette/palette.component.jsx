import React, { Component } from 'react';
import ColorBox from '../colorBox/colorBox.component'
import Header from '../header/header.component'

import './palette.style.css';
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
                <Header level={level} changeLevel={this.changeLevel} />
                {/* Navbars will go here */}
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>

                {/* Footer */}
            </div>
        )
    }
}