// Create a funciton to initialize the app

//include packages needed for this application
    const fs = require('fs');
    const inquirer = require('inquirer');
    const path = require('path');

//import classes
    const Manager = require('./lib/Manager')
    const Engineer = require('./lib/Engineer')
    const Intern = require('./lib/Intern')
    const create = require("./lib/create") 

//create output pathway
const OUT_DIR = path.resolve(__dirname, 'dist')
const outDirPath = path.join(OUT_DIR, "teamWebPage.html")

//create a array of questions for user input
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'What is name of the team member?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of the team member?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the e-mail of the team member?'
        },
        {
            type:'list',
            name: 'role',
            message: 'Would is the role of the team member?',
            choices: ['Manager', 'Engineer', 'Intern']
        },

    ];

    const team = [];
    const generateTeam = () => {
        inquirer
            .prompt(questions)
            .then((data1) => {
                inquirer
                    .prompt([
                        {
                            when: () => data1.role === 'Manager',

                            type: "input",
                            name: "phone",
                            message: "What is the Manager's office number?",
                        },
                        {
                            when: () => data1.role === 'Engineer',

                            type: "input",
                            name: "github",
                            message: "What is the Engineer's GitHub?",
                        },
                        {
                            when: () => data1.role === 'Intern',

                            type: "input",
                            name: "school",
                            message: "What is the Intern's School?",
                        },
                        {
                            type:"confirm",
                            name: "addTeamMember",
                            message: "Would you like to add another team member?",
                        },

                    ])

                    .then((data2) => {
                        if (data1.role === 'Manager') {
                            const manager = new Manager(data1.name, data1.id, data1.email, data2.phone);
                            team.push(manager);
                        }

                        if (data1.role === 'Engineer') {
                            const engineer = new Engineer(data1.name, data1.id, data1.email, data2.github);
                            team.push(engineer);
                        }

                        if (data1.role === 'Intern') {
                            const intern = new Intern(data1.name, data1.id, data1.email, data2.school);
                            team.push(intern);
                        }

                        if (data2.addTeamMember) {
                            generateTeam ();
                        } else {
                            team.forEach((team) => {
                                console.log(team);
                            });
                            fs.writeFile(outDirPath, create(team), (err) => {
                                if (err) {
                                    throw err;
                                }
                                console.log("Successful, team array exported!")
                            });
                        }
                    });
            })
            .catch((err) => {
                if (err) {
                    throw err;
                }
            });
    };

generateTeam();

