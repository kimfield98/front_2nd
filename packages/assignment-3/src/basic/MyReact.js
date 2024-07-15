import { createHooks } from "./hooks";
import { render as updateElement } from "./render";

function MyReact() {
  let _root = null;
  let _rootComponent = null;

  const _render = () => {
    resetHookContext();
    const newNode = _rootComponent();
    updateElement(_root, newNode, _root.children[0]);
  };

  function render($root, rootComponent) {
    _root = $root;
    _rootComponent = rootComponent;
    _render();
  }

  const { useState, useMemo, resetContext: resetHookContext } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
