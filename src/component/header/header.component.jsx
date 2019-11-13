import React, { Component } from 'react'
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import 'rc-slider/assets/index.css';
import './header.style.css';


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            format: 'hex'
        }
    }

    handleChange = (e) => {

        this.setState({ format: e.target.value }, () => {
            this.props.handleChange(this.state.format);
        })

    }


    render() {

        const { level, changeLevel } = this.props
        const { format } = this.state;


        return (
            <header className='navbar'>
                <div className='logo'>
                    <a href='/'> Color-App</a>

                </div>

                <div className='slider-conatiner'>
                    <span>Level:{level}</span>
                    <div className='slider'>
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                            onAfterChange={changeLevel}
                            step={100} />

                    </div>
                </div>
                <div className='select-container'>
                    <Select value={format} onChange={this.handleChange}>
                        <MenuItem value='hex' >HEX-#fff
            </MenuItem>
                        <MenuItem value='rgb' >RGB-rgb(255,255,255)
            </MenuItem>
                        <MenuItem value='rgba' >RGBA-rgba(255,255,255,1.0)
            </MenuItem>
                    </Select>
                </div>

            </header>
        )
    }
}

export default Header;