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

// Bind
function myBind() {
  var content = arguments[0] || window
  if(content == null) throw new Error('first argument error')

  var that = this;
  var args = Array.prototype.slice.call(arguments, 1)
  var F = function() {
    var args_2 = Array.prototype.slice.call(arguments, 0)
    return that.apply(this instanceof Function ? this : content, args.concat(args_2))
  }
  F.prototype = Object.create(this.prototype)
  return F;
}

// Apply
function myApply(content, arr) {
  content = content || window
  content.__fn__ = this;
  if(arr == []) {
    return content.__fn__()
    delete content.__fn__
  } else {
    var args = []
    for (let i = 0; i < arr.length; i++) {
      args.push(arr[i])
    }
    var redult = eval('content.__fn__('+args.join(',')+')')
    delete content.__fn__
    return redult;
  }
}

// Call
function myCall() {
  let args = Array.prototype.slice.call(arguments)
  let content = args.shift()
  if(content == null) throw new Error('first arg error')
  content.__fn__ = this;
  var result = eval('content.__fn__('+ args.json(',') +')')
  delete content.__fn__
  return redult
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