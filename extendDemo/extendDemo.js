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

function Animal() {
  this.name = "Animal"
}

function Dog() {
  this.bark = function() {
    console.log('Dog bark!');
  }
}

Dog.prototype = new Animal();
new Dog().bark();
console.log(new Dog().name);

class Animal2 {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(this.name+"eat");
  }
}
class Dog2 extends Animal2 {
  constructor(name) {
    super(name);
    this.name = name;
  }
  bark() {
    console.log(this.name+"bark");
  }
}
const dog = new Dog2('jinmao');
dog.eat();
dog.bark();