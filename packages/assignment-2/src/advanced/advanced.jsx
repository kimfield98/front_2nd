import { createContext, useContext, useState, useRef, useEffect } from "react";
import { deepEquals } from "../basic/basic";

const memo1Map = new WeakMap();

export const memo1 = (fn) => {
  if (!memo1Map.has(fn)) {
    memo1Map.set(fn, fn());
  }
  return memo1Map.get(fn);
};

const memo2Map = new WeakMap();
const memo2DependenciesMap = new WeakMap();

const getSortedArray = (array) => {
  return array.slice().sort();
};

export const memo2 = (fn, dependencies = []) => {
  const dependenciesToString = JSON.stringify(getSortedArray(dependencies));

  if (!memo2Map.has(fn)) {
    memo2Map.set(fn, fn());
    memo2DependenciesMap.set(fn, dependenciesToString);
  } else if (memo2DependenciesMap.get(fn) !== dependenciesToString) {
    memo2Map.set(fn, fn());
    memo2DependenciesMap.set(fn, dependenciesToString);
  }

  return memo2Map.get(fn);
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

  const setValue = (key, newValue) => {
      contextValueRef.current = { ...contextValueRef.current, [key]: newValue };
    }
  ;

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
