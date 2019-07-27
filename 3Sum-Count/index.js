/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  const len = nums.length;
  if (len < 3) {
      return null;
  }
  nums.sort((a, b) => a - b);
  // 结果，比存储 sum 方便，下面对比时不用再用 target - sum 对比
  let res = target - (nums[0] + nums[1] + nums[2]);
  for (let i = 0; i < len - 2; i++) {
      // 左指针为 i+1，右指针为 nums.length - 1
      let left = i + 1,
          right = len - 1;

      while (left < right) {
          const sum = nums[i] + nums[left] + nums[right];
          if (sum === target) {
              return sum;
          } else if (sum < target) {
              // sum < target 时，left++
              while (nums[left] === nums[++left]);
          } else {
              // sum > target时，right--
              while (nums[right] === nums[--right]);
          }
          // 存储与 target 最近的值
          if (Math.abs(sum - target) < Math.abs(res)) {
              res = target - sum;
          }
      }
  }
  return target - res;
};
