import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './header.style.css';


class Header extends Component {



    render() {

        const { level, changeLevel } = this.props



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
            </header>
        )
    }
}

export default Header;