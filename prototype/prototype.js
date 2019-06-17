var a = [];
var b = function(){}
b.prototype = a;
var c = new b();
c.push('1')
console.log(c.length) // 1
console.log(b.length) // 0
console.log(a.length) // 0