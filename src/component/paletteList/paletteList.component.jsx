import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './paletteList.style.css';

class PaletteList extends Component {
    render() {
        const { palettes } = this.props;
        return (
            <div>
                {palettes.map(palette => (
                    <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>

                ))}
            </div>
        )
    }
}

export default PaletteList;