import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
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
  Grid,
  FormGroup,
  Autocomplete,
  TextField,
  Slider,
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";

const industriesData = [
  {
    value: "audio",
    label: "Audio",
  },
  {
    value: "automotive",
    label: "Automotive",
  },
  {
    value: "communications",
    label: "Communications",
  },
  {
    value: "computing",
    label: "Computing",
  },
  {
    value: "power",
    label: "Power",
  },
  {
    value: "sensing",
    label: "Sensing",
  },
];

// function StyledAutocomplete(props) {
//   const { sx, ...others } = props;
//   return <Autocomplete sx={{ width: "15ch", ...sx }} {...others} />;
// }

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
  const { order, orderBy, onRequestSort, columns, columnData } = props;
  const [expanded, setExpanded] = useState(false);

  const [sliderValue, setSliderValue] = useState([20, 37]);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleHeaderExpansionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Accordion
              expanded={expanded}
              onChange={handleHeaderExpansionChange("panel1")}
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
                      <Slider
                        sx={{ width: "15ch" }}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={(value) => `${value}°C`}
                      />
                    </FormGroup>
                  </Box>
                ) : (
                  <Box sx={{ width: "15ch" }}>
                    <FormGroup>
                      <Autocomplete
                        sx={{ width: "15ch" }}
                        multiple
                        id="tags-outlined"
                        options={columnData[index] || []} // Make sure index is valid
                        defaultValue={[]}
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
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired,
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
  const [packages, setPackages] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [devices, setDevices] = useState([]);
  const [matchedDevices, setMatchedDevices] = useState([]);
  // const [selectedDevices, setSelectedDevices] = useState([]);
  // const [selectedPackages, setSelectedPackages] = useState([]);
  // const [selectedIndustries, setSelectedIndustries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for subcategory for respective header
        const headersDataRes = await axios.get(
          `http://localhost:3000/headers/${subCat}`
        );
        const deviceDataRes = await axios.get(
          `http://localhost:3000/devices/${subCat}`
        );
        const headerWithDataRes = await headersDataRes.data.map(
          (header, index) => {
            console.log("Inside headerWithDataRes: ", header, index);
            let headerData = [];
            for (let i = 0; i < deviceDataRes.data.length; i++) {
              headerData.push(deviceDataRes.data[i][`d${index + 1}`]);
            }
            return headerData.filter((v, i, self) => i === self.indexOf(v));
          }
        );

        const packagesResponse = await axios.get(
          `http://localhost:3000/packages`
        );
        const packagesData = packagesResponse.data.map((pkg) => {
          return {
            value: pkg.id.toLowerCase(),
            label: pkg.id,
            desc: pkg.pkg_desc,
          };
        });

        const devicesResponse = await axios.get(
          `http://localhost:3000/devices`
        );
        // const devicesData = devicesResponse.data;

        // Fetch data for all devices concurrently using Promise.all
        const devicesData = await Promise.all(
          devicesResponse.data.map(async (deviceObject) => {
            const dataResponse = await axios.get(
              `http://localhost:3000/data/${encodeURIComponent(deviceObject.id)}`
            );
            const deviceData = dataResponse.data;

            // Fetch category for the subcategory
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
              data: deviceData,
              subcategory,
              category: categoryData,
            };
          })
        );

        setDevices(devicesData);
        setPackages(packagesData);
        setIndustry(industriesData);
        setMatchedDevices(devicesData);
        setColumnData([
          devicesData,
          packagesData,
          industriesData,
          ["active", "inactive"],
          ["pdf_link", "no_pdf_link"],
          ...headerWithDataRes,
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [subCat]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch columns
        const dataHeaderColumnsResponse = await axios.get(
          `http://localhost:3000/headers/${subCat}`
        );
        const dataHeaderColumnNames = await dataHeaderColumnsResponse?.data;
        const dataHeaderColumnObjectArray = dataHeaderColumnNames.map(
          (dataCol) => {
            return {
              id: dataCol.toLowerCase(),
              numeric: true,
              label: dataCol,
            };
          }
        );

        // Set all columns
        setColumns([
          { id: "device", numeric: false, label: "Device" },
          { id: "package", numeric: false, label: "Package" },
          { id: "industry", numeric: false, label: "Industry" },
          { id: "status", numeric: false, label: "Status" },
          { id: "pdf_link", numeric: false, label: "PDF Link" },
          ...dataHeaderColumnObjectArray,
        ]);

        // Fetch devices
        const devicesResponse = await axios.get(
          `http://localhost:3000/devices/${subCat}`
        );
        const devicesNameData = await devicesResponse.data;
        // console.log("devicesNameData: ", devicesNameData);

        // Fetch data for each device in parallel
        const deviceDataPromises = devicesNameData.map(async (device) => {
          const response = await axios.get(
            `http://localhost:3000/data/${encodeURIComponent(device.id)}`
          );
          // console.log("repsonse", response)
          return response.data;
        });

        // Wait for all device data to be fetched
        const deviceData = await Promise.all(deviceDataPromises);
        // console.log("deviceData: ", deviceData);

        // Create rows
        const rows = devicesNameData.map((device, index) => {
          // return createData(...[device, ...deviceData[index]]);
          let rowObj = {
            name: device.id.toLowerCase(),
            device: device.id,
            package: device.package,
            industry: device.industry,
            status: device.status,
            pdf_link: device.pdf_link,
          };
          for (let i = 0; i < dataHeaderColumnObjectArray.length; i++) {
            rowObj[dataHeaderColumnObjectArray[i].id] = deviceData[index][i];
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
                          // console.log("row: ", row);
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
                        {/* {dataColumns.map((column, colidx) => {
                          // console.log("row: ", row);
                          return (
                            <TableCell
                              align="center"
                              id={labelId}
                              key={`${index} ${colidx} ${row[column.id]}`}
                            >
                              {row[column.id]}
                            </TableCell>
                          );
                        })} */}
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
              {"Go to search"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
