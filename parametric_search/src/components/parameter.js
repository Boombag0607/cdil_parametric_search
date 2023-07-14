import Data from "./data";

function Parameter(props) {
  let name = props.name;
  let data = [
    "Diode",
    "Transistor",
    "Power Transistor",
    "xx",
    "xxx",
    "xxxx",
    "xxxxxx",
    "xxxxxx",
    "xxxxxxxx",
  ]; // Query database 
  let dataList = [];
  data.forEach((element, index) => {
    dataList.push(<Data key={index} data={element}></Data>);
  });
  return (
    <div
      className="parameter"
      style={{
        border: "1px solid #ccc",
        width: "12em",
        height: "18em",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <div className="parameter-heading" style={{ textAlign: 'center', justifyContent: 'space-evenly' }}>
        <strong>{name}</strong>
      </div>
      <div>{dataList}</div>
    </div>
  );
}

export default Parameter;
