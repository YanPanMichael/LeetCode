//思路二：for ... of + includes
const unique2 = arr => {
  const res = [];
  for(const item of arr) {
    !res.includes(item) && res.push(item);
  }

  return res;
}

//Set
const unique3 = arr => {
  return [...new Set(arr)];
  // return Array.from(new Set(arr));
}

//filter + indexOf
const unique4 = arr => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  })
}

//for ... of + Object
const unique5 = arr => {
  const res = [];
  const obj = {};
  for(const item of arr) {
    if(!obj[item]) {
      res.push(item);
      obj[item] = true;
    }
  }
  return res;
}

const test = [5,6,7,7,5,7,4,4,4,4,3,3,2,2,1];
console.log(unique5(test))

//数组扁平化
arr.flatten()
const flatten1 = arr => arr.toString().split(',').map(
  item => Number(item));
console.log('flatten1', flatten1(arr));

//join()
const flatten2 = arr => arr.join().split(',').map(
  item => Number.parseInt(item));
console.log('flatten2', flatten2(arr));

//递归 + concat
const flatten3 = arr => {
  let res = [];
  arr.forEach(item => {
    Array.isArray(item) ? res = res.concat([...flatten3(item)]) : res.push(item);
  });
  return res;
}
console.log('flatten3', flatten3(arr));

//reduce() + concat
const flatten4 = arr => {
  return arr.reduce((sum, cur) => {
    return sum.concat(Array.isArray(cur) ? flatten4(cur) : cur)
  }, [])}

//BFS
function wideTraversal(node) {
  var nodes = [];
  if (node != null) {
    var queue = [];
    queue.unshift(node);
    while (queue.length != 0) {
      var item = queue.shift();
      nodes.push(item);
      var children = item.children;
      for (var i = 0; i < children.length; i++) {
        queue.push(children[i]);
      }
    }
  }
  return nodes;
}
//DFS
function deepTraversal(node) {
  var nodeList = [];
  if (node) {
    var stack = [];
    stack.push(node);
    while (stack.length != 0) {
      var childrenItem = stack.pop();
      nodeList.push(childrenItem);
      var childrenList = childrenItem.children;
      for (var i = childrenList.length - 1; i >= 0; i--)
        stack.push(childrenList[i]);
    }
  }
  return nodeList;
}

function deepTraversalLoop(node, nodeList) {
  if (node) {
    nodeList.push(node);
    var children = node.children;
    for (var i = 0; i < children.length; i++)
      //每次递归的时候将  需要遍历的节点  和 节点所存储的数组传下去
      deepTraversalLoop(children[i], nodeList);
  }
  return nodeList;
}

function quickSort(arr) {
  if (arr.length <= 1) { return arr; }
  // const pivotIndex = arr.length / 2;
  const pivotIndex = Math.floor(arr.length / 2); //基准位置（理论上可任意选取）
  const pivot = arr.splice(pivotIndex, 1)[0]; //基准数
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];
    if (elem <= pivot) {
      left.push(elem);
    } else {
      right.push(elem);
    }
  }
  return quickSort([...left]).concat(pivot, quickSort([...right])); //链接左数组、基准数构成的数组、右数组
}

for (var i = 0; i < arr.length - 1; i++) {
  //2.指定轮数和次数（内循环控制次数）
  for (var j = 0; j < arr.length - 1; j++) {
    //3.判断是否符合标准。如果符合标准交换位置。
    //从小到大排列顺滑，如果前面的比后面的大，那么交换位置。
    if (arr[j] > arr[j + 1]) {
      var temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
    m++;
  }
  n++;
}
//
//第三个参数是getSnapshotBeforeUpdate返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态

//在 Props Proxy 中不能做到渲染劫持。 虽然通过 WrappedComponent.prototype.render 你可以访问到 render 方法，不过还需要模拟 WrappedComponent 的实例和它的 props，还可能亲自处理组件的生命周期，而不是交给 React。根据我的实验，这么做不值，你要是想做到渲染劫持你应该用 Inheritance Inversion 而不是 Props Proxy。记住，React 在内部处理了组件实例，你处理实例的唯一方法是通过 this 或者 refs。

//Radium 是怎样做到内联 CSS 伪类的，比如 hover？它用 Inheritance Inversion 模式做到了渲染劫持，插入对应的事件监听器来模拟 CSS 伪类，比如 hover。事件监听器插入到了 React 组件的 props 里。Radium 需要读取 WrappedComponent 的 render 方法输出的所有组件树，每当它发现一个新的带有 style 属性的组件时，在 props 上添加一个事件监听器。简单地说，Radium 修改了组件树的 props（实际上 Radium 的实现会更复杂些，你理解意思就行）。
//Radium 暴露的 API 真的很简单。令人印象深刻的是，他在用户甚至没有察觉到的时候，完成了所有工作。由此可见 HOC 的威力。
