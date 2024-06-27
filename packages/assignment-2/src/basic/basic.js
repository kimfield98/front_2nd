export function shallowEquals(target1, target2) {
  if (target1 === target2) return true;
  if (typeof target1 !== "object" || typeof target2 !== "object" || target1 === null || target2 === null) return false;
  if ((target1 instanceof Number && target2 instanceof Number) || (target1 instanceof String && target2 instanceof String)) return false;

  if (Array.isArray(target1) && Array.isArray(target2)) {
    if (target1.length !== target2.length) return false;
    for (let i = 0; i < target1.length; i++) {
      if (target1[i] !== target2[i]) return false;
    }
    return true;
  }

  if (target1.__proto__.constructor !== Object && target2.__proto__.constructor !== Object) {
    return target1.__proto__.constructor === target2.__proto__.constructor;
  }

  const target1Keys = Object.keys(target1);
  const target2Keys = Object.keys(target2);
  if (target1Keys.length !== target2Keys.length) return false;
  for (let key of target1Keys) {
    if (!target2Keys.includes(key) || target1[key] !== target2[key]) return false;
  }
  return true;
}

export function deepEquals(target1, target2) {
  return target1 === target2;
}


export function createNumber1(n) {
  const numObj = new Number(n)
  return numObj;
}

export function createNumber2(n) {
  return {
    value: n.toString(),
    toString: function() {
      return this.value;
    },
    valueOf: function() {
      return this.value;
    }
  };
}

export function createNumber3(n) {
  return {
    value: n,
    valueOf: function() {
      return this.value;
    },
    toString: function() {
      return this.value.toString();
    },
    toJSON: function() {
      return `this is createNumber3 => ${this.value}`;
    }
  };
}

export class CustomNumber {
  constructor(n) {
    if (CustomNumber.instances === undefined) {
      CustomNumber.instances = {};
    }
    if (CustomNumber.instances[n] !== undefined) {
      return CustomNumber.instances[n];
    }
    this.value = n;
    CustomNumber.instances[n] = this;
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }

  toJSON() {
    return this.value.toString();
  }
}

export function createUnenumerableObject(target) {
  const result = {};
  for (const key of Object.keys(target)) {
    Object.defineProperty(result, key, {
      value: target[key],
      enumerable: false,
    });
  }
  return result;
}

export function forEach(target, callback) {
  if (Array.isArray(target) || target instanceof NodeList) {
    for (let i = 0; i < target.length; i++) {
      const newValue = !isNaN(Number(target[i])) ? Number(target[i]) : target[i];
      callback(newValue, i);
    }
  } else if (typeof target === 'object' && target !== null) {
    const propertyArray = Object.getOwnPropertyNames(target);
    for (let i = 0; i < propertyArray.length; i++) {
      const key = propertyArray[i];
      const value = target[key];
      const newKey = !isNaN(Number(key)) ? Number(key) : key;
      const newValue = !isNaN(Number(value)) ? Number(value) : value;
      callback(newValue, newKey);
    }
  }
}

export function map(target, callback) {
  if (Array.isArray(target) || target instanceof NodeList) {
    const result = [];
    for (let i = 0; i < target.length; i++) {
      const newValue = !isNaN(Number(target[i])) ? Number(target[i]) : target[i];
      result.push(callback(newValue, i));
    }
    return result;
  } else if (typeof target === 'object' && target !== null) {
    const result = {};
    const propertyArray = Object.getOwnPropertyNames(target);
    for (let i = 0; i < propertyArray.length; i++) {
      const key = propertyArray[i];
      const value = target[key];
      const newKey = !isNaN(Number(key)) ? Number(key) : key;
      const newValue = !isNaN(Number(value)) ? Number(value) : value;
      result[newKey] = callback(newValue, newKey);
    }
    return result;
  }
}

export function filter(target, callback) {
  if (Array.isArray(target) || target instanceof NodeList) {
    const result = [];
    for (let i = 0; i < target.length; i++) {
      const newValue = !isNaN(Number(target[i])) ? Number(target[i]) : target[i];
      if (callback(newValue, i)) {
        result.push(newValue);
      }
    }
    return result;
  } else if (typeof target === 'object' && target !== null) {
    const result = {};
    const propertyArray = Object.getOwnPropertyNames(target);
    for (let i = 0; i < propertyArray.length; i++) {
      const key = propertyArray[i];
      const value = target[key];
      const newKey = !isNaN(Number(key)) ? Number(key) : key;
      const newValue = !isNaN(Number(value)) ? Number(value) : value;
      if (callback(newValue, newKey)) {
        result[newKey] = newValue;
      }
    }
    return result;
  }
}


export function every(target, callback) {
  if (Array.isArray(target) || target instanceof NodeList) {
    for (let i = 0; i < target.length; i++) {
      const newValue = !isNaN(Number(target[i])) ? Number(target[i]) : target[i];
      if (!callback(newValue, i)) {
        return false;
      }
    }
    return true;
  } else if (typeof target === 'object' && target !== null) {
    const propertyArray = Object.getOwnPropertyNames(target);
    for (let i = 0; i < propertyArray.length; i++) {
      const key = propertyArray[i];
      const value = target[key];
      const newKey = !isNaN(Number(key)) ? Number(key) : key;
      const newValue = !isNaN(Number(value)) ? Number(value) : value;
      if (!callback(newValue, newKey)) {
        return false;
      }
    }
    return true;
  }
}

export function some(target, callback) {
  if (Array.isArray(target) || target instanceof NodeList) {
    for (let i = 0; i < target.length; i++) {
      const newValue = !isNaN(Number(target[i])) ? Number(target[i]) : target[i];
      if (callback(newValue, i)) {
        return true;
      }
    }
    return false;
  } else if (typeof target === 'object' && target !== null) {
    const propertyArray = Object.getOwnPropertyNames(target);
    for (let i = 0; i < propertyArray.length; i++) {
      const key = propertyArray[i];
      const value = target[key];
      const newKey = !isNaN(Number(key)) ? Number(key) : key;
      const newValue = !isNaN(Number(value)) ? Number(value) : value;
      if (callback(newValue, newKey)) {
        return true;
      }
    }
    return false;
  }
}



