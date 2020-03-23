//排列组合
var arr = [1, 2, 3];
// 临时变量，用于输出
var temp = [];
function n(arr) {
  for (var i = 0; i < arr.length; i++) {
    // 插入第i个值
    temp.push(arr[i]);
    // 复制数组
    var copy = arr.slice();
    // 删除复制数组中的第i个值，用于递归
    copy.splice(i, 1);
    if (copy.length == 0) {
      // 如果复制数组长度为0了，则打印变量
      console.log(temp);
    } else {
      // 否则进行递归
      n(copy);
    }
    // 递归完了之后删除最后一个元素，保证下一次插入的时候没有上一次的元素
    temp.pop();
  }
}
n(arr);