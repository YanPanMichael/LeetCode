let a1 = [1, 2, 3];
let a2 = [];
const deep_copy_array_concat = function(inputArray) {
  return inputArray.concat();
};
a2 = deep_copy_array_concat(a1);
a2[1] = 5;
console.log(a1 === a2); // false

const deep_copy_array_slice = function(inputArray) {
  return inputArray.slice(0);
};
a2 = deep_copy_array_slice(a1);
a2[1] = 6;
console.log(a1 === a2); // false

const deepCopy_json = function(obj) {
  if (typeof obj != "object" || obj === null) {
    return obj;
  }

  return JSON.parse(JSON.stringify(obj));
};

const deepCopy_obj_1 = function(obj) {
  if (typeof obj != "object" || obj === null) {
    return obj;
  }

  var copy = Array.isArray(obj) ? [] : {};
  for (key in obj) {
    copy[key] = deepCopy(obj[key]);
  }
  return copy;
};

const deepCopy_obj_vuex = function(obj, cache) {
  if (cache === void 0) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function(c) {
    return c.original === obj;
  });
  if (hit) {
    return hit.copy;
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function(key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
};

function deepCopy_obj_2(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}
