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
        when: (employeeQues) => employeeQues.role !== "Done"
    },
    {
        type: "input",
        message: "What is the Employee's id?",
        name: "id",
        when: (employeeQues) => employeeQues.role !== "Done"
    },
    {
        type: "input",
        message: "What is the Employee's email?",
        name: "email",
        when: (employeeQues) => employeeQues.role !== "Done"
    },
    {
        type: "input",
        message: "What is your Office Number?",
        name: "officeNumber",
        when: (employeeQues) => employeeQues.role === 'Manager'
    },
    {
        type: "input",
        message: "What is your GitHub Username?",
        name: "github",
        when: (employeeQues) => employeeQues.role === 'Engineer'
    },
    {
        type: "input",
        message: "What school are you affilated with?",
        name: "school",
        when: (employeeQues) => employeeQues.role === 'Intern'
    }
];

    const getUserInput = async () => {
        try {
            const input = await inquirer.prompt(employeeQues);
            employees.push(input);
            
            if (input.role !== "Done") {
               
                //employees.push(input);
                console.log ("Array of Employees: ", employees);
                init();
            } else {
                console.log("**************Input**************: ",employees)
                let html = render(employees);
                let page = fs.existsSync(OUTPUT_DIR) 
                
                if (page === false) {
                    fs.mkdir(OUTPUT_DIR, (err) => {
                        if (err){
                            console.log(err);
                        }
                    }
                } else if (page === true) {
                    fs.writeFile(outputPath, html, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                }

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
        console.log("Team Gen");
        getUserInput();
    }
init()