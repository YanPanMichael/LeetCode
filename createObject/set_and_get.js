var Employee = /** @class */ (function () {
  function Employee(name) {
      this._fullname = name;
  }
  Object.defineProperty(Employee.prototype, "fullname", {
      get: function () {
          return this._fullname;
      },
      set: function (newName) {
          if (passwd && passwd === 'screct passwd') {
              this._fullname = newName;
          }
          else {
              console.log('error, passwd is wrong');
          }
      },
      enumerable: true,
      configurable: true
  });
  return Employee;
}());
var employee = new Employee('Max');
if (employee.fullname) {
  console.log(employee.fullname);
}