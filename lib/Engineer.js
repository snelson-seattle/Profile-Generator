const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, gitHubUserName){
        super(name, id, email);
        this.github = gitHubUserName;
    }

    // Methods
    getGithub() {
        return this.github;
    }
}

// Overwrite Employee getRole() class method
Engineer.prototype.getRole = function(){
    return "Engineer";
}

module.exports = Engineer;