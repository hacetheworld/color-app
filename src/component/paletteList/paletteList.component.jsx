import React, { Component } from 'react';
import MiniPalette from '../miniPalette/miniPalette.component'
import './paletteList.style.css';
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/styles';




const styles = {

    root: {
        backgroundColor: 'blue',

        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    container: {
        width: '70%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: '#fff',
        alignItems: 'center',
        "& a": {
            textDecoration: 'none',
            color: '#fff'
        }
    },
    palettes: {

        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,30%)',
        gridGap: '3%'
    }

}


class PaletteList extends Component {

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }


    render() {
        const { palettes, classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Color</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette => (

                            <MiniPalette {...palette} handleClick={() => this.goToPalette(palette.id)} />
                        ))}
                    </div>


                </div>

            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);