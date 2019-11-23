const db = require('../database/db-config')

module.exports = {
    addUser,
    getUsers,
    findBy,
    editUser
}

function addUser(user) {
    return db('users')
        .insert(user)
}

function findBy(filter) {
    return db('users').where(filter)
    .first();
}

function getUsers() {
    return db('users')
}

function editUser(id, newBody) {
    return db('users')
        .where({ id })
        .update(newBody)
        .then(newId => {
            return db('users')
                .where({ id })
                .first()
        })
}