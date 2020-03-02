// Object.createObject() polyfill

function myObjectCreate() {
  if (typeof Object.create !== "function") {
    Object.create = function(content, props) {
      var F = function() {};
      F.prototype = content;
      F.prototype.constructor = F;
      // F.prototype = Object.create(content.prototype)
      if (typeof props === "object") {
        for (prop in props) {
          if (props.hasOwnProperty(prop)) {
            F[prop] = props[prop];
          }
        }
      }
      return new F();
    };
  }
}

function myNew() {
  // myNew(Func, ...agrs)
  var target = {};
  var args = Array.prototype.slice.call(arguments);
  var constructor = Array.prototype.shift.call(args);
  target.__proto__ = constructor.prototype;
  var result = constructor.apply(target, args);
  if (typeof result === "object" && result != null) {
    return result;
  } else {
    return target;
  }
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

var actor = myNew(Person, "Tom", 28);

// Bind
function myBind() {
  var content = arguments[0] || window;
  if (content == null) throw new Error("first argument error");

  var that = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var F = function() {
    var args_2 = Array.prototype.slice.call(arguments, 0);
    return that.apply(
      this instanceof Function ? this : content,
      args.concat(args_2)
    );
  };
  F.prototype = Object.create(this.prototype);
  return F;
}

// Apply
function myApply(content, arr) {
  content = content || window;
  content.__fn__ = this;
  if (arr == []) {
    return content.__fn__();
    delete content.__fn__;
  } else {
    var args = [];
    for (let i = 0; i < arr.length; i++) {
      args.push(arr[i]);
    }
    var redult = eval("content.__fn__(" + args.join(",") + ")");
    delete content.__fn__;
    return redult;
  }
}

// Call
function myCall() {
  let args = Array.prototype.slice.call(arguments);
  let content = args.shift();
  if (content == null) throw new Error("first arg error");
  content.__fn__ = this;
  var result = eval("content.__fn__(" + args.json(",") + ")");
  delete content.__fn__;
  return result;
}

function promise() {}

function createStore(reducer) {
  // return store
  let state = {};
  let listeners = [];
  let getState = function() {
    return state;
  };
  let dispatch = function(action) {
    let newState = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  let subscribe = function(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };
  dispatch({});
  return { getState, subscribe, dispatch };
}

const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

//
function Fun1() {
  console.log("A");
}
function Fun2() {
  console.log("B");
}
function Fun3() {
  console.log("C");
}
function Fun4(name, age) {
  console.log(`${name} -- ${age}`);
}
function compose() {
  ///compose(...func)(args)
  var args = Array.prototype.slice.call(arguments);
  if (args.length === 0) {
    return args => args;
  }
  if (args.length === 1) {
    return args[0];
  }
  return args.reduce((a, b) => (...args) => a(b(args)));
}

compose(Fun1, Fun2, Fun3, Fun4)("Tom", 21);

// throttle
function throttle(fn, delay) {
  var timeout, remaining;
  var previous = new Date();

  return function() {
    var args = arguments,
      context = this;
    (now = new Date()), (remaining = now - previous);

    if (remaining >= delay) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      fn.apply(context, args);
      previous = now;
    } else {
      timeout = setTimeout(() => {
        fn.apply(context, args);
        previous = new Date();
      }, delay - remaining);
    }
  };
}

var Employee = /** @class */ (function() {
  function Employee(name) {
    this._fullname = name;
  }
  Object.defineProperty(Employee.prototype, "fullname", {
    get: function() {
      return this._fullname;
    },
    set: function(newName) {
      if (passwd && passwd === "screct passwd") {
        this._fullname = newName;
      } else {
        console.log("error, passwd is wrong");
      }
    },
    enumerable: true,
    configurable: true
  });
  return Employee;
})();
var employee = new Employee("Max");
if (employee.fullname) {
  console.log(employee.fullname);
}

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

const pj = Promise.reject("error!");
// 等价于
const pj = new Promise((resolve, reject) => {
  reject("error");
});
pj.then(null, err => console.log(err));


// ajax
function ajax(url, method, body) {
  return new Promise(function(resolve, reject) {
    var xhr;
    if (window.XMLHttpRequest) {
      // Mozilla, Safari...
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // IE
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          console.log("create error!");
        }
      }
    }
    if (xhr) {
      xhr.open(method, url); // method: GET, POST ...
      // 设置 Content-Type 为 application/x-www-form-urlencoded
      // 以表单的形式传递数据
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(body ? body : null); // POST data is in here, GET is in url so no need have body
      // // 设置 Content-Type 为 application/json
      // xhr.setRequestHeader('Content-Type', 'application/json');
      // // 传递 JSON 字符串
      // xhr.send(JSON.stringify({ username:'admin', password:'root' }));
      xhr.onreadtstatechange = function() {
        // readyState的取值如下
        // 0 (未初始化)
        // 1 (正在装载)
        // 2 (装载完毕)
        // 3 (交互中)
        // 4 (完成)
        if (xhr.readystate === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            resolve.call(undefined, xhr.responseText);
          } else if (request.status >= 400) {
            reject.call(uncefined, xhr);
          }
        }
      };
      // 当然我们可以用onload来代替onreadystatechange等于4的情况，因为onload只在状态为4的时候才被调用
      // xhr.onload = function () {    // 调用onload
      //   if (xhr.status === 200) {    // status为200表示请求成功
      //       console.log('执行成功');
      //   } else {
      //       console.log('执行出错');
      //   }
      // }
    }
  });
}

function fetchIteratorArray(inputIdArray) {
  return Promise.all(
    inputIdArray.reduce((sum, cur) => {
      return [...sum, ajax(`bbb.ccc?id=${cur}`)];
      // return sum.concat(ajax(`bbb.ccc?id=${cur}`));
    }, [])
  );
}

function fetchIteratorPromise(inputIdArray) {
  return inputIdArray.reduce((promiseChain, currentId) => {
    return promiseChain.then(chainResults => {
      let currentTaskPromise = ajax(`bbb.ccc?id=${currentId}`);
      chainResults.push(currentTaskPromise);
      return chainResults;
    });
  }, Promise.resolve([]));
}

// const tasks = getTaskArray();
// return tasks
//   .reduce((promiseChain, currentTask) => {
//     return promiseChain.then(chainResults =>
//       currentTask.then(currentResult => [...chainResults, currentResult])
//     );
//   }, Promise.resolve([]))
//   .then(arrayOfResults => {
//     // Do something with all results
//   });

function getId() {
  ajax("http://sss.bbb.ccc", "GET")
    .then(
      resIdArray => {
        fetchIteratorArray(resIdArray).then(resTableArray => {
          let resuls = resTableArray.join("");
          return resuls;
        });
        // fetchIteratorPromise(resIdArray).then(resTableArray => {
        //   let resuls = resTableArray.join("");
        //   return resuls;
        // });
      },
      function() {
        console.log("reject call");
      }
    )
    .catch(error => console.log(error));
}
