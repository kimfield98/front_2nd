import { deepEquals } from "../../../assignment-2/src/basic/basic";

export function createHooks(callback) {
  let state = [];
  let index = 0;
  
  const useState = (initState) => {
    const hookIndex = index;
    const setState = (newState) => {
      if (deepEquals(state[hookIndex], newState)) {
        return;
      }
      state[hookIndex] = newState;
      callback();
    };

    if (state[hookIndex] === undefined) {
      state[hookIndex] = initState;
    }

    index++;

    return [state[hookIndex], setState];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {
    index = 0;
  }

  return { useState, useMemo, resetContext };
}
