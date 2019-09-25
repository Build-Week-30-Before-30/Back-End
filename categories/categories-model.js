const db = require('../database/db-config')

module.exports = {
    getCategories,
    addCategory,
    deleteCategory
}

function getCategories() {
    return db('categories')
}

function addCategory(newCat) {
    return db('categories')
        .insert(newCat)
        .then(res => getCategories())
}

function deleteCategory(id) {
    return db('categories')
        .where({ id })
        .del()
}