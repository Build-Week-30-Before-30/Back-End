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

router.post('/register', (req, res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 14)
    user.password = hash
    Users.addUser(user)
        .then(created => {
            res.status(201).json(created)
        }).catch(error => {
            res.status(500).json({ message: 'failed to add user' })
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
     .first()
      .then(user => {
          console.log(user)
        if (user && bcrypt.compareSync(password, user.password)) {
          // create username token 
          const token = generateToken(user);
  
          // send back the token 
          res.status(200).json({ token });
        } else {
  
          // incorrect password 
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
          console.log(error)
        // no user with that username 
        res.status(500).json({
          message: 'An error has occured with the server',
          error: error
        });
      });
  }); 
   
// router.post('/login', (req, res) => {
//     let { username, password } = req.body
//     Users.findBy({ username })//takes first item out of object
//         //passing it the password guess in plain text and the password hash obtained from the database to validate credentials.
//         //If the password guess is valid, the method returns true, otherwise it returns false.The library will hash the password guess first and then compare the hashes
//         .then(user => {
//             if (user && bcrypt.compareSync(password, user.password)) {
//                 const token = generateToken(user)
//                 res.status(200).json({ message: `Hello ${user.username}, You've successfully logged in`, token })
//             } else {
//                 res.status(401).json({ message: 'invalid login info, try again.' })
//             }
//         }).catch(error => {
//             console.log(error)
//         //     res.status(500).json({ message: 'Hey backend, you messed up, login failed', error })
//         })
// })

function generateToken(user) {
    const payload = {
        username: user.username,
    }
    const option = {
        expiresIn: '8h'
    }
    return jwt.sign(payload, secrets.jwtSecret, option)
}

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