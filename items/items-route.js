const router = require('express').Router()

const Items = require('./items-model')
const restricted = require('../users/authenticate-middleware')


// MIDDLEWARES

// verify body

function checkBody(req, res, next) {
    if (!req.body.item_name) {
        res.status(400).json({ message: 'missing required item_name field' })
    } else if (!req.body.category_id) {
        res.status(400).json({ message: 'missing requires category_id' })
    } else {
        next()
    }
}

// check id

function checkId(req, res, next) {
    const { id } = req.params
    Items.getItemById(id)
        .then(result => {
            if (result) {
                next()
            } else {
                res.status(400).json({ message: 'invalid item id' })
            }
            console.log(result, 'result')})
}

// check body for properties

function bodyProps(req, res, next) {
    const propCheck = req.body

    console.log(Object.keys(propCheck).length)
    if (Object.keys(propCheck).length < 7) {
        next()
    } else {
        res.status(400).json({ message: 'server can only post object with property keys of: item_name, category_id, complete, description, privacy, target_date'})
    }
}


// CREATE NEW ITEM

router.post('/items', bodyProps, restricted, checkBody, (req, res) => {
    const newItem = req.body
    const { id } = req.user
    // console.log(newItem, 'new item')

    Items.addItem(newItem, id)
        .then(result => res.status(201).json(result))
        // .then(result => res.send('send it'))
        .catch(error => res.status(500).json(error))
})


// READ ALL ITEMS

router.get('/items', restricted, (req, res) => {

    Items.getItems()
        .then(result => {
            result.forEach( result => result.complete ? result.complete = true : result.complete = false )
            result.forEach( result => result.privacy ? result.privacy = "private" : result.privacy = "public" )
            res.status(200).json(result)
        })
        .catch(error => res.status(500).json(error))
})


// READ ITEMS BY USER

router.get('/user-items', restricted, (req, res) => {
    console.log(req.user, 'user')
    const { id } = req.user

    Items.getItemsByUser(id)
        .then(result => {
            result.forEach( result => result.complete ? result.complete = true : result.complete = false )
            result.forEach( result => result.privacy ? result.privacy = "private" : result.privacy = "public" )
            res.status(200).json(result)
        })
        .catch(error => res.status(500).json(error))
})


// READ ITEM BY ID

router.get('/item/:id', restricted, checkId, (req, res) => {
    const { id } = req.params

    Items.getItemById(id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

// UPDATE ITEM

router.put('/update-item/:id', restricted, checkId, checkBody, bodyProps, (req, res) => {
    const { id } = req.params
    const userId = req.user.id
    const newBody = req.body
    console.log(userId, 'userid')

    Items.getItemById(id)
        .then(item => {
            if (item.user_id === userId) {
                Items.editItem(id, newBody)
                    .then(result => res.status(200).json(result))
                    .catch(error => res.status(500).json(error))
            } else {
                res.status(400).json({ message: 'user can only edit item with corresponding user id' })
            }
        })
})


// DELETE ITEM

router.delete('/remove-item/:id', restricted, checkId, (req, res) => {
    const { id } = req.params

    Items.deleteItem(id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

module.exports = router;