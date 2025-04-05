import { useState } from "@lynx-js/react";
import "./App.css";

type ButtonValue = string;
type CalculatorOperation = "+" | "-" | "*" | "/" | "=" | "C" | "←";
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
  const [shouldReset, setShouldReset] = useState<boolean>(false);

  const handleButtonClick = (value: ButtonValue): void => {
    if (value === "=") {
      calculateResult();
      setShouldReset(true);
    } else if (value === "C") {
      clearInput();
      setShouldReset(false);
    } else if (value === "←") {
      // Remove the last character from the input.
      setInput((prev) => prev.slice(0, -1));
    } else {
      // If a computation was just done and the user presses a number or dot,
      // clear the input first.
      if (shouldReset && /[0-9.]/.test(value)) {
        setInput(value);
        setResult("");
        setShouldReset(false);
      } else {
        setInput((prev) => prev + value);
        setShouldReset(false);
      }
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

  // Rearranged button order so that "=" appears last.
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
    "+",
    "=",
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
        <Button value="←" onClick={handleButtonClick} />
      </view>
    </view>
  );
}

const Button: React.FC<ButtonProps> = ({ value, onClick }): JSX.Element => {
  // Add the 'wide' class for the "0" and "=" buttons.
  const isWide = value === "0" || value === "=";
  return (
    <text
      className={`button ${isWide ? "wide" : ""}`}
      bindtap={() => onClick(value)}
    >
      {value}
    </text>
  );
};
