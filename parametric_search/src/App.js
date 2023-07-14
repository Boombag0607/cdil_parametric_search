import './App.css';
import Parameter from './components/parameter';

function App() {
  let parameters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th']; //fetch paramter data headings here
  parameters.map((element, index) => <Parameter name={parameters[index]}></Parameter>);
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
          {parameters.map((element, index) => <Parameter name={parameters[index]}></Parameter>)}
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
