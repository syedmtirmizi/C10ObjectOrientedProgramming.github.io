const path = require('path');
const fs = require('fs');

const srcDir = path.resolve(__dirname, '../src');

const createMain = (html) => {
    const src = fs.readFileSync(path.resolve(srcDir, "main.html"), "utf8");
    return srcPlaceHolder(src, "team", html);
};

const srcPlaceHolder = (src, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + "}}", "gm");
    return src.replace(pattern,value);
};

const create = (employees) => {
    const html = [];

    html.push(
        ...employees.filter((employee) => employee.getRole() === "Manager").map((manager) =>createManager(manager))
    );

    html.push(
        ...employees.filter((employee) => employee.getRole() === "Intern").map((intern) =>createIntern(intern))
    );

    html.push(
        ...employees.filter((employee) => employee.getRole() === "Engineer").map((engineer) =>createEngineer(engineer))
    );

    return createMain(html.join(""));
};

const createManager = (manager) => {
    let src = fs.readFileSync(path.resolve(srcDir, "manager.html"), "utf8");
    src = srcPlaceHolder(src, "name", manager.getName());
    src = srcPlaceHolder(src, "id", manager.getId());
    src = srcPlaceHolder(src, "email", manager.getEmail());
    src = srcPlaceHolder(src, "role", manager.getRole());
    src = srcPlaceHolder(src, "phone", manager.getPhone());
    return src;
};

const createEngineer = (engineer) => {
    let src = fs.readFileSync(path.resolve(srcDir, "engineer.html"), "utf8");
    src = srcPlaceHolder(src, "name", engineer.getName());
    src = srcPlaceHolder(src, "id", engineer.getId());
    src = srcPlaceHolder(src, "email", engineer.getEmail());
    src = srcPlaceHolder(src, "role", engineer.getRole());
    src = srcPlaceHolder(src, "github", engineer.getGithub());
    return src;
};

const createIntern = (intern) => {
    let src = fs.readFileSync(path.resolve(srcDir, "intern.html"), "utf8");
    src = srcPlaceHolder(src, "name", intern.getName());
    src = srcPlaceHolder(src, "id", intern.getId());
    src = srcPlaceHolder(src, "email", intern.getEmail());
    src = srcPlaceHolder(src, "role", intern.getRole());
    src = srcPlaceHolder(src, "github", intern.getGithub());
    return src;
};

module.exports = create