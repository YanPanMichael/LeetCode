var grades = [[89,78,99], [77,85,63], [90,92,89]]; //行表示一个学生的3科成绩
var grades2 = [[89,78,99,98], [77,85,63], [90,92,89,78,95]]; //行表示一个学生的3科成绩
var grades3 = [[89,78,], [77], [90,92,89,90,90]]; //行表示一个学生的3科成绩

//求学生的平均成绩
function personAverage(grades) {
  var everScoresArray = [];
  var total = 0;
  var average = 0.0;
  for (var row = 0; row < grades.length; row++) {
    for (var col = 0; col < grades[row].length; col++) {
      total += grades[row][col];
    }
    average = total / grades[row].length;
    everScoresArray.push(average);
    total = 0;
    average = 0.0;
  }
  console.log(everScoresArray.toString());
};
personAverage(grades);
personAverage(grades2);
personAverage(grades3);

//求各科的平均成绩
function courseAverage(grades) {
  var total = 0;
  var average = 0.0;
  var courseScoreArray = [];
  for (var row = 0; row < grades.length; row++) {
    for (var col = 0; col < grades[row].length; col++) {
      total += grades[col][row];
    }
    average = total / grades.length;
    courseScoreArray.push(average);
    total = 0;
    average = 0.0;
  }
  console.log(courseScoreArray.toString());
};
courseAverage(grades);
// courseAverage(grades2);
// courseAverage(grades3);