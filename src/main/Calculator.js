import React, { useState } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";

export default (props) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  const clearMemory = () => {
    setDisplayValue("0");
    setClearDisplay(false);
    setOperation(null);
    setValues([0, 0]);
    setCurrent(0);
  };

  const onOperation = (inputedOperation) => {
    if (current === 0) {
      setCurrent(1);
      setOperation(inputedOperation);
      setClearDisplay(true);
    } else {
      const equals = inputedOperation === "=";
      const currentOperation = operation;
        // console.log(values);
      const valuess = [...values];
      try {
        valuess[0] = eval(`${valuess[0]} ${currentOperation} ${valuess[1]}`);
      } catch (e) {
        valuess[0] = values[0];
      }
      valuess[1] = 0;
      setDisplayValue(valuess[0], 0);
      setOperation(equals ? null : inputedOperation);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(!equals);
      setValues(valuess);
      
    }
  };

  const addDigit = (n) => {
    if (n === "." && displayValue.includes(".")) {
      return;
    }

    const clearDisplayy = displayValue === "0" || clearDisplay;

    const currentValuee = clearDisplayy ? "" : displayValue;

    const displayValuee = currentValuee + n;
    setDisplayValue(displayValuee);
    setClearDisplay(false);

    if (n !== ".") {
      const i = current;
      const newValue = parseFloat(displayValuee);
      const valuess = [...values];
      valuess[i] = newValue;
      console.log(valuess);
      setValues(valuess);
    }
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <Button label="AC" click={clearMemory} triple></Button>
      <Button label="/" click={onOperation} operation></Button>
      <Button label="7" click={addDigit}></Button>
      <Button label="8" click={addDigit}></Button>
      <Button label="9" click={addDigit}></Button>
      <Button label="*" click={onOperation} operation></Button>
      <Button label="4" click={addDigit}></Button>
      <Button label="5" click={addDigit}></Button>
      <Button label="6" click={addDigit}></Button>
      <Button label="-" click={onOperation} operation></Button>
      <Button label="1" click={addDigit}></Button>
      <Button label="2" click={addDigit}></Button>
      <Button label="3" click={addDigit}></Button>
      <Button label="+" click={onOperation} operation></Button>
      <Button label="0" click={addDigit} double></Button>
      <Button label="." click={addDigit}></Button>
      <Button label="=" click={onOperation} operation></Button>
    </div>
  );
};
