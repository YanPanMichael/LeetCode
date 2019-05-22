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

var root = document.getElementById("root");
console.log(wideTraversal(root));
