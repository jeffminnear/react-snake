import React, { Component } from 'react';

class Square extends Component {
    render() {
        return (
            <div
                className="column grid-space"
                style={{height: this.props.width + 'px'}}
                onClick={this.props.handleClick}
            >
                {this.props.active ? 'HEAD' : ''}
            </div>
        );
    }
}

export default Square;
