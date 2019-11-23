const router = require('express').Router()

const Items = require('../items/items-model')
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

router.post('/items', (req, res) => {
    const { item_name, description } = req.body;
    console.log(req.body)
    if (!item_name) {
        return res.status(422).json({ error: "fill out required name field!" });
      } else {
      
    const newItem = {item_name, description};
    Items.addItem(req.body) 
        .then(result => {
            console.log("result", result)
        res.status(201).json(result)
            })
        .catch(error => {res.status(500).json(error);
})
}
});


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
            
                Items.editItem(id, newBody)
                    .then(result => res.status(200).json(result))
                    .catch(error => res.status(500).json(error))
            
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