import { useEffect, useParams, useState } from "react";
import axios from "axios";

function isNumeric(input) {
  // Define a regular expression pattern to match numeric strings
  const numericPattern = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;

  // Use the test() method to check if the input matches the pattern
  return numericPattern.test(input);
}

export default function SearchWithSubcats() {
  const { subCat } = useParams();
  const [devices, setDevices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [columnUnits, setColumnUnits] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for subcategory for respective header
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

        const deviceDataResponse = devicesForASubCatResponse.data.map(
          async (device) => {
            const response = await axios.get(
              `http://localhost:3000/data/${encodeURIComponent(device.id)}`
            );
            return response.data;
          }
        );

        const deviceData = await Promise.all(deviceDataResponse);

        // headersWithDataResponse is an array of arrays where each index corresponds to a data-header and the array corresponds to the unique values for that header
        const headersWithData = await dataHeaderNameResponse.data.map(
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

        //dataHeaderNames is an array of arrays where each index corresponds to a name for a data-header
        const dataHeaderNames = await dataHeaderNameResponse?.data;
        const dataHeaderNamesObjectArray = dataHeaderNames.map((dataCol, index) => {
          return {
            id: dataCol.toLowerCase(),
            numeric: headersWithData[index].every(isNumeric),
            label: dataCol,
          };
        });

        // dataHeaderUnits is an array of arrays where each index corresponds to a unit for a column header
        const dataHeaderUnits = await dataHeaderUnitResponse?.data;
        const dataHeaderUnitsObjectArray = dataHeaderUnits.map((unitCol, index) => {
          return {
            id: unitCol.toLowerCase(),
            numeric: headersWithData[index].every(isNumeric),
            label: unitCol,
          };
        });

        //packageData is an array containing all the objects for packages (for state: packages)
        const packagesObjectArray = await packagesResponse.data.map((pkg) => {
          return {
            value: pkg.id.toLowerCase(),
            label: pkg.id,
            desc: pkg.pkg_desc,
          };
        });

        // const devicesData = devicesResponse.data;

        // devicesObjectArray is an array of objects which contains all the devices and their properties (for state: devices)
        const devicesObjectArray = await Promise.all(
          devicesForASubCatResponse.data.map(async (deviceObject, index) => {
            // const dataResponse = await axios.get(
            //   `http://localhost:3000/data/${encodeURIComponent(
            //     deviceObject.id
            //   )}`
            // );
            // const deviceData = dataResponse.data;

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
              data: deviceData[index],
              subcategory,
              category: categoryData,
            };
          })
        );

        const rows = await Promise.All(
          devicesForASubCatResponse.data.map(async (deviceObject, index) => {
            // return createData(...[device, ...deviceData[index]]);
            // const dataResponse = await axios.get(
            //   `http://localhost:3000/data/${encodeURIComponent(
            //     deviceObject.id
            //   )}`
            // );
            // const deviceData = dataResponse.data;
            let rowObject = {
              name: deviceObject.id.toLowerCase(),
              device: deviceObject.id,
              package: deviceObject.package,
              industry: deviceObject.industry,
              status: deviceObject.status,
              pdf_link: deviceObject.pdf_link,
            };
            for (let i = 0; i < dataHeaderNamesObjectArray.length; i++) {
              rowObject[dataHeaderNamesObjectArray[i].id] =
                dataHeaderNamesObjectArray[i].numeric
                  ? parseFloat(deviceData[index][i], 10)
                  : deviceData[index][i];
            }
            return rowObject;
          })
        );

        // Set all columns
        setColumns([
          { id: "device", numeric: false, label: "Device" },
          { id: "package", numeric: false, label: "Package" },
          { id: "industry", numeric: false, label: "Industry" },
          { id: "status", numeric: false, label: "Status" },
          { id: "pdf_link", numeric: false, label: "PDF Link" },
          ...dataHeaderNamesObjectArray,
        ]);

        // Fetch devices

        setDevices(devicesObjectArray);
        setPackages(packagesObjectArray);
        setColumnData([
          devicesObjectArray,
          packagesObjectArray,
          ["active", "inactive"],
          ["pdf_link", "no_pdf_link"],
          ...headersWithData,
        ]);
        setRows(rows);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [subCat]);
}
