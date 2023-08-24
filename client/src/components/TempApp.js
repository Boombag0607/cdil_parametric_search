// async function getResponse() {
//   const response = await fetch("http://localhost:3000/");
//   const jsonData = await response.json();
//   console.log(jsonData);
//   return jsonData;
// }

// async function getData() {
//   const response = await fetch("http://localhost:3000/parameters");
//   const jsonData = await response.json();
//   console.log(jsonData);
//   return jsonData;
// }

// function Table() {
//   const [paraArray, setParaArray] = useState([]);
//   const [dataArray, setDataArray] = useState([[]]);
//   const [responseData, setData] = useState([]);
//   // const [selectedData, setSelectedData] = useState({});

//   let selectedData = {};
//   paraArray.map((element) => {
//     selectedData[element] = [];
//   });

//   useEffect(() => {
//     getData()
//       .then((data) => {
//         console.log("use effect log : ", data);
//         setDataArray(data);
//         setParaArray(Object.keys(data));
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   useEffect(() => {
//     getResponse()
//       .then((data) => {
//         console.log("use effect log : ", data);
//         setData(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const updateSelectedDataInApp = (currentSelectedData) => {
//     Object.keys(currentSelectedData).map((element) => {
//       selectedData[element] = currentSelectedData[element];
//     });
//   };

//   return (
//     <Fragment>
//       <div className="App" id="site">
//         <header className="App-header">{/*Add CDIL Logo*/}</header>
//         <h1>Parametric Search</h1>
//         <p>This is a parametric search tool for finding the right product.</p>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-evenly",
//           }}
//         >
//           {paraArray.map((element, index) => (
//             <Parameter
//               key={index}
//               data={dataArray[element]}
//               name={element}
//               updateSelectedDataInApp={updateSelectedDataInApp}
//             ></Parameter>
//           ))}
//           {/* {parameters.map((element, index) => <Parameter name={parameters[index]}></Parameter>)} */}
//         </div>

//         <div>
//           <table className="table mt-5">
//             <thead className="thead-dark">
//               <tr>
//                 {paraArray.map((element) => (
//                   <th>{element}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(responseData).map((element, _) => (
//                 <tr>
//                   {/* <th scope="row">{index + 1}</th> */}
//                   {Object.values(selectedData).every(array => array.length === 0)
//                     ? paraArray.map((para) => (
//                         <td key={para + element}>{responseData[element][para]}</td>
//                       ))
//                     : paraArray.map((para) => (
//                       <td key={para + element}>
//                         {selectedData[para].includes(responseData[element][para])
//                           ? responseData[element][para]
//                           : ""}
//                       </td>
//                     ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </Fragment>
//   );
// }

// export default Table;


