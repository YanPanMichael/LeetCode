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