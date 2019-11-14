import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
        const { name, background, id, paletteId } = this.props;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState} >
                <div style={{ background }} className='ColorBox'>

                    <div style={{ background }} className={`copy-overlay ${this.state.isCopied ? 'show' : ''}`}></div>
                    <div className={`copy-message ${this.state.isCopied ? 'show' : ''}`}>
                        <h1>Copied!</h1>
                        <p> {background}</p>
                    </div>

                    <div className='copy-container'>
                        <div className='box-content'>
                            <span>{name}</span>
                        </div>
                        <button className='copy-button'>Copy</button>
                    </div>
                    <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                        <span className='see-more'>More</span>

                    </Link>

                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;