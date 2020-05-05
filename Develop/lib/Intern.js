// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
//  Require  Employee Class
//  create Intern class extended from Employee class
//  with {name, id, email, school*} school name
//  method ->  getSchool() returning string school
//  method ->  get getRole() to return Intern
//  export  module.exports = Engineer;
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    getRole() {
        return "Intern";    
    }
    getSchool() {
        return this.school;
    }
}
module.exports = Intern;