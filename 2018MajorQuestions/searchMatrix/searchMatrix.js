var searchMatrix = function (matrix, target) {
  if(matrix.length==0)
      return false;
  let row = 0;
  let col =  matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
      let n = matrix[row][col]
      if (n==target){
          return true;
      }else if(n >target){
          col--;
      }else{
          row++;
      }
  }
  return false;
};
