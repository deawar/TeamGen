// TODO: Write code to define and export the Employee class
// create Employee class w/{name, id, email} 
//  and method to return each parameter and role
//  methods ->   getName()
//  methods ->   getId()
//  methods ->   getEmail()
//  methods ->   getRole() 
//  Returns 'Employee'
//  then export class


class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        return this.name
    }

    getId() {
        return this.id
    }

    getEmail() {
        return this.email
    }
}

module.exports = Employee;