// 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

// 说明：本题中，我们将空字符串定义为有效的回文串。

// 示例 1:

// 输入: "A man, a plan, a canal: Panama"
// 输出: true
// 示例 2:

// 输入: "race a car"
// 输出: false

var isPalindrome = function(s) {
  //将字符串变为小写，并将其中的非字符项去掉
  var src = s.toLowerCase().replace(/\W/g,'');
  //转为数组，倒转，然后转为字符串
  var tar = string.split('').reverse().join('');
  //比较两者是否相同
  return src === tar; 
};