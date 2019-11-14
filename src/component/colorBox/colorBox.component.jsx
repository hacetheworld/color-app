import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import './colorBox.style.css';

class ColorBox extends Component {

    constructor(props) {
        super(props);
        this.state = { isCopied: false };
    }

    changeCopyState = () => {
        this.setState({ isCopied: true }, () => {
            setTimeout(() => this.setState({ isCopied: false }), 2000)
        });

    }

    render() {

        const { name, background, id, paletteId, showLink } = this.props;

        const isDarkColor = chroma(background).luminance() <= 0.08;



        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState} >
                <div style={{ background }} className='ColorBox'>

                    <div style={{ background }} className={`copy-overlay ${this.state.isCopied ? 'show' : ''}`}></div>
                    <div className={`copy-message ${this.state.isCopied ? 'show' : ''}`}>
                        <h1 className={!isDarkColor && 'black-text'}>Copied!</h1>
                        <p className={!isDarkColor && 'black-text'}> {background}</p>
                    </div>

                    <div className='copy-container'>
                        <div className='box-content'>
                            <span className={isDarkColor && 'light-text'}>{name}</span>
                        </div>
                        <button className={`copy-button ${!isDarkColor && 'black-text'}`}>Copy</button>
                    </div>

                    {showLink && (<Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                        <span className={`see-more ${!isDarkColor && 'black-text'}`}>More</span>

                    </Link>)}



                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;