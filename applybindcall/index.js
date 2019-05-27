function Fn(name) {
  this.name = name;
  console.log(this);
}
Fn() //window

Fn.call({a: 100}, 'Tom') //{a: 100, name: "Tom"}
Fn.apply({b: 200}, ['Jim']) //{b: 200, name: "Jim"}

var fn = new Fn('Peter') //fn {name: 'Peter'}

var fbb = function(name) {
  this.name = name;
  console.log(this);
}.bind({c: 300}) //bind必须用表达式方式，不可用上面的声明方式写

fbb('Michael') //{c: 300, name: "Michael"}

var x = 100;
function fn1() {
  var x = 200;
  function fn2() {
    var x = 300;
    console.log('fn2', x); // fn2 300
  }
  fn2()
  console.log('fn1', x); // fn1 200
}
fn1()

function fn3() {
  var age = 16;
  console.log('3', this)
  return function () {
    console.log(age)
    console.log('4', this)
  }
}
var n3 = fn3(); //this === window
var age = 20;
n3(); // 16 this===window

var fn4 = (function() {
  var age = 16;
  return {
    getAge : function () {
        return age;
    },
    setAge : function(new_age){
        age = new_age;
    }
  }
})()

console.log(fn4.age);   //不可访问 undefined
console.log(fn4.getAge());  //get 16
fn4.setAge("20");    //set
console.log(fn4.getAge()) // 20