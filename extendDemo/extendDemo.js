var parent = function() {
  this.name = 'parent'
}

var children = function() {
  parent.call(this);
  this.age = 16
}

// children.prototype = parent.prototype;

children.prototype = Object.create(parent.prototype);
children.prototype.constructor = children;

var child1 = new children();
var child2 = new children();
child1.name = "children";

console.log(child1.name, child2.name);
console.log(new children().__proto__ instanceof parent);
