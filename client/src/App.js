import Landing from "./Components/Landing";
import DeviceTable from "./Components/DeviceTable";
import Search from "./Components/Search";
import Display from "./Components/Display";
import SearchTableWithSubCat from "./Components/SearchTableWithSubCat";
import ShowSubCats from "./Components/ShowSubCats";
import FilterDataGrid from "./Components/FilterDataGrid";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/table/:subCat" element={<DeviceTable />} />
      <Route path="/search/" element={<Search/>} />
      <Route path="/search/:subCat" element={<SearchTableWithSubCat/>} />
      <Route path="/display" element={<Display />}/>
      <Route path="/:category" element={<ShowSubCats />}/>
      <Route path="/filterdatagrid" element={<FilterDataGrid />}/>
    </Routes>
    <Footer />
  </Router>
)

export default App;