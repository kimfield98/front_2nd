export function jsx(type, props, ...children) {
  return {type, props, children: children.flat()}
}

export function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  const $el = document.createElement(node.type);
  node.children.forEach(child => {
    $el.appendChild(createElement(child));
  });

  node.props && Object.keys(node.props).forEach(key => {
    $el.setAttribute(key, node.props[key]);
  });

  return $el;
}

function updateAttributes(target, newProps, oldProps) {
  newProps = newProps || {};
  oldProps = oldProps || {};

  Object.keys(newProps).forEach(key => {
    if (oldProps[key] === newProps[key]) {
      return;
    }

    target.setAttribute(key, newProps[key]);
  });

  Object.keys(oldProps).forEach(key => {
    if (newProps[key]) {
      return;
    }

    target.removeAttribute(key);
  });
}

export function render(parent, newNode, oldNode, index = 0) {
  if (!newNode && oldNode) {
    parent.removeChild(parent.children[index]);
    return;
  }

  if (newNode && !oldNode) {
    parent.appendChild(createElement(newNode));
    return;
  }


  if (typeof newNode === 'string' && typeof oldNode === 'string' && newNode !== oldNode) {
    parent.replaceChild(createElement(newNode), parent.children[index]);
    return;
  }


  if (newNode.type !== oldNode.type) {
    parent.replaceChild(createElement(newNode), parent.children[index]);
    return;
  }

  updateAttributes(parent.children[index], newNode.props, oldNode.props);

  const newChildLength = newNode.children ? newNode.children.length : 0;
  const oldChildLength = oldNode.children ? oldNode.children.length : 0;

  const length = Math.max(newChildLength, oldChildLength);
  for (let i = 0; i < length; i++) {
    render(parent.children[index], newNode.children[i], oldNode.children[i], i);
  }
}
