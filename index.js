const server = require('./api/server')

const port = process.env.PORT || 7800
server.listen(port, () => console.log(`Server is running on port ${port}`))