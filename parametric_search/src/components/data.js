// import { useState } from "react";
import "./data.css";
import { Component } from "react";

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

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: true,
        };
        this.changeSelected = this.changeSelected.bind(this);
    }
    changeSelected() {
        this.setState({
            selected: !this.state.selected
        });
        console.log(this.state.selected);
    }
    render() {
        return (
            <div
                className="data"
                idx={this.props.idx}
                data={this.props.data}
                style={this.state.selected ? {
                    borderTop: "1px solid #ccc",
                    width: "12em",
                    height: "2em",
                    overflowY: "scroll",
                    hover: "pointer",
                    hoverColor: "blue",
                    padding: "0.25em",
                } : {
                    borderTop: "1px solid #ccc",
                    backgroundColor: "darkblue",
                    color: "white",
                    width: "12em",
                    height: "2em",
                    overflowY: "scroll",
                    hover: "pointer",
                    hoverColor: "blue",
                    padding: "0.25em",
                }}
                onClick={this.changeSelected}
            >
                {/*Make DataBase API Calls here*/}
                <i>{this.props.data}</i>
            </div>
        )
    }
}

export default Data;
