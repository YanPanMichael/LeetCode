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