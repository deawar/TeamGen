const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const validator = require("email-validator");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
let employees = [];
let manager = [];
let engineer = [];
let intern = [];


const employeeQues = [
    {
        type: "list",
        message: "What type of employee would you like to add? \n Choose 'Done' when you have entered your team.\n",
        choices: ["Manager", "Engineer", "Intern", "Done"],
        name: "role",
        
    },
    {
        type: "input",
        message: "What is the Employee's name?",
        name: "name",
        when: (employeeQues) => employeeQues.role !== "Done",
        validate: async (input) => {
            if (await input.trim().length === 0) {
                return "NOT a valid entry! Please try again.";
            } else if (input.match(/^[a-zA-Z]+( [a-zA-Z]+)*$/i)) {
                return true;
            } else {
                return "Not a valid entry brah!"
            }
        }
    },
    {
        type: "input",
        message: "What is the Employee's id(Numbers only)?",
        name: "id",
        when: (employeeQues) => employeeQues.role !== "Done",
        validate: async (input) => {
            if (input.match(/^[0-9]+$/i)) {
                return true;
            } else {
                return "Not valid. Enter ID number."
            }
        }
    },
    {
        type: "input",
        message: "What is the Employee's email?",
        name: "email",
        when: (employeeQues) => employeeQues.role !== "Done",
        validate: async (input) => {
            if (input.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i)) {
                return true;
            } else {
                return "Not a valid email address."
            }
        }    
    },
    {
        type: "input",
        message: "What is your Office Number?",
        name: "officeNumber",
        when: (employeeQues) => employeeQues.role === 'Manager',
        validate: async (input) => {
            if (input.match(/^[0-9]+$/i)) {
                return true;
            } else {
                return "Not valid. Enter office number."
            }
        }
    },
    {
        type: "input",
        message: "What is your GitHub Username?",
        name: "github",
        when: (employeeQues) => employeeQues.role === 'Engineer',
        validate: async (input) => {
            if (await input.trim().length === 0) {
                return "NOT a valid entry!"; //Reg X for GitHub names from https://github.com/shinnn/github-username-regex/blob/master/module.js
            } else if (input.match(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i)) {
                return true;
            } else {
                return "Please enter a valid GitHub Username!"
            }
        }
    },
    {
        type: "input",
        message: "What school are you affilated with?",
        name: "school",
        when: (employeeQues) => employeeQues.role === 'Intern',
        validate: async (input) => {
            if (await input.trim().length === 0) {
                return "not valid entry brah!";
            } else if (input.match(/^[a-zA-Z]+( [a-zA-Z]+)*$/i)) {
                return true;
            } else {
                return "Not a valid entry! A-Z, a-z only please."
            }
        }
    }
];

    const getUserInput = async () => {
        try {
            console.clear();
            console.log("Team Gen");
            const input = await inquirer.prompt(employeeQues);
            employees.push(input);
            
            if (input.role !== "Done") {
                if (input.role === "Manager"){
                    let man = new Manager(input.name, input.id, input.email, input.officeNumber); 
                    console.log("line 119: after create manager:", input);
                    console.log("line 120: also after create manager:", man);
                    manager.push(man);
                }
                else if (input.role === "Engineer") {
                    let eng = new Engineer(input.name, input.id, input.email, input.github);
                    engineer.push(eng);
                    console.log ("Created Engineer: ",engineer);
                //engineer = new Engineer[(input.name, input.id, input.email, input.github)];
                console.log("New engineer:",engineer);
                }
                else{
                    let inte = new Intern(input.name, input.id, input.email, input.school);
                        intern.push(inte);
                        console.log ("Created Intern: ",intern);
                }

                //employees.push(input);
                console.log ("Line 180 for now \nArray of Employees: ", employees);
                console.clear();
                init();
            } else {
                employees = [...manager, ...engineer, ...intern];
                //console.log("**************Input**************: ",employees)
                let html = render(employees);
                let page = fs.existsSync(OUTPUT_DIR) 
                
                if (page === false) {
                    fs.mkdir(OUTPUT_DIR, (err) => {
                        if (err){
                            console.log(err);
                        }
                    });
                } else if (page === true) {
                    fs.writeFile(outputPath, html, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                console.log("Your Team.html file has been generated and is in ",outputPath);
                console.log("Ok, Thanks for using TeamGen. Exiting Program...");
            } 
             
        } catch (err) {
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
        console.clear();
        getUserInput();
    }
init()