import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import { deepEquals } from "../basic/basic";

const memo1Map = new Map(); 

export const memo1 = (fn) => {
  const fnToString = fn.toString();
  if (!memo1Map.has(fnToString)) {
    memo1Map.set(fnToString, fn());
  }
  return memo1Map.get(fnToString);
};

const memo2Map = new Map();
const memo2DependenciesMap = new Map();

const getSortedArray = (array) => {
  return array.slice().sort();
};

export const memo2 = (fn, dependencies = []) => {
  const fnToString = fn.toString();
  const dependenciesToString = JSON.stringify(getSortedArray(dependencies));

  if (!memo2Map.has(fnToString)) {
    memo2Map.set(fnToString, fn());
    memo2DependenciesMap.set(fnToString, dependenciesToString);
  }

  if (memo2DependenciesMap.get(fnToString) !== dependenciesToString) {
    memo2Map.set(fnToString, fn());
    memo2DependenciesMap.set(fnToString, dependenciesToString);
  }

  return memo2Map.get(fnToString);
};

export const useCustomState = (initValue) => {
  const [state, setState] = useState(initValue);

  const customSetState = (newState) => {
    if (!deepEquals(state, newState)) {
      setState(newState);
    }
  };

  return [state, customSetState];
};

const textContextDefaultValue = {
  user: null,
  todoItems: [],
  count: 0,
};

export const TestContext = createContext({
  value: textContextDefaultValue,
  setValue: () => null,
});

export const TestContextProvider = ({ children }) => {
  const contextValueRef = useRef(textContextDefaultValue);

  const setValue = useCallback(
    (key, newValue) => {
      contextValueRef.current = { ...contextValueRef.current, [key]: newValue };
    },
    [contextValueRef]
  );

  return (
    <TestContext.Provider value={{ value: contextValueRef.current, setValue }}>
      {children}
    </TestContext.Provider>
  );
};

const useTestContext = (key) => {
  const { value, setValue } = useContext(TestContext);
  const [state, setState] = useState(value[key]);

  useEffect(() => {
    setValue(key, state);
  }, [state]);

  return [state, setState];
};

export const useUser = () => useTestContext("user");
export const useCounter = () => useTestContext("count");
export const useTodoItems = () => useTestContext("todoItems");
