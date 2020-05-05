// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
//  Require  Employee Class
//  create manger class extended from Employee class
//  with {name, id, email, officeNumber}
//  method ->  getRole() returning string Manager
//  method ->  get officeNumber() retunring officeNumber
//  export  module.exports = Manager;
const Employee = require("./Employee");
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole() {
        return "Manager";    
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}
module.exports = Manager;