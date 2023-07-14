function Data(props) {
    let key = props.key;
    let data = props.data;
    return (
        <div
        style={{
            borderTop: '1px solid #ccc',
            width: '12em',
            height: '2em',
            overflowY: 'scroll', 
          }}>
            {/*Make DataBase API Calls here*/}
            <code>{key}: {data}</code>
        </div>
    )
}

export default Data;