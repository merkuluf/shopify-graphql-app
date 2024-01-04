const express = require('express')
const router = express.Router()

const mainRoutes = require('./mainRoutes')

router.use('/api', mainRoutes)

module.exports = router