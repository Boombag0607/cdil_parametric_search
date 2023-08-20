import Landing from "./Components/Landing";
import Table from "./Components/Table";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/table" element={<Table />} />
    </Routes>
  </Router>
)

export default App;