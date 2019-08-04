/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 求众数
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement_1 = function(nums) {
  return nums.sort((a, b) => a - b)[nums.length / 2 | 0]
}

/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 求众数
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement_2 = function(nums) {
  if (nums.length === 1) {
      return nums[0];
  }
  const map = new Map();
  for (let num of nums) {
      if (!map.get(num)) {
          map.set(num, 1);
      } else {
          map.set(num, map.get(num) + 1);
          if (map.get(num) > nums.length / 2) {
              return num;
          }
      }
  }
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement_3 = function(nums) {
  var len = nums.length
  var obj = {}
  if (len === 1) return nums
  
  for (i=0; i<len; i++) {
    if (!obj[nums[i]]) {
      obj[nums[i]] = 1
    } else {
      obj[nums[i]] += 1            
      if (obj[nums[i]] > len/2) {
          return nums[i]
      }
    }
  }
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement_best = function(nums) {
  let count = 0;
  let majority = nums[0];
  
  for (let i = 0; i < nums.length; i++) {
      if (count === 0) {
          majority = nums[i];
      }
      
      if (majority === nums[i]) {
          count++;
      } else {
          count--;
      }
  }
  return majority;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
class Solution {
  countInRange(nums, num, lo, hi) {
      let count = 0;
      for (let i = lo; i <= hi; i++) {
          if (nums[i] == num) {
              count++;
          }
      }
      return count;
  }

  majorityElement_self(nums, lo, hi) {
      // base case; the only element in an array of size 1 is the majority
      // element.
      if (lo == hi) {
          return nums[lo];
      }

      // recurse on left and right halves of this slice.
      let mid = (hi-lo)/2 + lo;
      let left = majorityElement_self(nums, lo, mid);
      let right = majorityElement_self(nums, mid+1, hi);

      // if the two halves agree on the majority element, return it.
      if (left == right) {
          return left;
      }

      // otherwise, count each element and return the "winner".
      let leftCount = countInRange(nums, left, lo, hi);
      let rightCount = countInRange(nums, right, lo, hi);

      return leftCount > rightCount ? left : right;
  }

  majorityElement_4(nums) {
      return majorityElement_self(nums, 0, nums.length-1);
  }
}
