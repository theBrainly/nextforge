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

    save() { console.log('Saving user...'); }
// Update 1771332647424

// Update 1771332647607

// Update 1771332648117

// Update 1771332648575

// Update 1771332648619

// Update 1771332649045
