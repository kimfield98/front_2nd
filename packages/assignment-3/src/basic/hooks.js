import { deepEquals } from "../../../assignment-2/src/basic/basic";

export function createHooks(callback) {
  let state = [];
  let stateIndex = 0;
  let memos = [];
  let memoIndex = 0;

  const useState = (initState) => {
    const hookIndex = stateIndex;
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
    stateIndex++;

    return [state[hookIndex], setState];
  };

  const useMemo = (fn, refs) => {
    const hookIndex = memoIndex;
    if (memos[hookIndex] === undefined) {
      memos[hookIndex] = {value: fn(), refs};
    }
    if (!deepEquals(memos[hookIndex].refs, refs)) {
      memos[hookIndex] = {value: fn(), refs};
    }
    memoIndex++;

    return memos[hookIndex].value;
  };

  const resetContext = () => {
    stateIndex = 0;
    memoIndex = 0;
  }

  return { useState, useMemo, resetContext };
}
