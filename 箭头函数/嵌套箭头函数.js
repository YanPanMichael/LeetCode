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

//管道
const pipline = (...funcs) => 
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const plus2 = a => a + 2;
const addThenMult = pipline(plus1, plus2);

const res = addThenMult(5);
console.log(res)
