/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var threeSumClosest = function (num, target) {
    num = num.sort((a, b) => a - b)
    let len = num.length;
    let result = []
    let closestSum = null
	 
	  for (let i = 0; i < len - 2; i++) {
        let j = i + 1;
        let k = len - 1;
        let a = num[i]
        if (i > 0 && num[i] === num[i - 1]) continue;

        while (j < k) {
            let b = num[j];
            let c = num[k];
            let sum = a + b + c;
            if (closestSum == null) {
                closestSum = sum
            }
            if (sum === target) {
                closestSum = sum
                result = [num[i], num[j], num[k]]
                break
            }

            if (findUnit(target, sum) < findUnit(target, closestSum)) {
                closestSum = sum
                result = [num[i], num[j], num[k]]
            }
            if (sum <= target) {
                while (num[j] === num[j + 1]) j++;
                j++;
            }
            if (sum >= target) {
                while (num[k] === num[k - 1]) k--;
                k--;
            }
        }
    }
    return {closestSum, result}
};
function findUnit(a, b) {

    let sum = a - b
    if (sum < 0) {
        sum = sum * -1
    }
    return sum
}

var nums = [-1, 2, 1, -4], target = 1;
console.log(threeSumClosest(nums, target))