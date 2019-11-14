import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ColorBox from '../colorBox/colorBox.component'

import Header from '../header/header.component';
import PaletteFooter from '../palette/paletteFooter.component'


class SingleColorPalette extends Component {

    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);

        this.state = {
            format: 'hex'
        }

    }

    changeFormat = (val) => {
        this.setState({ format: val });
    }


    gatherShades(palette, colorId) {
        let shades = [];
        let allColors = palette.colors;

        for (let key in allColors) {
            shades = shades.concat(allColors[key].filter(color => color.id === colorId))
        }
        return shades.slice(1);
    }



    render() {
        const { paletteName, emoji, id } = this.props.palette;

        const { format } = this.state;
        const colorBoxes = this._shades.map(color => (

            <ColorBox
                key={color.name}
                name={color.name}
                background={color[format]}
                showLink={false}
            />
        ))
        return (
            <div className='SingleColorPalette Palette'>
                <Header handleChange={this.changeFormat} showSlider={false} />
                <div className='Palette-colors'>
                    {colorBoxes}
                    <div className='goBack ColorBox'>
                        <Link to={`/palette/${id}`} className=' back-button'>Go Back</Link>

                    </div>
                </div>

                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}


export default SingleColorPalette;