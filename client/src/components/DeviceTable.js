import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

// const rows = [
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Honeycomb", 408, 3.2, 87, 6.5),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Jelly Bean", 375, 0.0, 94, 0.0),
//   createData("KitKat", 518, 26.0, 65, 7.0),
//   createData("Lollipop", 392, 0.2, 98, 0.0),
//   createData("Marshmallow", 318, 0, 81, 2.0),
//   createData("Nougat", 360, 19.0, 9, 37.0),
//   createData("Oreo", 437, 18.0, 63, 4.0),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// const columns = [
//   {
//     id: "name",
//     numeric: false,
//     disablePadding: true,
//     label: "Dessert (100g serving)",
//   },
//   {
//     id: "calories",
//     numeric: true,
//     disablePadding: false,
//     label: "Calories",
//   },
//   {
//     id: "fat",
//     numeric: true,
//     disablePadding: false,
//     label: "Fat (g)",
//   },
//   {
//     id: "carbs",
//     numeric: true,
//     disablePadding: false,
//     label: "Carbs (g)",
//   },
//   {
//     id: "protein",
//     numeric: true,
//     disablePadding: false,
//     label: "Protein (g)",
//   },
// ];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell> */}
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {props.device}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function DeviceTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const { subCat } = useParams();

  useEffect(() => {
    // This code will run when the component is rendered
    // const getColumns = async (subCat) => {
    //   try {
    //     const response = await fetch(`http://localhost:3000/parameters/${subCat}`);
    //     const data = await response.json(); // Parse the JSON response
    //     const cols = data.map(col => {
    //       return {
    //         id: col.toLowerCase(),
    //         numeric: false,
    //         disablePadding: true,
    //         label: col
    //       }
    //     })
    //     setColumns([{id: "device", numeric:false, label: "Device"}, ...cols]);
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    // };

    // const getData = async (device) => {
    //   try {
    //     const response = await fetch(`http://localhost:3000/data/${encodeURIComponent(device)}`);
    //     const data = await response.json();
    //     setDeviceData(data);
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    // }

    // const getDevicesAndMakeData = async (subCat) => {
    //   try {
    //     const response = await fetch(`http://localhost:3000/devices/${subCat}`);
    //     const data = await response.json(); // Parse the JSON response
    //     // const devices = data.filter(device => device.sub_cat.includes(subCat));
    //     const rows = data.map(device => {
    //       getData(device);
    //       return createData(...[device, ...deviceData])
    //     })
    //     setRows(rows);
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    // }

    // // Call the function with the desired subCat value
    // getColumns(subCat);
    // getDevicesAndMakeData(subCat);
    const fetchData = async () => {
      try {
        // Fetch columns
        const columnsResponse = await fetch(
          `http://localhost:3000/parameters/${subCat}`
        );
        const columnsData = await columnsResponse.json();
        const cols = columnsData.map((col) => {
          return {
            id: col.toLowerCase(),
            numeric: false,
            disablePadding: true,
            label: col,
          };
        });

        // Fetch devices
        const devicesResponse = await fetch(
          `http://localhost:3000/devices/${subCat}`
        );
        const devicesNameData = await devicesResponse.json();

        // Fetch data for each device in parallel
        const deviceDataPromises = devicesNameData.map(async (device) => {
          const response = await fetch(
            `http://localhost:3000/data/${encodeURIComponent(device)}`
          );
          return response.json();
        });

        // Wait for all device data to be fetched
        const deviceData = await Promise.all(deviceDataPromises);
        console.log("deviceData: ", deviceDataPromises);

        // Set columns and rows
        setColumns([
          { id: "device", numeric: false, label: "Device" },
          ...cols,
        ]);

        // Create rows
        const rows = devicesNameData.map((device, index) => {
          // return createData(...[device, ...deviceData[index]]);
          let rowObj = {device: device};
          for (let i = 0; i < cols.length; i++) {
            rowObj[cols[i].id] = deviceData[index][i];
          }
          return rowObj;
        });

        setRows(rows);
      } catch (err) {
        console.error(err.message);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [subCat]); // Empty dependency array means this effect runs once when the component mounts

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar device={subCat} numSelected={selected.length} />
        <TableContainer>
          <Table
            stickyHeader={true}
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
            />
            <TableBody>
              {visibleRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell> */}
                      {/* <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell> */}
                      {
                        columns.map(column => {
                          console.log("row: ", row);
                          return (
                            <TableCell align="center">{row[column.id]}</TableCell>
                          )
                        })
                      }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        className="rounded-3 border m-3 bottom-0 position-fixed zindex-fixed col-1"
        style={{ backgroundColor: "#eee" }}
        variant="outlined"
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        // label={dense ? "Dense" : "Normal"}
      />
    </Box>
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