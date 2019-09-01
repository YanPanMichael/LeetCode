//思路二：for ... of + includes
const unique = arr => {
  const res = [];
  for(const item of arr) {
    !res.includes(item) && res.push(item);
  }

  return res;
}

const test = [4,4,4,4,3,3,2,2,1];
console.log(unique(test))