const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model')
const restricted = require('../users/authenticate-middleware')
const secrets = require('../config/secrets')


// MIDDLEWARES

// validate user creds

function validateUser(req, res, next) {
    if (Object.keys(req.body).length <= 0) {
        res.status(400).json({ message: 'missing username and password' })
    } else if (!req.body.username) {
        res.status(400).json({ message: 'missing required username field' })
    } else if (!req.body.password) {
        res.status(400).json({ message: 'missing required password field'})
    } else {
        next()
    }
}


// ENDPOINTS

// REGISTER NEW USER

router.post('/register', validateUser, (req, res) => {
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 4)
    newUser.password = hash

    Users.getUsers()
        .then(users => {
            const arr = users.map(user => user.username)
            const found = arr.find(function(element) {
                return element == newUser.username
            })

            if (found) {
                res.status(400).json({ message: 'username is unavailable' })
            } else {
                Users.addUser(newUser)
                    .then(user => {
                        res.status(201).json({ message: 'user successfully registered'})
                    })
            }
        })
        .catch(error => res.status(500).json(error))
})


// LOGIN

router.post('/login', validateUser, (req, res) => {
    const { username, password } = req.body

    Users.userLogin(username)
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = getToken(user);

            res.status(200).json({
                message: `Welcome ${user.username}`,
                token,
            })
        } else {
            res.status(401).json({ message: 'Invalid Credentials' })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})


// GET ALL USERS

router.get('/', restricted, (req, res) => {
    Users.getUsers()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})


// UPDATE USER CREDS

router.put('/update/:id', validateUser, (req, res) => {
    const {id} = req.params
    const newBody = req.body
    const hash = bcrypt.hashSync(newBody.password, 4)
    newBody.password = hash

    Users.editUser(id, newBody)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})



function getToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}


module.exports = router;