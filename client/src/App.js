import Landing from "./Components/Landing";
import DeviceTable from "./Components/DeviceTable";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/table/:subCat" element={<DeviceTable />} />
    </Routes>
  </Router>
)

export default App;