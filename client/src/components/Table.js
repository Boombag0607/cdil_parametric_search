import React, { useState, useEffect } from "react";
import Parameter from "./Parameter";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useParams } from "react-router-dom";

const columns = [
  { id: "name", label: "Name" },
  { id: "code", label: "ISO\u00a0Code" },
  {
    id: "population",
    label: "Population",
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function ColumnGroupingTable() {
  const {device} = useParams();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch data based on the device query parameter
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${device}`);
        const jsonData = await response.json();
        setTableData(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData(); // Call the fetchData function when the component mounts or when the device query parameter changes
  }, [device]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Country
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

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
