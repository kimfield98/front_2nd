import { createContext, useContext, useState } from "react";
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
  const [value, setValue] = useState(textContextDefaultValue);

  return (
    <TestContext.Provider value={{ value, setValue }}>
      {children}
    </TestContext.Provider>
  )
}

const useTestContext = () => {
  return useContext(TestContext);
}

export const useUser = () => {
  const { value, setValue } = useTestContext();

  return [
    value.user,
    (user) => setValue({ ...value, user })
  ];
}

export const useCounter = () => {
  const { value, setValue } = useTestContext();

  return [
    value.count,
    (count) => setValue({ ...value, count })
  ];
}

export const useTodoItems = () => {
  const { value, setValue } = useTestContext();

  return [
    value.todoItems,
    (todoItems) => setValue({ ...value, todoItems })
  ];
}
