function Persion(){}

Persion.prototype = {
  set: function(name){
    this.name = name;
    return this;
  },
  get: function(){
    return this.name;
  }
}

function newPerson() {
  return new Persion();
}

console.log(newPerson().set('Marry').get());

// utilize return obj to implement link chain invoke
function a() {
  console.log('a');
  return {
    b: function() {
      console.log('b');
      return {
        c: function() {
          console.log('c');
        }
      }
    }
  }
}
a().b().c()

// utilize prototype to implement link chain invoke
function x() {
  return new s();
}
function s() {
  console.log('x');
}
s.prototype = {
  y: function() {
    console.log('y');
    return this;
  },
  z: function() {
    console.log('z');
    return this;
  },
  o: function() {
    console.log('o');
    return this;
  }
}
x().y().z().o()