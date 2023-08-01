import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import Parameter from "./components/parameter";

async function getResponse() {
  const response = await fetch("http://localhost:3000/");
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
}

// async function getParameters() {
//   const response = await fetch("http://localhost:3000/");
//   const jsonData = await response.json();
//   let paraArray = Object.keys(jsonData[0]);
//   console.log(jsonData);
//   return paraArray;
// }

async function getData() {
  const response = await fetch("http://localhost:3000/");
  const jsonData = await response.json();
  let paraArray = Object.keys(jsonData[0]);
  let dataArray = {};
  paraArray.map((element) => {
    dataArray[element] = [];
    for (let i in jsonData) {
      dataArray[element].push(jsonData[i][element]);
    }
    return dataArray[element];
  })
  console.log(jsonData);
  return dataArray;
}

function App() {
  const [paraArray, setParaArray] = useState([]);
  const [dataArray, setDataArray] = useState([[]]);

  const [responseData, setData] = useState([]);

  // useEffect(() => {
  //   getParameters()
  //     .then((data) => {
  //       console.log("success");
  //       setParaArray(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  useEffect(() => {
    getData()
      .then((data) => {
        console.log("use effect log : ", data);
        setDataArray(data);
        setParaArray(Object.keys(data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getResponse()
      .then((data) => {
        console.log("use effect log : ", data);
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // let paraArray = getParameters()
  //   .then(() => {
  //     console.log("sucess");
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // let parameters = [
  //   "kerf width",
  //   "size",
  //   "spacing",
  //   "blade height",
  //   "5th",
  //   "6th",
  //   "7th",
  // ]; //fetch paramter data headings here
  // console.log(paraArray);

  // let data = [
  //   ["add", "xyx", "xyd", "xyz", "huh", "hbh"],
  //   ["ad2", "xkx", "xjd", "xlz", "guh", "lbh"],
  //   ["amd", "1yx", "#yd", "xyl", "hih", "hweh"],
  //   ["addw", "xywx", "xyq", "eyz", "huh", "h@bh"],
  //   ["ad@d", "x@yx", "xy@d", "xy@z", "hu@h", "hbh@"],
  //   ["add4", "3xyx", "3xyd", "3xyz", "3huh", "h3bh"],
  //   ["add3", "2xyx", "14d", "x4yz", "4huh", "hbh"],
  // ];
  return (
    <Fragment>
      <div className="App" id="site">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/*Add CDIL Logo*/}
        </header>
        <h1>Parametric Search</h1>
        <p>This is a parametric search tool for finding the right product.</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {paraArray.map((element, index) => (
            <Parameter
              key={index}
              data={dataArray[element]}
              name={element}
            ></Parameter>
          ))}
          {/* {parameters.map((element, index) => <Parameter name={parameters[index]}></Parameter>)} */}
        </div>

        <div>
          <table className="table mt-5">
            <thead className="thead-dark">
              <tr>
                {/* <th scope="col">Device ID</th>
                <th scope="col">Device Name</th>
                <th scope="col">Param1</th>
                <th scope="col">Param2</th>
               */}
                {paraArray.map((element) => (
                  <th>{element}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(responseData).map((element, index) => (
                  <tr>
                    {/* <th scope="row">{index + 1}</th> */}
                    {paraArray.map((para) => (
                      <td>{responseData[element][para]}</td>
                    ))}
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
  </a> */}
      </div>
    </Fragment>
  );
}

export default App;
