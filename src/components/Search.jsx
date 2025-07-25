import React from "react";

class Search extends React.Component {
    state = {
        search: ''
    }

    handleKeyDown = (event) => {
        const trimmed = this.state.search.trim();

        if (
            event.key === "Enter"
            && this.props.onHandleKeyDown
            && trimmed !== ''
        ) {
            this.props.onHandleKeyDown(this.state.search);
        }
    }

    handleButtonClick = (event) => {
        const trimmed = this.state.search.trim();
        if (this.props.onHandleKeyDown && trimmed !== '')
            this.props.onHandleKeyDown(this.state.search);
    }

    render() {
        return (
            <div className="row">
                <div className="input-field">
                    <input
                        placeholder="type something"
                        type="text"
                        className="validate"
                        value={this.state.search}
                        onChange={(event) => this.setState({search: event.target.value})}
                        onKeyDown={this.handleKeyDown}
                    />
                    <button
                        style={searchButtonStyle}
                        className="btn"
                        onClick={this.handleButtonClick}
                    >Search</button>
                </div>
            </div>
        );
    }
}

export { Search }

const searchButtonStyle = {
    position: 'absolute',
    top: 0,
    right: '0.5rem'
}