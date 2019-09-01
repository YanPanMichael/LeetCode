//思路二：for ... of + includes
const unique2 = arr => {
  const res = [];
  for(const item of arr) {
    !res.includes(item) && res.push(item);
  }

  return res;
}

//Set
const unique3 = arr => {
  return [...new Set(arr)];
  // return Array.from(new Set(arr));
}

//filter + indexOf
const unique4 = arr => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  })
}

//for ... of + Object
const unique5 = arr => {
  const res = [];
  const obj = {};
  for(const item of arr) {
    if(!obj[item]) {
      res.push(item);
      obj[item] = true;
    }
  }
  return res;
}

const test = [5,6,7,7,5,7,4,4,4,4,3,3,2,2,1];
console.log(unique5(test))