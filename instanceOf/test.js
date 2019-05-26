var arr = []
console.log(typeof arr); // object
console.log(arr instanceof Array); // true  arr.__proto === Array.prototype

function fn() {}
console.log(typeof fn); // function
console.log(fn instanceof Function); // true  fn.__proto === Function.prototype || fn.__proto__.constructor === Function
console.log(fn.__proto__.constructor === Function);
console.log(Function.prototype.constructor === Function);
