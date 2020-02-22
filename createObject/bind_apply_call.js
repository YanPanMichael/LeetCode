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
  return result
}