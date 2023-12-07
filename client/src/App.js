import Display from "./Components/Display";
import Landing from "./Components/Landing";
import Search from "./Components/Search";
import Packages from "./Components/Packages";
import SearchTableWithSubCat from "./Components/SearchTables/SubCatSearchTable";
import ShowSubCats from "./Components/SearchTables/ShowSubCats";
import PublicLayout from "./Layouts/PublicLayout";
import LandingLayout from "./Layouts/LandingLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => (
  <Router>
    <Routes>
      <Route
        exact
        path="/"
        element={
          <LandingLayout>
            <Landing />
          </LandingLayout>
        }
      />
      <Route
        path="/*"
        element={
          <PublicLayout>
            <Routes>
              <Route path="search" element={<Search />} />
              <Route
                path="search/:subCat"
                element={<SearchTableWithSubCat />}
              />
              <Route path="display" element={<Display />} />
              <Route path="/view/packages" element={<Packages />} />
              <Route path=":category" element={<ShowSubCats />} />
            </Routes>
          </PublicLayout>
        }
      />
    </Routes>
  </Router>
);

export default App;
