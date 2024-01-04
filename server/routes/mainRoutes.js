const express = require('express')
const router = express.Router()
const controllers = require('../controllers/mainControllers')

router.get('/products', controllers.fetchProducts)

module.exports = router