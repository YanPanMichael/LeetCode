/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  const len = digits.length;
  let low = len-1;
  const high = 0;
  const threld = 9;
  digits[low] += 1;
  if (digits[low] > threld){   //大于9  产生进位
      let i = low;
      while(i > high && digits[i] > threld){
          digits[i] = 0;
          digits[--i] += 1;
      }
      if (i == high && digits[i] > threld){   //如果首位大于9， 将数组扩大一位，首位变为1
          digits[i] = 0;
          digits = [1, ...digits];
      }
  }
  return digits;
};