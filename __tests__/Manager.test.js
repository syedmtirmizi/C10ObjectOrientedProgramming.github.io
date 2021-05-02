class Manager {
    constructor (name, id, email, phone) {
        super(name, id, email);
        this.phone = phone;
    }

    getPhone() {
        return this.phone;
    }

    getRole() {
        return "Manager";
    }

}

module.exports = Manager