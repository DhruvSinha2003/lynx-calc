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
  wide?: boolean;
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
      // If a computation was just done and a number or dot is pressed, clear the input first.
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

  return (
    <view className="calculator">
      <view className="display">
        <text className="input">{input}</text>
        <text className="result">{result}</text>
      </view>
      <view className="buttons">
        <view className="row">
          <Button value="7" onClick={handleButtonClick} />
          <Button value="8" onClick={handleButtonClick} />
          <Button value="9" onClick={handleButtonClick} />
          <Button value="/" onClick={handleButtonClick} />
        </view>
        <view className="row">
          <Button value="4" onClick={handleButtonClick} />
          <Button value="5" onClick={handleButtonClick} />
          <Button value="6" onClick={handleButtonClick} />
          <Button value="*" onClick={handleButtonClick} />
        </view>
        <view className="row">
          <Button value="1" onClick={handleButtonClick} />
          <Button value="2" onClick={handleButtonClick} />
          <Button value="3" onClick={handleButtonClick} />
          <Button value="-" onClick={handleButtonClick} />
        </view>
        <view className="row">
          <Button value="0" onClick={handleButtonClick} />
          <Button value="." onClick={handleButtonClick} />
          <Button value="←" onClick={handleButtonClick} />

          <Button value="+" onClick={handleButtonClick} />
        </view>
        <view className="row">
          <Button value="C" onClick={handleButtonClick} />
          <Button value="=" onClick={handleButtonClick} wide />
        </view>
      </view>
    </view>
  );
}

const Button: React.FC<ButtonProps> = ({
  value,
  onClick,
  wide,
}): JSX.Element => {
  return (
    <text
      className={`button ${wide ? "wide" : ""}`}
      bindtap={() => onClick(value)}
    >
      {value}
    </text>
  );
};
