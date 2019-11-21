import React, { Component } from 'react'
import DraggableColorList from './draggableColorList.component';
import clsx from 'clsx';
import ColorPickerForm from './colorpickerForm';

import PaletteFormNav from './paletteForm.cmponenet'
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

import arrayMove from 'array-move';



const drawerWidth = 370;

const Styles = theme => ({
    root: {
        display: 'flex',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        display: 'flex',
        alignItems: 'center'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        height: '90vh',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    container: {
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        width: '100%'
    },
    button: {
        width: '49%'
    }


});



class NewPaletteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawerOpen: true,
            colors: this.props.palettes[0].colors
        }
    }
    addNewColor = (newColor) => {


        if (this.state.colors.length < 19) {
            this.setState({ colors: [...this.state.colors, newColor] })
        } else {
            alert('You have reached the limit')
        }
    }

    handleDrawerOpen = () => {
        this.setState({ isDrawerOpen: true })
    };
    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value })

    }
    handleDrawerClose = () => {
        this.setState({ isDrawerOpen: false })
    };


    addRandomColor = () => {

        const allColors = this.props.palettes.map(p => p.colors).flat();

        let rand = Math.floor(Math.random() * allColors.length);

        const RandColor = allColors[rand]
        if (this.state.colors.length < 19) {
            this.setState({ colors: [...this.state.colors, RandColor] })
        } else {
            alert('You have reached the limit')
        }
    }
    clearPalette = () => {
        this.setState({ colors: [] })

    }
    deletePalette = (colorName) => {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        })
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));

    }

    savePalette = (newPaletteName) => {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLocaleLowerCase().replace(/ /g, "-"),
            emoji: 'PK',
            colors: this.state.colors
        };
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    }





    render() {

        const { classes, palettes } = this.props
        const isDrawerOpen = this.state.isDrawerOpen;

        return (
            <div className={classes.root} >
                <PaletteFormNav
                    open={isDrawerOpen}
                    palettes={palettes}
                    handleSubmit={this.savePalette}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.isDrawerOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant='contained'
                                className={classes.button} color='secondary'
                                onClick={this.clearPalette}>Clear Palette</Button>

                            <Button
                                variant='contained'
                                className={classes.button} color='primary' onClick={this.addRandomColor}>Random Color</Button>
                        </div>

                        <ColorPickerForm
                            addNewColor={this.addNewColor}
                            colors={this.state.colors}
                        />
                    </div>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: this.state.isDrawerOpen,
                    })}
                >
                    <div className={classes.drawerHeader} />

                    <DraggableColorList
                        colors={this.state.colors}
                        deletePalette={this.deletePalette}
                        axis="xy"
                        onSortEnd={this.onSortEnd}

                    />

                </main>
            </div >
        );
    }
}

export default withStyles(Styles, { withTheme: true })(NewPaletteForm)
