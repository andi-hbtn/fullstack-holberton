import { Button } from "react-bootstrap";
import { useState , useEffect } from "react";

const TestComponent = ()=>{

    useEffect(()=>{
        console.log("inside useEffect------");
    },[]);

    const [value,setValue] = useState(0);

    const handleIncrement = () =>{
        setValue(value + 1);
    }

    const handleDecrement = () =>{
        setValue(value - 1);
    }

    console.log("component is rendered------");

    return(
       <>
         <h4>Test Component{value}</h4>
            <Button onClick={handleIncrement}>Increment +</Button> 
            <Button onClick={handleDecrement}>Decrement - </Button>
       </>
    )
}

export default TestComponent;
