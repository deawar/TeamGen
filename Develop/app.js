const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const employees = [];

const start = [
    {
        type:"confirm",
        message: "Are you ready to build your team?",
        name: "team",
    }
];

const employeeQues = [
    {
        type: "list",
        message: "What type of employee would you like to add?",
        choices: ["manager", "engineer", "intern"],
        name: "role"
    }
]

const generalQues = [
    {
        type: "input",
        message: "What is the Employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the Employee's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the Employee's email?",
        name: "email"
    }
];        
const managerQ = [{
    type: "input",
    message: "What is your Office Number?",
    name: "officeNumber"
}
]; 

const engineerQ = [{
    type: "input",
    message: "What is your GitHub Username?",
    name: "github"
}
]; 

const internQ = [{
    type: "input",
    message: "What school are you affilated with?",
    name: "school"
}
];
 
const getUserInput = async () => {
    try{
        const input = await inquirer.prompt(start)
        console.log(input)
        console.log(employees)
        if(input.team){
            //prompt next questions
            console.log("Ok, the Team Building Begin!");
            const getEmployee = await inquirer.prompt(generalQues)
        }else{
            console.log( "Ok, Thanks for useing TeamGen. Exiting Program...")
        }

    }catch(err){
        console.log(err)
    }
  
}

// const getInfo = async (role) =>{
//     try{
//         const askQuestions = [...generalQues]
//         if (role === "manager"){
//             askQuestions.push(managerQ)
//             // const input = await inquirer.prompt(askQuestions)
//         }else if (role === "engineer"){
//             askQuestions.push(engineerQ)
//             // const input = await inquirer.prompt(askQuestions)

//         }else if (role === "intern"){
//             askQuestions.push(internQ)
//             // const input = await inquirer.prompt(askQuestions)
//         } 



//     }catch(err){
//         console.log(err)
//     }
// }

const getEmployeeType =async () => {
    try{
       const askQuestions = [...generalQues]
        const input = await inquirer.prompt(employeeQues)
        
        if (input.role === "manager"){
            askQuestions.push(managerQ)
            // const input = await inquirer.prompt(askQuestions)
        }else if (input.role === "engineer"){
            askQuestions.push(engineerQ)
            // const input = await inquirer.prompt(askQuestions)

        }else if (input.role === "intern"){
            askQuestions.push(internQ)
            // const input = await inquirer.prompt(askQuestions)
        } 
        const questions = await inquirer.prompt(askQuestions)

        if (input.role === "manager"){
            ///take all answers from questions line 109 and create new instance of Manager Class then push to employees
        const employee = new Manager(questions.name,questions.id, questions.email, questions.officeNumber) 
       
    }else if (input.role === "engineer"){
            askQuestions.push(engineerQ)
            // const input = await inquirer.prompt(askQuestions)

        }else if (input.role === "intern"){
            askQuestions.push(internQ)
            // const input = await inquirer.prompt(askQuestions)
        } 
        
        

    }catch(err){
        console.log(err)
    }
}
//Question: Are you ready to build your Team?
// Employee Type: {manager, Engineer, Intern, Done}
// Common Question Arr{Name, Id, Email} possibly include in each class for now
//Questsion: individual class questions
//  Manager: create new Manager obj (How many Managers?)
//    push into employees[]
//  prompt Add new Employee?
//  Engineer:  create new Engineer obj 
//    push into employees[]
//  prompt Add new Employee? 
//  Intern:  create new Intern obj 
//    push into employees[]
//  prompt Add new Employee?
//Call renderHTML render(employees) and store in a variable(Try)
// Take return variable and pass to fs.write(Try)        


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
// for the provided `render` function to work!```
function init() {
    getUserInput();
}
console.clear();
console.log("Team Gen");

init ()