import { useState } from "react";

function Data(props) {
  const [selected, setSelected] = useState(true);
  let key = props.key;
  let data = props.data;
  return (
    <div
      key={key}
      data={data}
      style={{
        borderTop: "1px solid #ccc",
        width: "12em",
        height: "2em",
        overflowY: "scroll",
        hover: "pointer",
        hoverColor: "blue",
      }}
      onClick={() => {
        setSelected(!selected);
        console.log(selected)
      }}
    >
      {/*Make DataBase API Calls here*/}
      <code>
        {key}: {data}
      </code>
    </div>
  );
}

export default Data;
