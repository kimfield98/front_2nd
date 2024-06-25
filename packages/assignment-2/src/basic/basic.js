export function shallowEquals(target1, target2) {
  return target1 === target2;
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
  return target;
}

export function forEach(target, callback) {

}

export function map(target, callback) {

}

export function filter(target, callback) {

}


export function every(target, callback) {

}

export function some(target, callback) {

}



