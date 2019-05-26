// 1. 全局作用域或者普通函数中 this 指向全局对象 window。

//直接打印
console.log(this) //window

//function声明函数
function bar () {console.log(this)}
bar() //window

//function声明函数赋给变量
var bar = function () {console.log(this)}
bar() //window

//自执行函数
(function () {
  console.log(this)
})(); //window


// 2. 方法调用中谁调用 this 指向谁

//对象方法调用
var person = {
  run: function () {console.log(this)}
}
person.run() // person

//事件绑定
var btn = document.querySelector("button")
btn.onclick = function () {
  console.log(this) // btn
}
//事件监听
var btn = document.querySelector("button")
btn.addEventListener('click', function () {
  console.log(this) //btn
})

//jquery的ajax
$.ajax({
  self: this,
  type: "get",
  url: url,
  async: true,
  success: function (res) {
    console.log(this) // this指向传入$.ajxa()中的对象
    console.log(self) // window
  }
});
//这里说明以下，将代码简写为$.ajax（obj），this指向obj,在obj中this指向window，因为在success方法中，独享obj调用自己，所以this指向obj


// 3. 在构造函数或者构造函数原型对象中 this 指向构造函数的实例

//不使用new指向window
function Person(name) {
  self = this
  this.name = name
  console.log(this) //people
  console.log(self) //people
}
Person.prototype.aaa = function() {
  console.log('prototype', this);
}
var people = new Person('iwen')
console.log(people);
console.log(self === people) //true
console.log(people.aaa());
//这里new改变了this指向，将this由window指向Person的实例对象people


// 4. 箭头函数中指向外层作用域的 this

var obj = {
  foo() {
    console.log(this);
  },
  bar: () => {
    console.log(this);
  }
}

obj.foo() // {foo: ƒ, bar: ƒ}
obj.bar() // window

function fn() {
  console.log('real', this);
  var arr = [1,2,3];
  arr.map(function(item) {
    console.log('--',this.process.title);
    return item;
  });
  arr.map(function(item) {
    console.log('++',this.process.title);
    return item;
  }.bind(this));
  arr.map((item) => {
    console.log('=>',this.process.title);
    return item;
  });
}
// fn();
fn.call({process: {title: '100'}});

 // 5. proptype
 function Elem(id) {
  this.elem = document.getElementById(id);
  console.log(this, this.elem); // e1, e1.elem ///DOM element
}

Elem.prototype.html = function(val) {
  var elem = this.elem;
  if (val) {
    elem.innerHTML = val;
  }
  return this;
}
Elem.prototype.on = function() {
  console.log('on', this); // e1
  this.elem.addEventListener('click', function() {
    console.log('click', this); // e1.elem ///DOM element
  })
}

var e1 = new Elem('a');
e1.html("new Test");
e1.on();
