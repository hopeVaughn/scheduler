import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (mode, replace = false) => {
    if (replace) {
      history.pop();
      setHistory(history)
    }
    setHistory([...history, mode])
    setMode(mode);

  }

  const back = () => {
    if (mode === history[0]) {
      return setMode(history[0]);
    }
    history.pop();
    setMode(history[history.length - 1]);

  }

  return { mode, transition, back };
}

