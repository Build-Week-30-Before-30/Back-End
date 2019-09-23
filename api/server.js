const express = require('express')
const cors = require('cors');
const helmet = require('helmet')

const server = express()

const usersRouter = require('../users/users-route')
const itemsRouter = require('../items/items-route')
const categoriesRouter = require('../categories/categories-route')

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/auth', usersRouter)
server.use('/api', itemsRouter)
server.use('/api/categories', categoriesRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' })
})

module.exports = server;