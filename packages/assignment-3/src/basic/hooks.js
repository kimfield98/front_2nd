import { deepEquals } from "../../../assignment-2/src/basic/basic";

export function createHooks(callback) {
  const useState = (initState) => {
    let state = initState;
    const setState = (newState) => {
      if (deepEquals(state, newState)) {
        return;
      }
      state = newState;
      callback();
    };
    return [state, setState];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {
    
  }

  return { useState, useMemo, resetContext };
}
