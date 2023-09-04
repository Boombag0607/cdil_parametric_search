import React, { useEffect, useState, useMemo } from "react";
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
  CircularProgress,
  Link,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import Search from "./Search";

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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, columns } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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
  const { numSelected, subCat, rowCount, onSelectAllClick } = props;

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
          {subCat.split("_").join(" ")}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={onSelectAllClick} />
          </IconButton>
        </Tooltip>
      ) : (
        <Checkbox
          color="primary"
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
          inputProps={{
            "aria-label": "select all desserts",
          }}
        />
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  // const [deviceData, setDeviceData] = useState([]);
  const { subCat } = useParams();

  useEffect(() => {
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

        // Set columns and rows
        setColumns([
          { id: "device", numeric: false, label: "Device" },
          ...cols,
        ]);

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
          return response.json().then((data) => data);
        });

        // Wait for all device data to be fetched
        const deviceData = await Promise.all(deviceDataPromises);
        console.log("deviceData: ", deviceData);

        // Create rows
        const rows = devicesNameData.map((device, index) => {
          // return createData(...[device, ...deviceData[index]]);
          let rowObj = { device: device };
          for (let i = 0; i < cols.length; i++) {
            rowObj[cols[i].id] = deviceData[index][i];
          }
          return rowObj;
        });

        setRows(rows);
        setLoading(false);
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

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box className="p-3" sx={{ width: "100%" }}>
      {loading ? ( // Display CircularProgress while loading
        <CircularProgress
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        />
      ) : (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            subCat={subCat}
            numSelected={selected.length}
            rowCount={rows.length}
            onSelectAllClick={handleSelectAllClick}
          />
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
                onRequestSort={handleRequestSort}
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
                        {columns.map((column, colidx) => {
                          console.log("row: ", row);
                          return (
                            <TableCell
                              align="center"
                              id={labelId}
                              key={`${index} ${colidx} ${row[column.id]}`}
                            >
                              {row[column.id]}
                            </TableCell>
                          );
                        })}
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
      )}
      <FormControlLabel
        className="rounded-3 border m-3 bottom-0 position-fixed col-1"
        style={{ backgroundColor: "#eee" }}
        variant="outlined"
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        // label={dense ? "Dense" : "Normal"}
      />
      <Grid
        container
        justifyContent="flex-end"
        className=""
      >
        <Link className="m-3 btn btn-outline-primary position-fixed" href="/search" underline="none">
          {"Go to search"}
        </Link>
      </Grid>
    </Box>
  );
}
