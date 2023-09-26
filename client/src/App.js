import Landing from "./Components/Landing";
import Search from "./Components/Search";
import Display from "./Components/Display";
import SearchTableWithSubCat from "./Components/SubCatSearchTable";
import ShowSubCats from "./Components/ShowSubCats";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Admin from "./Components/Admin/index";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route exact path="/" element={<Landing />} />
      <Route path="/search/" element={<Search />} />
      <Route path="/search/:subCat" element={<SearchTableWithSubCat />} />
      <Route path="/display" element={<Display />} />
      <Route path="/:category" element={<ShowSubCats />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
