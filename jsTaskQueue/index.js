const p = new Promise(()=> {
  console.log('a')
})

setTimeout(function(){
  console.log('b')
}, 0)

'a'
'b'
