const express = require('express')
const server = express()
const cors = require('cors');
const helmet = require('helmet')

server.use(helmet())
server.use(cors())
server.use(express.json())

const usersRouter = require('../users/users-route')
const itemsRouter = require('../items/items-route')
const categoriesRouter = require('../categories/categories-route')


server.use('/auth', usersRouter)
server.use('/api', itemsRouter)
server.use('/api/categories', categoriesRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' })
})

module.exports = server;