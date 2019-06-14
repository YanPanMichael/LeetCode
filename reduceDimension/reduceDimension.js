function reduceDimension1(arr) {
  var tmp = arr;
  var result = arr;
  while(tmp instanceof Array) {
      result = Array.prototype.concat.apply([], result);
      tmp = tmp[0];
  }
  return result;
}

function arrayConcat(arr, point){
  return Array.prototype.concat.apply(point || [], arr);
}

function reduceDimension2(arr) {
  let arrays = arrayConcat(arr);
  let newArray = [];

  for(let key in arrays){
      if(arrays[key] instanceof Array){
          newArray = arrayConcat(arrays[key], newArray);
      }else{
          newArray.push(arrays[key]);
      }
  }

  return newArray;
}

function reduceDimension3(arr){
    let ret = [];
    
    let toArr = function(arr){
        arr.forEach(function(item){
            item instanceof Array ? toArr(item) : ret.push(item);
        });
    }

    toArr(arr);

    return ret;
}

console.log(reduceDimension2([1,[2,3,4],[[5,6],[[7]]],8,[[[[[9,[0]]]]]]]))
console.log(reduceDimension3([1,[2,3,4],[[5,6],[[7]]],8,[[[[[9,[0]]]]]]]))