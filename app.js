const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the manager's employee id number?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager's email address?"
    },
    {
        type: "input",
        name: "office",
        message: "What is the manager's office number?"
    }
];

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the engineer's employee id number?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the engineer's email address?"
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub username?"
    }
];

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the intern's employee id number?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the intern's email address?"
    },
    {
        type: "input",
        name: "school",
        message: "What is the intern's school name?"
    }
];

const employeeTemplate = {
    name: "",
    id: 0,
    email: "",
    github: "",
    school: "",
    office: 0
};
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
async function askQuestions(questions){
    let answers = [];
    for(let i=0; i<questions.length; i++){
        // loop through the array of inquirer questions
        let answer = await inquirer.prompt([
            {
                type: questions[i]["type"],
                name: questions[i]["name"],
                message: questions[i]["message"]
            }
        ]);
        answers.push(answer);
    } 
    return answers;
}

async function getEmployees(){
    let employees = [];
    
    let addEmployee = true;

    while(addEmployee){
        let type =  await getEmployeeType();
        let employeeInfo = await getEmployeeInfo(type);

        // Populate employee template object with employee information 
        for(let i=0; i<employeeInfo.length; i++){
            if(employeeTemplate.hasOwnProperty(Object.keys(employeeInfo[i]))){
                // Find the keyname in templateData that matches keyname in results and then assign the value from results[keyname] to templateData[keyname]
                employeeTemplate[Object.keys(employeeInfo[i])] = Object.values(employeeInfo[i]).pop();
            }
        }

        let employee = createEmployee(type);
        employees.push(employee);
    
        addEmployee = await addConfirmation();        
    }

    return employees;
}

async function getEmployeeType(){
    let output = await inquirer.prompt([
        {
            type: "list",
            name: "type",
            choices: ['Manager', 'Engineer', 'Intern'],
            message: "What type of employee do you want to create?"

        }
    ]);

    return output.type.toLowerCase();
}

async function getEmployeeInfo(employeeType){
    let info;
    switch(employeeType){
        case "engineer":
            info = await askQuestions(engineerQuestions);
            break;
        case "intern":
            info = await askQuestions(internQuestions);
            break;
        case "manager":
            info = await askQuestions(managerQuestions);
            break;
    }

    return info;   
}

async function addConfirmation(){
    let answer = await inquirer.prompt([
        {
            type: "confirm",
            name: "confirmation",
            message: "Add another employee?"
        }
    ]);

    return answer.confirmation;
}

function createEmployee(employeeType){
    switch(employeeType){
        case "engineer":
            return new Engineer(employeeTemplate.name, employeeTemplate.id, employeeTemplate.email, employeeTemplate.github);
        case "intern":
            return new Intern(employeeTemplate.name, employeeTemplate.id, employeeTemplate.email, employeeTemplate.school);
        case "manager":
            return new Manager(employeeTemplate.name, employeeTemplate.id, employeeTemplate.email, employeeTemplate.office);
    }
}

async function init(){
    let employees = await getEmployees();
    console.log(employees);
}



init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
