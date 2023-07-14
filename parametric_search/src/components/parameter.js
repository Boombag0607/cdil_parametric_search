import Data from "./data";
import "./parameter.css";
import React, { useState } from "react";
// import { Component } from "react";

function Parameter(props) {
  const [cleared, setCleared] = useState(false);
  let name = props.name;
  let data = [
    "Diode",
    "Transistor",
    "Power Transistor",
    "xx",
    "xxx",
    "xxxx",
    "xxxxxx",
    "xxxxxx",
    "xxxxxxxx",
  ]; // Query database
  let dataList = [];
  data.forEach((element, index) => {
    dataList.push(<Data key={index} data={element}></Data>);
  });
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
        <strong>{name}</strong>
      </div>
      <button
        style={{
          border: "0px solid #ccc",
          height: "2em",
          width: "100%",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
        onClick={() => {
          setCleared(true);
          console.log(cleared);
        }}
      >
        Clear Filter
      </button>
      <div>{dataList}</div>
    </div>
  );
}

// class Parameter extends Component {
//     contructor(props) {
//         super(props);
//         this.state = {
//             name: props.name,
//             data: props.data,
//         }
//         this.handleClick = this.handleClick.bind(this);
//     }

//     makeDataList() {
//         let dataList = [];
//         this.state.data.forEach((element, index) => {
//             dataList.push(<Data key={index} data={element}></Data>);
//         });
//         return dataList;
//     }

//     handleClick() {
//         console.log('Cleared');
//     }

//     render() {
//         return (
//             <div
//       className="parameter"
//       style={{
//         border: "1px solid #ccc",
//         width: "12em",
//         height: "12em",
//         overflowY: "scroll",
//         overflowX: "hidden",
//       }}
//     >
//       <div
//         className="parameter-heading"
//       >
//         <strong>{this.state.name}</strong>
//       </div>
//       <button style={{
//         border: "0px solid #ccc",
//         height: '2em',
//         width: '100%',
//         overflowY: "scroll",
//         overflowX: "hidden",
//       }}
//       onClick= {
//         this.handleClick
//       }>Clear Filter</button>
//       <div>{dataList}</div>
//     </div>
//         )
//     }
// }

export default Parameter;
