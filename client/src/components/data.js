// import { useState } from "react";
// import "./Data.css";
// import { Component } from "react";
// function Data(props) {
//   const [selected, setSelected] = useState(true);
//   let idx = props.idx;
//   let data = props.data;
//   let dataStyle = {
//     borderTop: "1px solid #ccc",
//     width: "12em",
//     height: "2em",
//     overflowY: "scroll",
//     hover: "pointer",
//     hoverColor: "blue",
//     padding: "0.25em",
//   };
//   if (!selected) {
//     dataStyle = {
//       borderTop: "1px solid #ccc",
//       backgroundColor: "darkblue",
//       color: "white",
//       width: "12em",
//       height: "2em",
//       overflowY: "scroll",
//       hover: "pointer",
//       hoverColor: "blue",
//       padding: "0.25em",
//     };
//   }
//   return (
//     <div
//       className="data"
//       idx={idx}
//       data={data}
//       style={dataStyle}
//       onClick={() => {
//         setSelected(!selected);
//         console.log(selected);
//       }}
//     >
//       {/*Make DataBase API Calls here*/}
//       <i>{data}</i>
//     </div>
//   );
// }

// class Data extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selected: false,
//     };
//     this.toggleSelected = this.toggleSelected.bind(this);
//     // this.setSelectedFalse = this.setSelectedFalse.bind(this);
//   }

//   componentWillReceiveProps(nextProps) {
//     this.forceUpdate();
//     this.setState({
//       selected: false,
//     });
//   }

//   toggleSelected() {
//     this.setState((state) => ({
//       selected: !state.selected,
//     }),
//     () => {
//       // After the state has been updated, call a function to update the selectedData array
//       this.props.updateSelectedData(this.props.data, this.state.selected);
//     });
//     console.log(this.state.selected);
//     // this.props.cleared = false;
//   }
//   // setSelectedFalse() {
//   //   this.setState({
//   //     selected: false,
//   //   });
//     // console.log(this.state.selected);
//   // }
//   render() {
//     return (
//       <div
//         className="data"
//         idx={this.props.idx}
//         data={this.props.data}
//         style={
//           !this.state.selected
//             ? {}
//             : {
//                 backgroundColor: "darkblue",
//                 color: "white",
//               }
//         }
//         onClick={this.toggleSelected}
//       >
//         <i>{this.props.data}</i>
//       </div>
//     );
//   }
// }

// export default Data;
import React, { useState, useImperativeHandle, forwardRef } from "react";
import "./Data.css";

const Data = forwardRef((props, ref) =>{
  const [selected, setSelected] = useState(false);

  useImperativeHandle(ref, () => ({
    resetSelectedState() {
      setSelected(false);
    }
  }));

  const toggleSelected = () => {
    setSelected((prevState) => !prevState); // Use functional update
    console.log(!selected); // Log the updated value
  
    props.updateSelectedData(props.data, !selected); // Pass the inverted value
    props.handleClearedStatusChange(false);
  };

  return (
    <div
      className="data"
      idx={props.idx}
      data={props.data}
      style={
        selected
          ? {
              backgroundColor: "darkblue",
              color: "white",
            }
          : {}
      }
      onClick={toggleSelected}
    >
      <i>{props.data}</i>
    </div>
  );
}) 

export default Data;
