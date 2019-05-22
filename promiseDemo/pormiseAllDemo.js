const e1 = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('a');
    }, 3000);
  })
};
const e2 = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('b');
    }, 2000);
  })
};
const e3 = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('c');
    }, 1000);
  })
};

const ra = e1();
const rb = e2();
const rc = e3();
Promise.all([ra, rb, rc]).then(function(datas) {
  console.log(datas[0]);
  console.log(datas[1]);
  console.log(datas[2]);
})
Promise.race([ra, rb, rc]).then(function(data) {
  console.log(data);
})