import React, { Component } from 'react'


import Button from '@material-ui/core/Button';

import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    picker: {
        width: '100% !important',
        marginTop: '2rem'
    },
    addColor: {
        marginTop: '1rem',
        padding: '.8rem',
        width: '100%',
        fontSize: '1.5rem'
    },
    colorInput: {
        width: '100%',
        height: '70px'
    }
}

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: 'teal',
            newColorName: ''
        }

    }


    changeColor = (newColor) => {

        this.setState({ currentColor: newColor.hex })
    }

    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value })

    }

    handleSubmit = () => {
        const newColor = { color: this.state.currentColor, name: this.state.newColorName }

        this.props.addNewColor(newColor);
    }

    componentDidMount() {
        // custom rule will have name 'isColorNameUnique'
        ValidatorForm.addValidationRule('isColorNameUnique', value => {
            return this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });




        ValidatorForm.addValidationRule('isColorUnique', () => {
            return this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            );
        });

    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <ChromePicker
                    color={this.state.currentColor}
                    onChangeComplete={this.changeColor}
                    className={classes.picker}
                />

                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        value={this.state.newColorName}
                        name='newColorName'
                        placeholder='Color Name'
                        variant='filled'
                        className={classes.colorInput}
                        onChange={this.handleChange}
                        validators={['required', 'isColorUnique', 'isColorNameUnique']}
                        errorMessages={['this field is required',
                            'this color is already being used', 'This color name is already being used..']}
                    />

                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.addColor}

                        style={{ backgroundColor: this.state.currentColor }}
                        type="submit"
                    >Add Color</Button>

                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);