const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }   

    // Methods
    getOfficeNumber(){
        return this.officeNumber;
    }
}

// Overwrite Employee getRole() class method
Manager.prototype.getRole = function(){
    return "Manager";
}

module.exports = Manager;