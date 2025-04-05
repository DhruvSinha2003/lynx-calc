import { useState } from "@lynx-js/react";
import "./App.css";

type ButtonValue = string;
type CalculatorOperation = "+" | "-" | "*" | "/" | "=" | "C";
type NumericValue =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | ".";
type ButtonProps = {
  value: ButtonValue;
  onClick: (value: ButtonValue) => void;
};

export function App(): JSX.Element {
  const [result, setResult] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const handleButtonClick = (value: ButtonValue): void => {
    if (value === "=") {
      calculateResult();
    } else if (value === "C") {
      clearInput();
    } else {
      setInput((prev: string) => prev + value);
    }
  };

  const calculateResult = (): void => {
    try {
      const evalResult = new Function("return " + input)();
      setResult(String(evalResult));
    } catch (error) {
      setResult("Error");
    }
  };

  const clearInput = (): void => {
    setInput("");
    setResult("");
  };

  const numberButtons: Array<NumericValue | CalculatorOperation> = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  return (
    <view className="calculator">
      <view className="display">
        <text className="input">{input}</text>
        <text className="result">{result}</text>
      </view>
      <view className="buttons">
        {numberButtons.map((value) => (
          <Button key={value} value={value} onClick={handleButtonClick} />
        ))}
        <Button value="C" onClick={handleButtonClick} />
      </view>
    </view>
  );
}

const Button: React.FC<ButtonProps> = ({ value, onClick }): JSX.Element => (
  <text className="button" bindtap={() => onClick(value)}>
    {value}
  </text>
);
