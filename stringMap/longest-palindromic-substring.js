var expandAroundCenter = function(s, left, right) {
  let L = left, R = right;
  while(L>-1&&R<s.length&&s[L]===s[R]) {
      L--;
      R++;
  }
  return R-L-1;
}

var longestPalindrome = function(s) { //expand around center
  if(!s || s.length<1) return "";
  let start = 0, end = 0;
  for(let i=0;i<s.length;i++){
      const len1 = expandAroundCenter(s, i, i);
      const len2 = expandAroundCenter(s, i, i + 1);
      const len = len1 > len2 ? len1 : len2;
      if(len > end - start) {
          start=i-(len-1)/2;
          end=i+len/2;
      }
  }
  return s.substring(Math.ceil(start),end+1);
};