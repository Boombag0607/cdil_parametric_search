import Landing from "./Components/Landing";
import DeviceTable from "./Components/DeviceTable";
import Search from "./Components/Search";
import Display from "./Components/Display";
import SearchWithSubCat from "./Components/SearchWithSubCat";
import ShowSubCats from "./Components/ShowSubCats";
import FilterDataGrid from "./Components/FilterDataGrid";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/table/:subCat" element={<DeviceTable />} />
      <Route path="/search/" element={<Search/>} />
      <Route path="/search/:subCat" element={<SearchWithSubCat/>} />
      <Route path="/display" element={<Display />}/>
      <Route path="/:category" element={<ShowSubCats />}/>
      <Route path="/filterdatagrid" element={<FilterDataGrid />}/>
    </Routes>
  </Router>
)

export default App;