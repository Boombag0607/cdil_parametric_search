import Data from "./data";
import "./parameter.css";
// import React, { useState } from "react";
import React, { Component } from "react";

// let dataList = [];
// function Parameter(props) {
//   const [cleared, setCleared] = useState(true);
//   let data = props.data; // Query database
//   let name = props.name;
  // let data = [
  //   "Diode",
  //   "Transistor",
  //   "Power Transistor",
  //   "xx",
  //   "xxx",
  //   "xxxx",
  //   "xxxxxx",
  //   "xxxxxx",
  //   "xxxxxxxx",
  // ];
//   let dataList = [];
//   data.forEach((element, index) => {
//     dataList.push(<Data key={"1"+index} data={element}></Data>);
//   });
//   return (
//     <div
//       className="parameter"
//       style={{
//         border: "1px solid #ccc",
//         width: "12em",
//         height: "12em",
//         overflowY: "scroll",
//         overflowX: "hidden",
//       }}
//     >
//       <div className="parameter-heading">
//         <strong>{name}</strong>
//       </div>
//       <button
//         style={{
//           border: "0px solid #ccc",
//           height: "2em",
//           width: "100%",
//           overflowY: "scroll",
//           overflowX: "hidden",
//         }}
//         onClick={() => {
//             setCleared(true);
//             console.log(cleared);
//         }}
//       >
//         Clear Filter
//       </button>
//       <div>{dataList}</div>
//     </div>
//   );
// }

class Parameter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cleared: true
    };
    this.makeDataList = this.makeDataList.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  makeDataList(cleared) {
    let dataList = [];
    this.props.data.forEach((element, index) => {
      dataList.push(
        <Data
          key={"1" + index}
          data={element}
          cleared={cleared}
        ></Data>
      );
    });
    return dataList;
  }

  handleClick() {
    this.makeDataList(true);
    this.setState({
      cleared: true,
    });
    console.log(this.state.cleared);
    
  }

  render() {
    return (
      <div
        className="parameter"
        style={{
          border: "1px solid #ccc",
          width: "12em",
          height: "12em",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <div className="parameter-heading">
          <strong>{this.props.name}</strong>
        </div>
        <button
          style={{
            border: "0px solid #ccc",
            height: "2em",
            width: "100%",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
          onClick={this.handleClick}
          className="clear-button"
        >
          Clear Filter
        </button>

        <div>{this.makeDataList()}</div>
      </div>
    );
  }
}

export default Parameter;
