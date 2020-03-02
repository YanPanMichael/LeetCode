const myPromiseAll = function(promises) {
  if (!(promises instanceof Array)) {
    throw new TypeError("parameter must be array");
  }
  return new Promise((resolve, reject) => {
    let results = [];
    let index = 0;
    if (promises.length === 0) {
      resolve(results);
    } else {
      for (let i = 0; i < promises.length; i++) {
        const promiseItem = promises[i];

        // method 1
        if (promiseItem instanceof Promise) {
          promiseItem.then(
            res => {
              results[i] = res;
              if (index === promisesArray.length) {
                resolve(results);
              }
            },
            err => {
              reject(err);
            }
          );
        } else {
          // 如果传入的不是promise，则直接作为结果填入结果数组中
          results[i] = promiseItem;
          if (index === promisesArray.length) {
            resolve(results);
          }
        }

        // method2
        Promise.resolve(promiseItem).then(
          data => {
            results[i] = data;
            if (++index === promises.length) {
              resolve(result);
            }
          },
          err => {
            reject(err);
            return;
          }
        );
      }
      // resolve(results); // Wrong!!! 同步的写法 Promise.resolve(new Promise()).then(result=>{})是异步的写法
    }
  });
};

const myPromiseRace = function(promises) {
  if (!(promises instanceof Array)) {
    throw new TypeError("parameter must be array");
  }
  let promisesArray = Array.from(promises);
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promisesArray.length; i++) {
      const promiseItem = promisesArray[i];
      Promise.resolve(promiseItem).then(
        data => {
          resolve(data);
        },
        err => {
          return reject(err);
        }
      );
    }
  });
};
