const pj = Promise.reject('error!');
// 等价于
const pj = new Promise((resolve, reject) => {
  reject('error')
})
pj.then(null, err => console.log(err))