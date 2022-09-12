import React from "react";

const App = () => {
    const [counter, setCounter] = React.useState(0); 
    const handlerClick = () => {
        setCounter(counter + 1 )
    }
    return(<div>
        <h1>Soy muy gozu hermano!</h1>
        <h2>Hello Clipper!</h2>
        <div>{counter}</div>
        <button onClick={handlerClick}>Clickeame REY!</button>
    </div>)
}

export default App; 