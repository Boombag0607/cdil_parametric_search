import './App.css';
import Parameter from './components/parameter';

function App() {
  let parameters = ['kerf width', 'size', 'spacing', '4th', '5th', '6th', '7th']; //fetch paramter data headings here
  let data = [['add', 'xyx', 'xyd', 'xyz', 'huh', 'hbh'], ['ad2', 'xkx', 'xjd', 'xlz', 'guh', 'lbh'], ['amd', '1yx', '#yd', 'xyl', 'hih', 'hweh'], ['addw', 'xywx', 'xyq', 'eyz', 'huh', 'h@bh'], ['ad@d', 'x@yx', 'xy@d', 'xy@z', 'hu@h', 'hbh@'], ['add4', '3xyx', '3xyd', '3xyz', '3huh', 'h3bh'], ['add3', '2xyx', '14d', 'x4yz', '4huh', 'hbh']];
  return (
    <div className="App" id="site">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/*Add CDIL Logo*/}
        </header>
        <h1>Parametric Search</h1>
        <p>
          This is a parametric search tool for finding the right product.
        </p>
        <div style = {{display: 'flex', flexDirection: 'row',  justifyContent: 'space-evenly'}}>
          {parameters.map((element, index) => <Parameter key = {index} data= {data[index]} name={parameters[index]}></Parameter>)}
          {/* {parameters.map((element, index) => <Parameter name={parameters[index]}></Parameter>)} */}

        </div>
        

        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
  </a> */}
    </div>
  );
}

export default App;
