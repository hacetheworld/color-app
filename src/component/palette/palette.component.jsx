import React, { Component } from 'react';
import ColorBox from '../colorBox/colorBox.component'
import Header from '../header/header.component'
import PaletteFooter from './paletteFooter.component'
import './palette.style.css';
import { withStyles } from '@material-ui/styles'


const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },

    PaletteColors: {
        height: " 90%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    }

}





class Palette extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: 'hex'
        }
    }

    changeLevel = (level) => {
        this.setState({ level })
    }
    changeFormat = (val) => {
        this.setState({ format: val });
    }

    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;

        const { classes } = this.props;

        const { level, format } = this.state;

        const colorBoxes = colors[level].map(color => (
            <ColorBox
                id={color.id}
                key={color.id}
                background={color[format]}
                name={color.name}
                paletteId={id}
                showLink={true}
            />
        ))
        return (
            <div className={classes.Palette}>
                <Header level={level} handleChange={this.changeFormat} changeLevel={this.changeLevel} showSlider={true} />

                <div className={classes.PaletteColors}>
                    {colorBoxes}
                </div>

                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}



export default withStyles(styles)(Palette)