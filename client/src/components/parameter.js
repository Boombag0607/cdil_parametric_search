// import Data from "./Data";
// import "./Parameter.css";
// import React, { Component } from "react";

// // let dataList = [];
// // function Parameter(props) {
// //   const [cleared, setCleared] = useState(true);
// //   let data = props.data; // Query database
// //   let name = props.name;
//   // let data = [
//   //   "Diode",
//   //   "Transistor",
//   //   "Power Transistor",
//   //   "xx",
//   //   "xxx",
//   //   "xxxx",
//   //   "xxxxxx",
//   //   "xxxxxx",
//   //   "xxxxxxxx",
//   // ];
// //   let dataList = [];
// //   data.forEach((element, index) => {
// //     dataList.push(<Data key={"1"+index} data={element}></Data>);
// //   });
// //   return (
// //     <div
// //       className="parameter"
// //       style={{
// //         border: "1px solid #ccc",
// //         width: "12em",
// //         height: "12em",
// //         overflowY: "scroll",
// //         overflowX: "hidden",
// //       }}
// //     >
// //       <div className="parameter-heading">
// //         <strong>{name}</strong>
// //       </div>
// //       <button
// //         style={{
// //           border: "0px solid #ccc",
// //           height: "2em",
// //           width: "100%",
// //           overflowY: "scroll",
// //           overflowX: "hidden",
// //         }}
// //         onClick={() => {
// //             setCleared(true);
// //             console.log(cleared);
// //         }}
// //       >
// //         Clear Filter
// //       </button>
// //       <div>{dataList}</div>
// //     </div>
// //   );
// // }

// class Parameter extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cleared: true,
      
//     };
//     this.makeDataList = this.makeDataList.bind(this);
//     this.handleClick = this.handleClick.bind(this);
//   }

//   makeDataList(cleared) {
//     let dataList = [];
//     this.props.data.forEach((element, index) => {
//       dataList.push(
//         <Data
//           key={"1" + index}
//           data={element}
//           cleared={cleared}
//           selected={this.props.selected}
//         ></Data>
//       );
//     });
//     return dataList;
//   }

//   handleClick() {
//     this.makeDataList(true);
//     this.setState({
//       cleared: true,
//     });
//     console.log(this.state.cleared);
    
//   }

//   render() {
//     return (
//       <div className="parameter">
//         <div className="parameter-heading">
//           <strong>{this.props.name}</strong>
//         </div>
//         <button
//           onClick={this.handleClick}
//           className="clear-button"
//         >
//           Clear Filter
//         </button>

//         <div>{this.makeDataList()}</div>
//       </div>
//     );
//   }
// }

// export default Parameter;

import React, { useState, useRef } from "react";
import Data from "./Data";
import "./Parameter.css";

function Parameter(props) {
  const [cleared, setCleared] = useState(true);
  const [selectedData, setSelectedData] = useState([]);
  const dataRef = useRef(null);
  let paramValObj = {};

  const updateSelectedData = (data, isSelected) => {
    if (isSelected) {
      setSelectedData((prevSelectedData) => [...prevSelectedData, data]);
    } else {
      setSelectedData((prevSelectedData) =>
        prevSelectedData.filter((item) => item !== data)
      );
    }
    paramValObj[props.name] = selectedData;
    props.updateSelectedDataInApp(paramValObj);
  };

  const handleClearedStatusChange = (newStatus) => {
    setCleared(newStatus);
    console.log(cleared);
    if (newStatus) {setSelectedData([]);}
  };

  const makeDataList = (clearedStatus) => {
    let dataList = [];
    props.data.forEach((element, index) => {
      dataList.push(
        <Data
          key={"1" + index}
          data={element}
          clearedStatus = {clearedStatus}
          updateSelectedData={updateSelectedData}
          handleClearedStatusChange={handleClearedStatusChange}
          ref={dataRef}
        ></Data>
      );
    });
    return dataList;
  };

  const handleClick = () => {
    makeDataList(true);
    setCleared(true);
    console.log(cleared);
  };

  return (
    <div className="parameter">
      <div className="parameter-heading">
        <strong>{props.name}</strong>
      </div>
      <button onClick={handleClick} className="clear-button">
        Clear Filter
      </button>
      <div>{makeDataList()}</div>
    </div>
  );
}

export default Parameter;
