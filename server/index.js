const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv')
const apiRouter = require('./routes/index')
const onServerStart = require('./utils/onServerStart')


dotenv.config();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});


app.use(express.json())
app.use(apiRouter)



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  onServerStart();
});
