// Create a funciton to initialize the app

    //include packages needed for this application
    const fs = require('fs');
    const inquirer = require('inquirer');
    const path = require('path');
    const Manager = require('./lib/Manager')
    const Engineer = require('./lib/Engineer')
    const Intern = require('./lib/Intern')

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

    // const questions2 = [
    //     {
    //         type: 'input',
    //         name: 'name',
    //         message: 'What is name of the Engineer?'
    //     },
    //     {
    //         type: 'input',
    //         name: 'id',
    //         message: 'What is the ID of the Engineer?'
    //     },
    //     {
    //         type: 'input',
    //         name: 'email',
    //         message: 'What is the e-mail of the Engineer?'
    //     },
    //     {
    //         type: 'input',
    //         name: 'github',
    //         message: 'What is the GitHub of the Engineer?'
    //     },
    //     {
    //         type:'list',
    //         name: 'team',
    //         message: 'Would you like to add other team members?',
    //         choices: ['Engineer', 'Intern', 'No more team members']
    //     },

    // ];

    // const questions3 = [
    //     {
    //         type: 'input',
    //         name: 'name',
    //         message: 'What is name of the Intern?'
    //     },
    //     {
    //         type: 'input',
    //         name: 'id',
    //         message: 'What is the ID of the Intern?'
    //     },
    //     {
    //         type: 'input',
    //         name: 'email',
    //         message: 'What is the e-mail of the Intern?'
    //     },
    //     {
    //         type: 'input',
    //         name: 'school',
    //         message: 'What school does the Intern go to?'
    //     },
    //     {
    //         type:'list',
    //         name: 'team',
    //         message: 'Would you like to add other team members?',
    //         choices: ['Engineer', 'Intern', 'No more team members']
    //     },
    // ];

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
                            when: () => data1.role === 'Eningeer',

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
                            fs.writeFile(distPath, render(team), (err) => {
                                if (err) {
                                    throw err;
                                }
                                console.log("Success, team HTML is created!")
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

 


    // inquirer.prompt(questions)
    // .then(function (data) {
    //     if (data.team === 'Engineer') {
    //         inquirer.prompt(questions2)
    //         .then(function (data2) {
    //             console.log(data2);
    //             if (data2.team === 'Engineer') {
    //                 inquirer.prompt(questions2);
    //             };
    //             if (data2.team === 'Intern') {
    //                 inquirer.prompt(questions3);
    //             };
    //             let engineer = new Engineer (data2.name, data2.id, data2.email, data2.github);
    //             console.log(engineer);
    //         })
            
    //     };
    //     if (data.team === 'Intern') {
    //         inquirer.prompt(questions3)
    //         .then(function (data3) {
    //             console.log(data3);
    //             if (data3.team === 'Engineer') {
    //                 inquirer.prompt(questions2);
    //             };
    //             if (data3.team === 'Intern') {
    //                 inquirer.prompt(questions3);
    //             };
    //             let intern = new Intern (data3.name, data3.id, data3.email, data3.school);
    //             console.log(intern);
    //         })
    //     };
    //     let employeeManager = new Manager (data.name, data.id, data.email, data.phone);
    //     console.log(employeeManager);
    // });

// Function call to initialize app
// init();

generateTeam();

