var lengthOfLongestSubstring = function(s) {
  const n = s.length;
  let hashmap = new Map();
  let ans = 0;
  for (let i = 0, j = 0; i < n; i++) {
    if(hashmap.has(s[i])){
      j = Math.max(hashmap.get(s[i]), j);
    }
    ans = Math.max(ans, i - j + 1);
    hashmap.set(s[i], i + 1);
  }
  return ans;
}

var lengthOfLongestSubstring2 = function(s) {
  const n = s.length;
  let hashmap = {};
  let ans = 0;
  for (let i = 0, j = 0; i < n; i++) {
    if(s[i] in hashmap){
      j = Math.max(hashmap[s[i]], j);
    }
    ans = Math.max(ans, i - j + 1);
    hashmap[s[i]] = i + 1;
  }
  return ans;
}
