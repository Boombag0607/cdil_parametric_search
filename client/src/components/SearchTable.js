import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Autocomplete, TextField } from "@mui/material";

const originalRows = [
  { name: "Pizza", calories: 200, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Hot Dog", calories: 300, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Burger", calories: 400, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Hamburger", calories: 500, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Fries", calories: 600, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Ice Cream", calories: 700, fat: 6.0, carbs: 24, protein: 4.0 },
];

export default function SearchTable() {
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState();
  // const classes = useStyles();

  const requestSearch = function (searchedVal) {
    var filteredRows = originalRows.filter(function (row) {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = function () {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>
      <Paper>
        <TableContainer>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Food (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(function (row) {
                return (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />
      <a
        target="_blank"
        href="https://smartdevpreneur.com/the-easiest-way-to-implement-material-ui-table-search/"
        rel="noreferrer"
      >
        Learn how to add search and filter to Material-UI Table here.
      </a>
    </>
  );
}