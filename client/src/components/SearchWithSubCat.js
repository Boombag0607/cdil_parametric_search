import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormGroup,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";

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

function isNumeric(input) {
  const numericPattern = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
  return numericPattern.test(input);
}

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
    columns,
    columnData = [],
    originalRows,
    handleFilterRows,
  } = props;
  const [expanded, setExpanded] = useState(Array(columns.length).fill(false));

  const [sliderValues, setSliderValues] = useState(
    Array(columns.length).fill([0, 0])
  );

  const [autocompleteValues, setAutocompleteValues] = useState(
    Array(columns.length).fill([])
  );

  const [appliedFilters, setAppliedFilters] = useState([
    Array(columns.length).fill([]),
  ]);

  useEffect(() => {
    let initialSliderValues = [];
    columns.map((col, index) => {
      if (col.numeric) {
        const columnDataForIndex = columnData[index] || [];
        const minColumnValue = Math.min(...columnDataForIndex);
        const maxColumnValue = Math.max(...columnDataForIndex);
        initialSliderValues[index] = [minColumnValue, maxColumnValue];
      }
      return col;
    });
    console.log(
      "inside useEffect initialSliderValues :: ",
      initialSliderValues
    );
    setSliderValues(initialSliderValues);
  }, [columns, columnData]);

  const handleFilters = useCallback(
    (event, columnIndex, minValue, maxValue) => {
      let filteredRows = originalRows;
      const newSliderValues = [...sliderValues];
      newSliderValues[columnIndex] = event.target.value;
      setSliderValues(newSliderValues);

      console.log(
        "Inside handleFilter slider :: ",
        newSliderValues[columnIndex],
        columnIndex
      );

      // Collect filter values from Autocomplete components
      const newAutocompleteValues = [...autocompleteValues];
      newAutocompleteValues[columnIndex] = event.target.value; // You need to replace this with the actual value from the Autocomplete component
      setAutocompleteValues(newAutocompleteValues); // Assuming you have a state for Autocomplete values

      console.log(
        "Inside handleFilter autocomplete:: ",
        newAutocompleteValues[columnIndex],
        columnIndex
      );

      // Apply filters to the rows
      if (
        newAutocompleteValues[columnIndex].length > 0 ||
        newSliderValues[columnIndex][0] !== minValue ||
        newSliderValues[columnIndex][1] !== maxValue
      ) {
        filteredRows = originalRows.filter((row) => {
          // Apply slider value filter
          const sliderValue = row[columns[columnIndex].id];
          const sliderFilter =
            !isNaN(sliderValue) &&
            sliderValue > newSliderValues[columnIndex][0] &&
            sliderValue < newSliderValues[columnIndex][1];

          const autocompleteValue = row[columns[columnIndex].id];
          const autcompleteFilter =
            newAutocompleteValues[columnIndex].includes(autocompleteValue);

          return sliderFilter || autcompleteFilter;
        });
      }
      console.log("Inside handleFilter filteredRows :: ", filteredRows);
      // Update the filtered rows using the handleFilterRows function
      handleFilterRows(filteredRows);
    },
    [sliderValues, autocompleteValues, columns, originalRows, handleFilterRows]
  );

  const handleHeaderExpansionChange =
    (panel, columnIndex) => (event, newExpanded) => {
      const newExpandedState = [...expanded];
      newExpandedState[columnIndex] = newExpanded;
      setExpanded(newExpandedState);
    };

  // const handleSliderChange = (event, newValue, columnIndex) => {
  //   const newSliderValues = [...sliderValues];
  //   newSliderValues[columnIndex] = newValue;
  //   setSliderValues(newSliderValues);
  //   handleFilters(event, columnIndex);
  // };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell, index) => {
          const columnDataForIndex = columnData[index] || [];
          if (columnDataForIndex.length === 0) {
            return null;
          }
          const minColumnValue = Math.min(...columnDataForIndex);
          const maxColumnValue = Math.max(...columnDataForIndex);
          const markArray = columnDataForIndex.map((val) => ({ value: val }));
          return (
            <TableCell
              key={headCell.id}
              align={"center"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <Accordion
                expanded={expanded[index]}
                onChange={handleHeaderExpansionChange("panel1", index)}
                sx={{ width: "100%" }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </AccordionSummary>
                <AccordionDetails>
                  {headCell.numeric ? (
                    <Box sx={{ width: "15ch" }}>
                      <FormGroup>
                        {maxColumnValue === minColumnValue ? (
                          <Slider disabled />
                        ) : (
                          <Slider
                            sx={{ width: "15ch" }}
                            value={sliderValues[index]}
                            onChange={(event, newValue) =>
                              handleFilters(
                                { target: { value: newValue } },
                                index,
                                maxColumnValue,
                                minColumnValue
                              )
                            }
                            step={null}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={(value) =>
                              `${sliderValues[index]}${headCell.unit}`
                            }
                            marks={markArray}
                            min={minColumnValue}
                            max={maxColumnValue}
                          />
                        )}
                        <Typography>{`${headCell.unit}`}</Typography>
                      </FormGroup>
                    </Box>
                  ) : (
                    <Box sx={{ width: "15ch" }}>
                      <FormGroup>
                        <Autocomplete
                          sx={{ width: "15ch" }}
                          multiple
                          id="tags-outlined"
                          options={columnDataForIndex}
                          defaultValue={[]}
                          value={autocompleteValues[index]}
                          onChange={(event, newValue) =>
                            handleFilters(
                              { target: { value: newValue } },
                              index
                            )
                          }
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={headCell.label}
                              placeholder="Select industry for filtering"
                            />
                          )}
                        />
                      </FormGroup>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar(props) {
  const navigate = useNavigate();
  const { numSelected, subCat, rowCount, onSelectAllClick, selectedDevices } =
    props;

  const handleDisplayClick = () => {
    const devices = selectedDevices;
    console.log("selected Devices: ", selectedDevices);
    navigate("/display", { state: { devices } });
  };

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
        <Box sx={{ display: "flex" }}>
          <Tooltip title="Display Selected Devices">
            <IconButton onClick={handleDisplayClick}>
              <ViewListRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Unselect All">
            <IconButton>
              <CancelRoundedIcon onClick={onSelectAllClick} />
            </IconButton>
          </Tooltip>
        </Box>
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

export default function SearchWithSubcat() {
  const { subCat } = useParams();
  const [columns, setColumns] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  // const [packages, setPackages] = useState([]);
  // const [industry, setIndustry] = useState([]);
  // const [devices, setDevices] = useState([]);
  // const [matchedDevices, setMatchedDevices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataHeaderNameResponse = await axios.get(
          `http://localhost:3000/headers/${subCat}`
        );
        const dataHeaderUnitResponse = await axios.get(
          `http://localhost:3000/units/${subCat}`
        );
        const devicesForASubCatResponse = await axios.get(
          `http://localhost:3000/devices/${subCat}`
        );
        const packagesResponse = await axios.get(
          `http://localhost:3000/packages`
        );
        const industriesResponse = await axios.get(
          `http://localhost:3000/industries`
        );

        const deviceDataArray = await Promise.all(
          devicesForASubCatResponse.data.map(async (device) => {
            const response = await axios.get(
              `http://localhost:3000/data/${encodeURIComponent(device.id)}`
            );
            return response?.data;
          })
        );

        const headersWithDataArray = await dataHeaderNameResponse?.data.map(
          (header, index) => {
            let headerData = [];
            for (let i = 0; i < devicesForASubCatResponse.data.length; i++) {
              headerData.push(
                devicesForASubCatResponse.data[i][`d${index + 1}`]
              );
            }
            return headerData.filter((v, i, self) => i === self.indexOf(v));
          }
        );

        const dataHeaderNamesArray = await dataHeaderNameResponse?.data.map(
          (dataCol, index) => {
            return {
              id: dataCol.toLowerCase(),
              numeric: headersWithDataArray[index].every(isNumeric),
              label: dataCol,
              unit: dataHeaderUnitResponse?.data[index],
            };
          }
        );

        const packagesArray = await packagesResponse?.data.map((pkg) => {
          return {
            value: pkg.id.toLowerCase(),
            label: pkg.id,
            desc: pkg.pkg_desc,
          };
        });

        const industriesArray = await industriesResponse?.data.map((ind) => {
          return {
            value: ind.id.toLowerCase(),
            label: ind.id,
          };
        });

        const devicesObjectArrayResponse =
          await devicesForASubCatResponse.data.map(
            async (deviceObject, index) => {
              const categoryResponse = await axios.get(
                `http://localhost:3000/categories`
              );
              const subcategory = deviceObject.subcat_id;
              const categoryData = categoryResponse.data
                .filter((cat) => cat.sub_cat.includes(subcategory))
                .map((cat) => cat.name);

              return {
                value: deviceObject.id.toLowerCase(),
                label: deviceObject.id,
                package: deviceObject.package,
                industry: deviceObject.industry,
                status: deviceObject.status,
                pdf_link: deviceObject.pdf_link,
                data: deviceDataArray[index],
                subcategory,
                category: categoryData,
              };
            }
          );

        const devicesObjectArray = await Promise.all(
          devicesObjectArrayResponse
        );

        const rows = await devicesForASubCatResponse.data.map(
          (deviceObject, index) => {
            let rowObject = {
              name: deviceObject.id.toLowerCase(),
              device: deviceObject.id,
              package: deviceObject.package,
              industry: deviceObject.industry,
              status: deviceObject.status,
              pdf_link: deviceObject.pdf_link,
            };
            for (let i = 0; i < dataHeaderNamesArray.length; i++) {
              rowObject[dataHeaderNamesArray[i].id] = dataHeaderNamesArray[i]
                .numeric
                ? parseFloat(deviceDataArray[index][i], 10)
                : deviceDataArray[index][i];
            }
            return rowObject;
          }
        );

        setColumns([
          { id: "device", numeric: false, label: "Device" },
          { id: "package", numeric: false, label: "Package" },
          { id: "industry", numeric: false, label: "Industry" },
          { id: "status", numeric: false, label: "Status" },
          { id: "pdf_link", numeric: false, label: "PDF Link" },
          ...dataHeaderNamesArray,
        ]);

        // setDevices(devicesObjectArray);
        // setPackages(packagesArray);
        // setIndustry(industriesArray);
        setColumnData([
          devicesObjectArray.map((device) => device.label),
          packagesArray.map((pkg) => pkg.label),
          industriesArray,
          ["active", "inactive"],
          ["pdf_link", "no_pdf_link"],
          ...headersWithDataArray,
        ]);
        setOriginalRows(rows);
        setRows(rows);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, [subCat]);

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
    console.log("newSelected: ", newSelected);
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

  const handleFilterRows = (filteredRows) => {
    setRows(filteredRows);
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
            selectedDevices={selected}
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
                columnData={columnData}
                originalRows={originalRows}
                handleFilterRows={handleFilterRows}
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControlLabel
            className="rounded-3 border m-3 bottom-0 position-fixed col-1"
            style={{ backgroundColor: "#eee" }}
            variant="outlined"
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            // label={dense ? "Dense" : "Normal"}
          />
        </Grid>
        <Grid item xs={6}>
          <Box
            variant="contained"
            sx={{
              backgroundColor: "#eee",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              color="primary"
              className="m-3 border m-3 bottom-0 position-fixed"
              href="/search"
              underline="none"
              sx={{
                backgroundColor: "#eee",
                color: "#555",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#555",
                  color: "white",
                },
              }}
            >
              {"Go to main search"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
