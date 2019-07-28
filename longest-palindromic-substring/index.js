class Solution {
  matrixCreate(numrows, numcols, initial) {
    let arr = [];
    for (let row = 0; row < numrows; row++) {
      let columns = [];
      for (let col = 0; col < numcols; col++) {
        columns[col] = initial;
      }
      arr[row] = columns;
    }
    return arr;
  }

  longestPalindrome(s) {
    const size = s.length;
    if (size <= 1) return s;
    
    let dp = this.matrixCreate(size, size, false);
    let longest_l = 1;
    let res = s[0];

    for (let r = 1; r < size; r++) {
      for (let l = 0; l < r; l++) {
        if (s[l]===s[r] && (r-l<=2 || !!dp[l+1][r-1])) {
          dp[l][r] = true;
          let cur_len = r-l+1;
          if (cur_len > longest_l) {
            longest_l = cur_len;
            res = s.substring(l, r+1);
            console.log(`${res}`);
          }
        }
      }
    }
    return res;
  }
}

var test = new Solution();
console.log(test.longestPalindrome('aecabacaadef'));