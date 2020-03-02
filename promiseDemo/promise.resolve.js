const ps = Promise.resolve("success!!!");
// 等价于
const ps = new Promise((resolve, reject) => {
  resolve("success!!!");
});

ps.then(res => console.log(res))