import React, { Component } from "react";
import ReactDOM from "react-dom";
import CheckBox from "./components/CheckBox";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processType: [
        {
          typeCode: "unhandle",
          name: "待处理",
          isChecked: false
        },
        {
          typeCode: "handling",
          name: "处理中",
          isChecked: false
        },
        {
          typeCode: "done",
          name: "已完成",
          isChecked: false
        }
      ],
      filterList: []
    };
    this._onReset = this._onReset.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
  }

  _renderCheckBox(data) {
    return (
      <li key={data.typeCode}>
        <CheckBox
          onClick={this._onCheck.bind(this, data)}
          isChecked={data.isChecked}
          rightText={data.name}
        />
      </li>
    );
  }

  _renderView(data) {
    if (!data || data.length === 0) return;
    var len = data.length;
    var views = [];
    for (var i = 0; i < len; i++) {
      views.push(this._renderCheckBox(data[i]));
    }
    return views;
  }

  _onCheck(data) {
    data.isChecked = !data.isChecked;
    const index = this.state.filterList.indexOf(data.typeCode);
    if (data.isChecked && index === -1) {
      this.setState(state => {
        state.filterList.push(data.typeCode);
        return {
          filterList: state.filterList
        };
      });
    }
    if (!data.isChecked && index !== -1) {
      this.setState(state => {
        state.filterList.splice(index, 1);
        return {
          filterList: state.filterList
        };
      });
    }
  }

  _onReset() {
    const processType = this.state.processType.map(item => {
      item.isChecked = false;
      return item;
    });
    this.setState({ processType });
    this.setState({ filterList: [] });
  }

  _onConfirm() {
    console.log(this.state.filterList);
  }

  render() {
    return (
      <div className="App">
        <ul className="checkList">
          {this._renderView(this.state.processType)}
        </ul>
        <div className="btnContainer">
          <button onClick={this._onReset}>重置</button>
          <button onClick={this._onConfirm}>确定</button>
        </div>
        <div>{this.state.filterList.map(item => item)}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
