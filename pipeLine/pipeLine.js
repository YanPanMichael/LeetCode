// 嵌套的箭头函数
// 箭头函数内部，还可以再使用箭头函数。下面是一个 ES5 语法的多重嵌套函数。

function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}

insert(2).into([1, 3]).after(1); //[1, 2, 3]
// 上面这个函数，可以使用箭头函数改写。

let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1); //[1, 2, 3]
// 下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。

const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5)
// 12
// 如果觉得上面的写法可读性比较差，也可以采用下面的写法。

const plus1 = a => a + 1;
const mult2 = a => a * 2;

mult2(plus1(5))
// 12
// 箭头函数还有一个功能，就是可以很方便地改写 λ 演算。


// λ演算的写法
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

// ES6的写法
var fix = f => (x => f(v => x(x)(v)))
               (x => f(v => x(x)(v)));
// 上面两种写法，几乎是一一对应的。由于 λ 演算对于计算机科学非常重要，这使得我们可以用 ES6 作为替代工具，探索计算机科学。

