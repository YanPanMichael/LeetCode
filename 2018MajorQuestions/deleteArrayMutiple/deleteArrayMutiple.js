var removeDuplicates = function(nums) {
  if(nums.length == 0) return 0;
  let i = 0;
  for(j=1;j<nums.length;j++) {
      if(nums[j] !== nums[i]) {
          i+=1;
          nums[i] = num[j]
      } else {
          j+=1;
      }
  }
};