const Employee = require("../lib/Employee");

test("Can create new employee", () => {
    const emp = new Employee();
    expect(typeof emp).toBe("object");
});

test("Can set name", () => {
    const name = "Syed";
    const emp = new Employee(name);
    expect(emp.name).toBe(name);
})

test("Can set id", () => {
    const id = "12";
    const emp = new Employee("Syed", id);
    expect(emp.id).toBe(id);
});

