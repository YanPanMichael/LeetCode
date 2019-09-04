//管道
const pipline = (...funcs) => 
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const plus2 = a => a + 2;
const addThenMult = pipline(plus1, plus2);

const res = addThenMult(5);
console.log(res)
