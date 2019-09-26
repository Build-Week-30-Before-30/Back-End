const db = require('../database/db-config')

module.exports = {
    getItems,
    getItemsByUser,
    getItemById,
    addItem,
    editItem,
    deleteItem
}

function getItems() {
    return db('categories as c')
        .innerJoin('items as i', 'i.category_id', '=', 'c.id')
}

function getItemsByUser(id) {
    return db('categories as c')
        .innerJoin('items as i', 'i.category_id', '=', 'c.id')
        .where('i.user_id', id)
}

function getItemById(id) {
    return db('items')
        .where({ id })
        .first()
}

function addItem(newItem) {
    console.log(newItem, 'new item')
    return db('items').insert(newItem)
       
}

function editItem(id, newBody) {
    return db('items')
        .where({ id })
        .update(newBody)
        .then(result => {
            return db('items')
                .where({ id })
                .first()
        })
}

function deleteItem(id) {
    return db('items')
        .where({ id })
        .del()
}