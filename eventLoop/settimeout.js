(function(){
  var i
  for (i = 0; i < 10; i++) {
    var elem = document.createElement('a')
    elem.innerHTML = i + '<br>'
    elem.addEventListener('click', function(event) {
      event.preventDefault();
      alert(i)
    })
    document.body.appendChild(elem)
  }
})() //均为10

// 使用let 块级作用域
(function(){
  for (let i = 0; i < 10; i++) {
    var elem = document.createElement('a')
    elem.innerHTML = i + '<br>'
    elem.addEventListener('click', function(event) {
      event.preventDefault();
      alert(i)
    })
    document.body.appendChild(elem)
  }
})() //依次输出1 - 10

(function(){
  var i;
  for (i = 0; i < 10; i++) {
    (function(j) {
      var elem = document.createElement('a')
      elem.innerHTML = j + '<br>'
      elem.addEventListener('click', function(event) {
        event.preventDefault();
        alert(j)
      })
      document.body.appendChild(elem)
    })(i)
  }
})() //依次输出1 - 10