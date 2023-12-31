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
import { convertUrlToName } from "../../lib/url";
import { extractStringsInQuotes } from "../../lib/string";
import { convertToSubscript } from "../../lib/header";

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

  const [filterValues, setFilterValues] = useState(
    columns.map((col) => (col.numeric ? [null, null] : []))
  );

  useEffect(() => {
    setFilterValues(
      columns.map((col, index) =>
        col.numeric
          ? [Math.min(...columnData[index]), Math.max(...columnData[index])]
          : []
      )
    );
  }, [columns, columnData]);

  const handleFilters = useCallback(
    (event, columnIndex) => {
      let filteredRows = originalRows;

      const newFilterValues = [...filterValues];
      newFilterValues[columnIndex] = event.target.value;
      setFilterValues(newFilterValues);

      for (
        let iterativeFilterIndex = 0;
        iterativeFilterIndex < newFilterValues.length;
        iterativeFilterIndex++
      ) {
        if (columns[iterativeFilterIndex].numeric) {
          if (
            newFilterValues[iterativeFilterIndex][0] !==
            Math.min(
              ...(columnData[iterativeFilterIndex] ||
                newFilterValues[iterativeFilterIndex][1] !==
                  Math.max(...columnData[iterativeFilterIndex]))
            )
          ) {
            filteredRows = filteredRows.filter((row) => {
              const numericRowValue = row[columns[iterativeFilterIndex].id];
              return (
                !isNaN(numericRowValue) &&
                numericRowValue >= newFilterValues[iterativeFilterIndex][0] &&
                numericRowValue <= newFilterValues[iterativeFilterIndex][1]
              );
            });
          }
        } else {
          if (
            newFilterValues[iterativeFilterIndex].length > 0 &&
            newFilterValues[iterativeFilterIndex][0] !== ""
          ) {
            let autocompleteFilter = false;
            filteredRows = filteredRows.filter((row) => {
              if (columns[iterativeFilterIndex].id === "industry") {
                const industryRowValue = row[columns[iterativeFilterIndex].id];
                autocompleteFilter = industryRowValue.some((r) =>
                  newFilterValues[iterativeFilterIndex]
                    .map((selectedIndustry) => selectedIndustry.label)
                    .includes(r)
                );
              } else {
                const alphaNumericRowValue =
                  row[columns[iterativeFilterIndex].id];
                autocompleteFilter =
                  newFilterValues[iterativeFilterIndex].includes(
                    alphaNumericRowValue
                  );
              }
              return autocompleteFilter;
            });
          }
        }
      }

      handleFilterRows(filteredRows);
    },
    [filterValues, columns, columnData, originalRows, handleFilterRows]
  );

  const handleHeaderExpansionChange =
    (panel, columnIndex) => (event, newExpanded) => {
      const newExpandedState = [...expanded];
      newExpandedState[columnIndex] = newExpanded;
      setExpanded(newExpandedState);
    };

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
          const markArray = columnDataForIndex?.map((val) => ({ value: val }));
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
                    <div dangerouslySetInnerHTML={{ __html: convertToSubscript(headCell.label) }} />
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
                    <Box sx={{ minWidth: "12ch" }}>
                      <FormGroup>
                        {maxColumnValue === minColumnValue ? (
                          <Slider disabled />
                        ) : (
                          <Slider
                            value={filterValues[index]}
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
                              `${filterValues[index]}${headCell.unit}`
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
                    <Box>
                      <FormGroup>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={columnDataForIndex}
                          defaultValue={[]}
                          value={filterValues[index]}
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
                              label={`Select`}
                              placeholder="Select filter"
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
  const {
    numSelected,
    subCat,
    dense,
    rowCount,
    onSelectAllClick,
    selectedDevices,
    handleChangeDense,
  } = props;

  const handleDisplayClick = () => {
    const devices = selectedDevices;
    navigate("/display", { state: { devices } });
  };

  const handleClickDense = () => {
    handleChangeDense(!dense);
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
        <Grid
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
          container
          spacing={2}
        >
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {convertUrlToName(subCat)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControlLabel
              variant="outlined"
              control={<Switch checked={dense} onChange={handleClickDense} />}
              label={dense ? "Dense" : "Normal"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button color="primary" href="/search" underline="none">
              {"Go to main search"}
            </Button>
          </Grid>
        </Grid>
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
        <Tooltip title="Select All">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function SubCatSearchTable() {
  const { subCat } = useParams();
  const [columns, setColumns] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("device");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataHeaderNameResponse = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/headers/${subCat}`
        );

        dataHeaderNameResponse?.data?.shift();

        const dataHeaderUnitResponse = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/units/${subCat}`
        );

        const devicesForASubCatResponse = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/devices/${subCat}`
        );

        dataHeaderUnitResponse?.data?.shift();

        const packagesResponse = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/packages`
        );

        const industriesResponse = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/industries`
        );


        const deviceDataArray = await Promise.all(devicesForASubCatResponse.data.map(async (device) => {
          let resDataArr = [];
          for (let idx=1; idx<21; idx++) {resDataArr.push(await device[`d${idx}`])}
          return resDataArr.filter(data => data !== "");
        }));

        const headersWithDataArray = await dataHeaderNameResponse?.data.map(
          (header, index) => {
            let headerData = [];
            for (let i = 0; i < devicesForASubCatResponse.data.length; i++) {
              headerData.push(
                devicesForASubCatResponse.data[i][`d${index+1}`]
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
        }) || [];

        const devicesObjectArrayResponse =
          await devicesForASubCatResponse.data.map(
            async (deviceObject, index) => {
              const categoryResponse = await axios.get(
                `${process.env.REACT_APP_ENDPOINT_USER_PREFIX}/categories`
              );
              const subcategory = deviceObject.subcat_id;
              const categoryData = categoryResponse.data
                .filter((cat) =>
                  extractStringsInQuotes(cat.subcat).includes(subcategory)
                )
                .map((cat) => cat.name);

              return {
                value: deviceObject.id.toLowerCase(),
                label: deviceObject.id,
                package: deviceObject.package,
                industry: deviceObject.industry.slice(1, -1).split(",") || [],
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
              industry: deviceObject.industry.slice(1, -1).split(",") || [],
              status: deviceObject.status,
            };
            for (
              let dataHeaderIndex = 0;
              dataHeaderIndex < dataHeaderNamesArray.length;
              dataHeaderIndex++
            ) {
              rowObject[dataHeaderNamesArray[dataHeaderIndex].id] =
                dataHeaderNamesArray[dataHeaderIndex].numeric
                  ? parseFloat(deviceDataArray[index][dataHeaderIndex], 10)
                  : deviceDataArray[index][dataHeaderIndex];
            }
            return rowObject;
          }
        );

        setColumns([
          { id: "device", numeric: false, label: "Device" },
          { id: "package", numeric: false, label: "Package" },
          { id: "industry", numeric: false, label: "Industry" },
          { id: "status", numeric: false, label: "Status" },
          ...dataHeaderNamesArray,
        ]);

        setColumnData([
          devicesObjectArray.map((device) => device.label),
          packagesArray.map((pkg) => pkg.label),
          industriesArray,
          ["Active", "Inactive"],
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

  const handleRequestSort = (_, property) => {
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

  const handleClick = (_, name) => {
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

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeDense = (currentDense) => {
    setDense(currentDense);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterRows = (filteredRows) => {
    setRows(filteredRows);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

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
    <Box className="p-3" sx={{ minHeight: "60vh", width: "100%" }}>
      {loading ? (
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
            dense={dense}
            handleChangeDense={handleChangeDense}
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
                {visibleRows.map((row, index) => {
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
                        return column.id === "industry" ? (
                          <TableCell>
                            {row[column.id].map(
                              (ind, indIndex, industryArray) => (
                                <span key={ind}>
                                  {ind}
                                  {indIndex === industryArray.length - 1
                                    ? ""
                                    : ", "}
                                </span>
                              )
                            )}
                          </TableCell>
                        ) : (
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
                    <TableCell colSpan={25} />
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
    </Box>
  );
}
