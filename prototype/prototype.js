var a = [];
var b = function(){}
b.prototype = a;
// b.prototype = a.__proto__;
var c = new b();
c.push('1')
console.log(c.length) // 1
console.log(b.length) // 0
console.log(a.length) // 0


function X() {}
var x = new X();
x.__proto__ === X.prototype //true
x.__proto__.__proto__ === Object.prototype //true
x.__proto__.__proto__.__proto__ === null //true
Object.prototype.__proto__ === null //true

function asyncFun() {
  console.log('start')
  var img = document.createElement('img')
  img.onload = function() {
      console.log('load success')
  }
  img.src = "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3437217665,1564280326&fm=26&gp=0.jpg"
  document.getElementById('root').appendChild(img)
  console.log('end')
}

// start
// end
// load succeess

(function everyFun() {
  var a = [1,2,3,4].every(item => {
      console.log("-",item)
      if(item < 3) {
          return true
      } else {
          return false
      }
  })
  console.log(a)
})()

(function someFun() {
  var a = [1,2,3,4].some(item => {
      console.log("-",item)
      if(item > 2){
          return true
      }
  })
  console.log(a)
})()

// Array and Obj forEach
Object.prototype.forEachAll = function(fn) {
  // console.log(this);
  if(this && this instanceof Array) {
      this.forEach((item) => {
          console.log(this) //this指向自身函数的外层this 也就是调用forEachAll方法的调用者
          fn.call(this, item)
      })
  } else if(this && typeof this === 'object') {
      for (const key in this) {
          if(this.hasOwnProperty(key)){
              fn(this[key])
          }
      }
  }
}

const arr = [1,2,3,4]
arr.forEachAll(
  function(val) {
      console.log(val)
  }
)

const obj = {'a':1, 'b':2, 'c':3}
obj.forEachAll(
  function(val) {
      console.log(val)
  }
)

function Elem(id) {
    this.elem = document.getElementById(id)
}

Elem.prototype.html = function(val) {
    if(val) {
        this.elem.innerHTML = val
        return this
    } else {
        return this.elem.innerHTML
    }
}

Elem.prototype.on = function(type, fn) {
    this.elem.addEventListener(type, fn)
}

var elem = new Elem('head_wrapper')
elem.html()
// elem.html('<p>aaaaaaaaa</p>')
elem.on('click', function(event){console.log(event)})