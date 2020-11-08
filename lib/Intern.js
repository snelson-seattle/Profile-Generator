const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, schoolName){
        super(name, id, email);
        this.school = schoolName;
    }   

    // Methods
    getSchool(){
        return this.school;
    }
}

// Overwrite Employee getRole() class method
Intern.prototype.getRole = function(){
    return "Intern";
}

module.exports = Intern;