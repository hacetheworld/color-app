import React, { Component } from 'react'
import DraggableColorList from './draggableColorList.component';

import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import arrayMove from 'array-move';



const drawerWidth = 340;

const Styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
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
});



class NewPaletteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawerOpen: false,
            currentColor: 'teal',
            newColorName: "",
            newPaletteName: '',
            colors: [{ color: 'blue', name: 'blue' }]
        }
    }
    addNewColor = () => {

        const newColor = { color: this.state.currentColor, name: this.state.newColorName }
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

    changeColor = (newColor) => {

        this.setState({ currentColor: newColor.hex })
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

    savePalette = () => {
        let newName = this.state.newPaletteName;
        const newPalette = {
            paletteName: newName,
            id: newName.toLocaleLowerCase().replace(/ /g, "-"),
            emoji: 'PK',
            colors: this.state.colors
        };
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    }


    componentDidMount() {
        // custom rule will have name 'isColorNameUnique'
        ValidatorForm.addValidationRule('isColorNameUnique', value => {
            return this.state.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });


        // custom rule will have name 'isColorNameUnique'
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });

        ValidatorForm.addValidationRule('isColorUnique', () => {
            return this.state.colors.every(
                ({ color }) => color !== this.state.currentColor
            );
        });

    }


    render() {

        const { classes } = this.props

        return (
            <div className={classes.root} >
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.isDrawerOpen,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, this.state.isDrawerOpen && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Persistent drawer
              </Typography>

                        <ValidatorForm onSubmit={this.savePalette}>
                            <TextValidator name='newPaletteName' value={this.state.newPaletteName} onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['this field is required', 'This palette name is already being used..']}

                            />

                            <Button variant='contained' color='primary' type='submit'>Save Palette</Button>

                        </ValidatorForm>


                    </Toolbar>
                </AppBar>
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

                    <Typography variant='h4'>Design Your Palette</Typography>
                    <div>
                        <Button variant='contained' color='secondary'>Clear Palette</Button>
                        <Button variant='contained' color='primary'>Random Color</Button>
                    </div>


                    <ChromePicker color={this.state.currentColor} onChangeComplete={this.changeColor
                    } />

                    <ValidatorForm onSubmit={this.addNewColor}>
                        <TextValidator
                            value={this.state.newColorName}
                            name='newColorName'
                            onChange={this.handleChange}
                            validators={['required', 'isColorUnique', 'isColorNameUnique']}
                            errorMessages={['this field is required',
                                'this color is already being used', 'This color name is already being used..']}
                        />

                        <Button
                            variant='contained' color='primary'
                            style={{ backgroundColor: this.state.currentColor }}
                            type="submit"
                        >Add Color</Button>

                    </ValidatorForm>

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
