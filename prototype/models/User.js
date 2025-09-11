class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }

    static async findById(id) {
        // TODO: Implement DB lookup
        return new User(id, 'testuser');
    }
}

module.exports = User;
