import Admin from "./Components/Admin";
import AdminOAuth from "./Components/Admin/AdminOAuth";
import Display from "./Components/Display";
import Landing from "./Components/Landing";
import Search from "./Components/Search";
import SearchTableWithSubCat from "./Components/SearchTables/SubCatSearchTable";
import ShowSubCats from "./Components/SearchTables/ShowSubCats";
import AdminLayout from "./Layouts/AdminLayout";
import PublicLayout from "./Layouts/PublicLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => (
  <Router>
    <Routes>
      <Route
        path="admin/*"
        element={
          <AdminLayout>
            <Routes>
              <Route index element={<Admin />} />
              <Route path="oauth" element={<AdminOAuth />} />
            </Routes>
          </AdminLayout>
        }
      />
      <Route
        path="/*"
        element={
          <PublicLayout>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route path="search" element={<Search />} />
              <Route
                path="search/:subCat"
                element={<SearchTableWithSubCat />}
              />
              <Route path="display" element={<Display />} />
              <Route path=":category" element={<ShowSubCats />} />
            </Routes>
          </PublicLayout>
        }
      />
    </Routes>
  </Router>
);

export default App;
