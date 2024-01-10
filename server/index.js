const express = require('express');
const app = express();

const dotenv = require('dotenv')
const apiRouter = require('./routes/index')

const errorHandler = require('./middleware/errorHandler')

dotenv.config();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});



app.use(express.json())

app.use(apiRouter)

app.use(errorHandler)


module.exports = app
