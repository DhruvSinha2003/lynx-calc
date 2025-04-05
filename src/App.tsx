import { useCallback, useEffect, useState } from "@lynx-js/react";

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
  bindtap: (value: ButtonValue) => void;
};

export function App(): JSX.Element {
  const [result, setResult] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const handleButtonClick = (value: ButtonValue): void => {
    setInput((prev: string) => prev + value);
  };

  const calculateResult = (): void => {
    try {
      // Using Function constructor instead of eval for slightly safer evaluation
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
    <view>
      <view className="calculator">
        <view className="display">
          <view className="input">{input}</view>
          <view className="result">{result}</view>
        </view>
        <view className="buttons">
          {numberButtons.map((value) => (
            <Button
              key={value}
              value={value}
              bindtap={value === "=" ? calculateResult : handleButtonClick}
            />
          ))}
          <Button value="C" bindtap={clearInput} />
        </view>
      </view>
    </view>
  );
}

const Button: React.FC<ButtonProps> = ({ value, bindtap }): JSX.Element => (
  <text className="button" bindtap={() => bindtap(value)}>
    {value}
  </text>
);
