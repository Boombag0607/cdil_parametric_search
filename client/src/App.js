import Landing from "./Components/Landing";
import DeviceTable from "./Components/DeviceTable";
import Search from "./Components/Search";
import Display from "./Components/Display";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/table/:subCat" element={<DeviceTable />} />
      <Route path="/search" element={<Search/>} />
      <Route path="/display" element={<Display />}/>
    </Routes>
  </Router>
)

export default App;