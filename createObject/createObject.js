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
  var Func = Array.prototype.shift.call(args); // Func是第一个参数，即构造函数
  target.__proto__ = Func.prototype; // target.__proto__ = Object.create(Func.prototype)
  var result = Func.apply(target, args);
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

function createElement(vnode) {
  if (typeof vnode === "string") {
    // let sNode = document.createElement("span");
    // sNode.innerHTML = vnode;
    // return sNode;
    return document.createTextNode(vnode);
  }
  var tag = vnode.tag;
  var attrs = vnode.attrs || {};
  var children = vnode.children || [];
  if (!tag) {
    return null;
  }
  var elem = document.createElement(tag);
  var attrName;
  for (attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      elem.setAttribute(attrName, attrs[attrName]);
    }
  }
  !!children.length &&
    children.forEach(child => {
      elem.appendChild(createElement(child));
    });
  return elem;
}

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
//
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
// next: 其实就是createStore
export default function applyMiddleware(...middlewares) {
  return next => (reducer, initialState) => {
    var store = next(reducer, initialState);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: action => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch // 实现新的dispatch方法
    };
  };
}
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
              resolve(results);
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

var eve2;
function create(event) {
  window.eve = new Event("my_event");
  eve2 = new CustomEvent("my_event_2", {
    detail: [1, 2, 3]
  }); // 属性名必须为 detail 不可更改
  document.getElementById("trigger").addEventListener("my_event", function() {
    console.log("my event callback");
  });
  document
    .getElementById("trigger")
    .addEventListener("my_event_2", function(e) {
      console.log("my event 2 callback", e.detail);
    });
}
function invoke(event) {
  // window.dispatchEvent(window.eve);
  event.currentTarget.dispatchEvent(window.eve);
  event.currentTarget.dispatchEvent(eve2);
}

document.body.addEventListener("veb", function(e) {
  alert(e.eventType);
});
var creatCustomEvent = document.createEvent("HTMLEvents");
// initEvent接受3个参数：
// 事件类型，是否冒泡，是否阻止浏览器的默认行为
creatCustomEvent.initEvent("veb", false, true);
//通过eventType传递事件信息
creatCustomEvent.eventType = "I love Veblen";
//触发document上绑定的click事件
document.body.dispatchEvent(creatCustomEvent);

export default function connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options = {}
) {
  return function wrapWithConnect(WrappedComponent) {
    class Connect extends Component {
      constructor(props, context) {
        // 从祖先Component处获得store
        this.store = props.store || context.store;
        this.stateProps = computeStateProps(this.store, props);
        this.dispatchProps = computeDispatchProps(this.store, props);
        this.state = { storeState: null };
        // 对stateProps、dispatchProps、parentProps进行合并
        this.updateState();
      }
      shouldComponentUpdate(nextProps, nextState) {
        // 进行判断，当数据发生改变时，Component重新渲染
        if (propsChanged || mapStateProducedChange || dispatchPropsChanged) {
          this.updateState(nextProps);
          return true;
        }
      }
      componentDidMount() {
        // 改变Component的state
        this.store.subscribe(() => {
          this.setState({
            storeState: this.store.getState()
          });
        });
      }
      render() {
        // 生成包裹组件Connect
        return <WrappedComponent {...this.nextState} />;
      }
    }
    Connect.contextTypes = {
      store: storeShape
    };
    return Connect;
  };
}

function ReverseClick(timePeriod) {
  if (!(typeof timePeriod === "number")) return Promise.resolve(0);
  return new Promise((resolve, reject) => {
    let total = timePeriod || 0;
    if (!!total) {
      let timer;
      for (let i = total; i > 0; i--) {
        (function(current) {
          let t1 = new Date();
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          timer = setTimeout(() => {
            let t2 = new Data();
            let period = t2 - t1;
            if (period > 1000) {
            }
            console.log("time left: " + current);
          }, 1000);
          if (curent === 0) {
            resolve();
          }
        })(i);
      }
    }
  });
}

ReverseClick().then(() => {});

// id p_date
// 1 2017/08/29 00:10:10
// 2 2017/08/29 01:10:10
// 3 2017/08/29 01:10:10
// 4 2017/08/29 02:10:10
// 5 2017/08/29 01:10:10

// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

// 示例:

// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

function findMatch(inputArray, target) {
  if (!(inputArray instanceof Array) || inputArray.length) return [];
  let keyMap = {};
  for (let i = 0; i < inputArray.length; i++) {
    keyMap[inputArray[i]] = i;
  }
  Object.keys(keyMap).forEach(key => {
    let otherNum = target - key;
    if (keyMap[otherNum] != null) {
      return [keyMap[key], keyMap[otherNum]];
    }
  });
  return [];
}

Object.prototype.a = "Object";
Function.prototype.a = "Function";
function Person() {}

var child = new Person();
console.log(Person.a);
console.log(child.a);

// css文件为什么使用 href 来加载而 js文件需要使用 src 属性来加载？
// img
// iframe

// 计算N!结果末尾有几个连续的0

function iterator(inputNumber) {
  if (!(typeof inputNumber !== "number")) {
    throw new Error("input type error!");
  }
  if (inputNumber === 1) return 1;
  return inputNumber * iterator(inputNumber - 1);
}

function iteratorImprove(inputNumber, sum) {
  if (!(typeof inputNumber !== "number")) {
    throw new Error("input type error!");
  }
  if (inputNumber === 0) return 0;
  if (inputNumber === 1) return sum;
  let total = inputNumber * sum;
  return iteratorImprove(inputNumber - 1, total);
}

function findLastZeroNumber() {
  let result = iteratorImprove(5, 1);
  let zeroNumber = 0;
  while (!!result && result % 10 === 0) {
    result = Number.parseInt(result / 10);
    zeroNumber++;
  }
  return zeroNumber;
}

//input [1,2,3]
//output [[1,3,2],...]
let result = [];

function expandArray(inputArray) {
  if (!(inputArray instanceof Array)) throw new Error("input must be array");
  if (inputArray.length <= 1) return inputArray;

  let list = [];
  let first = 0;
  let second = first + 1;
  let temp = first;
  list.push(inputArray[temp + (1 % inputArray.length)]);

  return list.concat(inputArray[first], [
    ...expandArray(Array.slice(inputArray[second]))
  ]);
}

//排列组合 permutation
const arr = [1, 2, 3, 4, 5];
// 临时变量，用于输出
let temp = [];
function permutation(inputArray) {
  for (let i = 0; i < inputArray.length; i++) {
    // 插入第i个值
    temp.push(inputArray[i]);
    // 复制数组
    let copy = inputArray.slice();
    // 删除复制数组中的第i个值，用于递归
    copy.splice(i, 1);
    if (copy.length === 0) {
      // 如果复制数组长度为0了，则打印变量
      console.log(temp);
    } else {
      // 否则进行递归
      permutation(copy);
    }
    // 递归完了之后删除最后一个元素，保证下一次插入的时候没有上一次的元素
    temp.pop();
  }
}
permutation(arr);
