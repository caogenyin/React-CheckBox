import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    rightText: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    isChecked: PropTypes.bool
  };

  static defaultProps = {
    isChecked: false
  };

  _renderRight() {
    if (!this.props.rightText) {
      return null;
    }
    return <div>{this.props.rightText}</div>;
  }

  render() {
    return (
      <div
        onClick={this.props.onClick}
        className={this.props.isChecked ? "active" : "normal"}
      >
        {this._renderRight()}
      </div>
    );
  }
}
