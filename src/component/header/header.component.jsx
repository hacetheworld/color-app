import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';
import './header.style.css';


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            format: 'hex',
            open: false
        }
    }

    // handleClick = () => {
    //     setOpen(true);
    // };

    handleClose = () => {
        this.setState({ open: false })
    }

    handleFormatChange = (e) => {

        this.setState({ format: e.target.value, open: true }, () => {
            this.props.handleChange(this.state.format);
        })

    }


    render() {

        const { level, changeLevel, showSlider } = this.props
        const { format, open } = this.state;


        return (
            <header className='navbar'>
                <div className='logo'>
                    <Link to='/'>Color-App</Link>

                </div>

                {showSlider && (<div className='slider-conatiner'>
                    <span>Level:{level}</span>
                    <div className='slider'>
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                            onAfterChange={changeLevel}
                            step={100} />

                    </div>
                </div>)}
                <div className='select-container'>
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value='hex' >HEX-#fff
            </MenuItem>
                        <MenuItem value='rgb' >RGB-rgb(255,255,255)
            </MenuItem>
                        <MenuItem value='rgba' >RGBA-rgba(255,255,255,1.0)
            </MenuItem>
                    </Select>
                </div>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Format Changed to {format}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </header>
        )
    }
}

export default Header;