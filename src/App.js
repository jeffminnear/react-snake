import React, { Component } from 'react';
import Square from './Square';
import './App.css';

const unit = [5, 'five'];

const keys = {
    '37': 'ArrowLeft',
    '38': 'ArrowUp',
    '39': 'ArrowRight',
    '40': 'ArrowDown',
    left: 37,
    up: 38,
    right: 39,
    down: 40
}

const move = (x, m) => {
    let length = unit[0] * unit[0];
    if (x < 0) {
        return move(length + x);
    }
    return x % length;
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 100,
            gameStarted: false,
            length: 0,
            headPosition: null
        }
    }

    getGrid = () => {
        let squares = [];

        for (let i = 0; i < (unit[0] * unit[0]); i++) {
            squares.push(<Square key={i} active={(this.state.headPosition === i)} width={this.state.width} handleClick={() => this.handleGridSpaceClick(i)} />);
        }

        return squares;
    }

    handleGridSpaceClick = (i) => {
        if (!this.state.gameStarted) {
            this.setState({
                gameStarted: true,
                headPosition: i
            })
        } else {
            console.log(this.state.headPosition);
        }
    }

    handleKeyPress = (e) => {
        let code = e.keyCode;
        if (keys[code]) {
            e.preventDefault();
        }

        const { gameStarted, headPosition } = this.state;
        if (gameStarted && headPosition !== null) {
            switch (code) {
                case keys.left:
                    this.setState({ headPosition: move(headPosition - 1) });
                    break;
                case keys.up:
                    this.setState({ headPosition: move(headPosition - unit[0]) });
                    break;
                case keys.right:
                    this.setState({ headPosition: move(headPosition + 1) });
                    break;
                case keys.down:
                    this.setState({ headPosition: move(headPosition + unit[0]) });
                    break;
                default:
                    break;
            }
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.getGridSpaceHeight);
        window.addEventListener('keydown', this.handleKeyPress);
        this.getGridSpaceHeight();
    }

    componentWillUnmount() {
        window.removeEventListener('resize');
        window.removeEventListener('keydown');
    }

    getGridSpaceHeight = () => {
        let containerWidth = document.getElementsByClassName('grid container segment')[0].offsetWidth;
        if (window.innerWidth > 767) {
            this.setState({ width: containerWidth / unit[0] });
        } else {
            this.setState({ width: containerWidth });
        }
    }

    render() {
        return (
            <div className={`ui raised ${unit[1]} column stackable grid container segment`}>
                {this.getGrid()}
            </div>
        );
    }
}

export default App;
