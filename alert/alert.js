var list1 = '4.0 1.0 0.5 0.0 -0.5 0.0 0.5 0.0 -2.0 0.0 0.5 0.6 2.0';
var list2 = '5.0 -0.5 0.5 -0.2 100 101';
var list3 = '0.0 0.3 0.5 0.4 0.7';
function alert(list) {
  var listArray = list.split(' ').map(function(item){return parseFloat(item)});
  var resultArray = [];
  var MAX = 100;
  var MIN = 0;
  var fluct = 0.5;
  for (var i = 0; i < listArray.length; i++) {
    resultArray.push(listArray[i]);
    if(listArray[i] >= MIN && listArray[i+1] < MIN) {
      resultArray.push('freezing');
    } else if(listArray[i] <= MIN+fluct && listArray[i+1] > MIN+fluct) {
      resultArray.push('unfreezing');
    }
    if(listArray[i] < MAX && listArray[i+1] >= MAX) {
      resultArray.push('boiling');
    } else if(listArray[i] <= MAX-fluct && listArray[i+1] > MAX-fluct) {
      resultArray.push('unboiling');
    }
  }
  return resultArray;
}
console.log(alert(list1).join(' '));
console.log(alert(list2).join(' '));
console.log(alert(list3).join(' '));
