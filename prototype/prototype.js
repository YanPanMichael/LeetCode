var a = [];
var b = function(){}
b.prototype = a;
// b.prototype = a.__proto__;
var c = new b();
c.push('1')
console.log(c.length) // 1
console.log(b.length) // 0
console.log(a.length) // 0


function X() {}
var x = new X();
x.__proto__ === X.prototype //true
x.__proto__.__proto__ === Object.prototype //true
x.__proto__.__proto__.__proto__ === null //true
Object.prototype.__proto__ === null //true