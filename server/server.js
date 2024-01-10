const app = require('./index')
const port = process.env.PORT || 3000;
const onServerStart = require('./utils/onServerStart')


app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
	onServerStart();
  });