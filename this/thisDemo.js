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
console.log(people.aaa()); // people
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



// 箭头函数有几个使用注意点。

// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

// 上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42
// 上面代码中，setTimeout的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到 100 毫秒后。如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42。

// 箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。下面是另一个例子。

function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0
// 上面代码中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。所以，3100 毫秒之后，timer.s1被更新了 3 次，而timer.s2一次都没更新。

// 箭头函数可以让this指向固定化，这种特性很有利于封装回调函数。下面是一个例子，DOM 事件的回调函数封装在一个对象里面。

var handler = {
  id: '123456',

  init: function() {
    document.addEventListener('click',
      event => this.doSomething(event.type), false);
  },

  doSomething: function(type) {
    console.log('Handling ' + type  + ' for ' + this.id);
  }
};
// 上面代码的init方法中，使用了箭头函数，这导致这个箭头函数里面的this，总是指向handler对象。否则，回调函数运行时，this.doSomething这一行会报错，因为此时this指向document对象。

// this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。

// 所以，箭头函数转成 ES5 的代码如下。

// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
// 上面代码中，转换后的 ES5 版本清楚地说明了，箭头函数里面根本没有自己的this，而是引用外层的this。

// 请问下面的代码之中有几个this？

function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
// 上面代码之中，只有一个this，就是函数foo的this，所以t1、t2、t3都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。

// 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。

function foo() {
  setTimeout(() => {
    console.log('args:', arguments);
  }, 100);
}

foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]
// 上面代码中，箭头函数内部的变量arguments，其实是函数foo的arguments变量。

// 另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });
// ['outer']
// 上面代码中，箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。

// 长期以来，JavaScript 语言的this对象一直是一个令人头痛的问题，在对象方法中使用this，必须非常小心。箭头函数”绑定”this，很大程度上解决了这个困扰。

// 不适用场合
// 由于箭头函数使得this从“动态”变成“静态”，下面两个场合不应该使用箭头函数。

// 第一个场合是定义对象的方法，且该方法内部包括this。

const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
// 上面代码中，cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。

// 第二个场合是需要动态this的时候，也不应使用箭头函数。

var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
// 上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。

// 另外，如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。