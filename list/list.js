function list() {
  this.dataScore = [];
  this.pos = 0;
  this.listSize = 0;
  return {
    append: (element) => {
      this.dataScore[this.listSize++] = element;
    },
    find: (target) => {
      for (let i = 0; i < this.dataScore.length; i++) {
        return (target == this.dataScore[i]) ? i : -1;
      }
    },
    remove: (element) => {
      var foundAt = this.find(element);
      if(foundAt > -1) {
        this.dataScore.splice(foundAt, 1);
        --this.listSize;
        return true;
      }
      return false;
    },
    insert: (element, after) => {
      var insertPos = this.find(after);
      if(insertPos > -1) {
        this.dataScore = this.dataScore.splice(insertPos+1, 0, element);
        ++this.listSize;
        return true;
      }
      return false;
    },
    clear: () => {
      delete this.dataScore;
      this.listSize = this.pos = 0;
    },
    contains: (element) => {
      for (let i = 0; i < this.dataScore.length; i++) {
        if(element == this.dataScore[i]) {
          return true;
        }
      }
      return false;
    },
    get: () => {
      return this.dataScore;
    },
    
  }
};

var names = new list();
names.append("tim")
names.append("tim")
names.append("tim")
names.append("tim")
names.append("tim")
names.append("tim")
names.append("tim")
names.append("tim")
names.append("tim")
names.append("tim")
names.append("tim")
names.append("tim")
names.append("tim")
names.append("tim")
names.append("tim")
console.log(names.get());
