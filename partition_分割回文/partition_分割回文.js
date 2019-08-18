let list = [];
var partition = function(s) {
    list = [];
    dfs(s, [], 0)
    return list;
};

function isPalindrome(s) {
  if(typeof s !== 'string') return false;
  let left = 0, right = s.length - 1;
  while(left <= right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

function dfs(source, result, startIndex) {
  if(startIndex === source.length) {
    list.push(result.concat());
    return;
  }
  for(let i = startIndex; i < source.length; i++) {
    const substr = source.slice(startIndex, i+1);
    if(isPalindrome(substr)) {
      result.push(substr);
      dfs(source, result, i+1);
      result.pop();
      // result.splice(result.length-1, 1);
    }
  }
}
