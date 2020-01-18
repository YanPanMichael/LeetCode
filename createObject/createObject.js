// Object.createObject() polyfill

function myObjectCreate() {
  if(typeof Object.create !== 'function') {
    Object.create = function(content, props) {
      var F = function(){}
      F.prototype = content;
      if(typeof props === 'object') {
        for(prop in props) { 
          if(props.hasOwnProperty(prop)) { 
            F[prop] = props[prop]
          }
        }
      }
      return new F()
    }
  }
}

function myNew() { // myNew(Func, ...agrs)
  var target = {}
  var args = Array.prototype.slice.call(arguments)
  var constructor = Array.prototype.shift.call(args)
  target.__proto__ = constructor.prototype
  var result = constructor.apply(target, args)
  if(typeof result === 'object' && result != null) {
    return result;
  } else {
    return target;
  }
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

var actor = myNew(Person, 'Tom', 28)

// 
function bind(content) {
  if(content == null) throw 

  let that = this;
  return function F() {
    if (this)
    that.call(content, arguments)
  }
}

function apply() {

}

function call() {
  let args = Array.prototype.slice.call(arguments)
  let content = args.shift()
  content.__fn__ = this;
  eval('content.__fn__('+ args +')')
  delete content.__fn__
}

function promise() {

}

function createStore(reducer) { // return store
  let state = {}
  let listeners = []
  let getState = function() {
    return state;
  }
  let dispatch = function(action) {
    let newState = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  let subscribe = function(listener) {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }
  dispatch({})
  return {getState, subscribe, dispatch}
}

//
function Fun1() {
  console.log('A')
}
function Fun2() {
  console.log('B')
}
function Fun3() {
  console.log('C')
}
function Fun4(name, age) {
  console.log(`${name} -- ${age}`)
}
function compose() { ///compose(...func)(args)
  var args = Array.prototype.slice.call(arguments)
  if(args.length === 0) {
    return args => args
  }
  if (args.length === 1) {
    return args[0]
  }
  return args.reduce((a, b) => (...args) => a(b(args)))
}

compose(Fun1, Fun2, Fun3, Fun4)('Tom', 21)

// ajax

// combineReducer

// 