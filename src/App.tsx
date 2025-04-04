import { useCallback, useEffect, useState } from "@lynx-js/react";

import "./App.css";

export function App() {
  const [count, setCount] = useState(0);

  const onTap = () => {
    setCount(count + 1);
  };

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Count">
          <text className="Count-Text">{count}</text>
          <text className="Count-Text" bindtap={onTap}>
            Increment
          </text>
        </view>
      </view>
    </view>
  );
}
