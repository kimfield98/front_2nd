import { deepEquals } from "../../../assignment-2/src/basic/basic";

export function createHooks(callback) {
  let state = [];
  let stateIndex = 0;
  let memos = [];
  let memoIndex = 0;
  let callbackRequestId = null;

  const useState = (initState) => {
    const hookIndex = stateIndex;
    const setState = (newState) => {
      if (deepEquals(state[hookIndex], newState)) {
        return;
      }
      if (!callbackRequestId) {
        callbackRequestId = requestAnimationFrame(() => {
          callback();
          callbackRequestId = null;
        });
      }
      state[hookIndex] = newState;
    };

    if (state[hookIndex] === undefined) {
      state[hookIndex] = initState;
    }
    stateIndex += 1;
    return [state[hookIndex],setState];
  };

  const useMemo = (fn, refs) => {
    const hookIndex = memoIndex;
    if (memos[hookIndex] === undefined) {
      memos[hookIndex] = {values: fn(), refs};
    }
    if (!deepEquals(memos[hookIndex].refs, refs)) {
      memos[hookIndex] = {values: fn(), refs};
    }
    memoIndex += 1;
    return memos[hookIndex].values;
  };

  const resetContext = () => {
    stateIndex = 0;
    memoIndex = 0;
  }

  return { useState, useMemo, resetContext };
}
