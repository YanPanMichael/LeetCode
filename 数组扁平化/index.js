//数组扁平化
const arr = [2,3,[1,2,3,[3,4,[6,7],[8,9,{a:12}]]]];

//toString()
const flatten1 = arr => arr.toString().split(',').map(item => Number(item));
console.log('flatten1', flatten1(arr));

//join()
const flatten2 = arr => arr.join().split(',').map(item => Number.parseInt(item));
console.log('flatten2', flatten2(arr));

//递归 + concat
const flatten3 = arr => {
  let res = [];
  arr.forEach(item => {
    Array.isArray(item) ? res = res.concat([...flatten3(item)]) : res.push(item);
  });
  return res;
}
console.log('flatten3', flatten3(arr));

//reduce() + concat
const flatten4 = arr => {
  return arr.reduce((sum, cur) => {
    return sum.concat(Array.isArray(cur) ? flatten4(cur) : cur)
  }, [])
}
console.log('flatten4', flatten4(arr));

//扩展运算符
const flatten5 = arr => {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log('flatten5', flatten5(arr));
