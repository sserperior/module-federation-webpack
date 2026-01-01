const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { isAlpha, isInt } = require('validator');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.post('/api/send', (req, res) => {
	console.log(`Hello from the remote server! Time: ${new Date().toISOString()}`);
	const name = req.body.name;
	const age = req.body.age;
	console.log(`name: ${req.body.name}, age: ${req.body.age}`);
	const validationErrors = [];
	const isNameValid = isAlpha(name);
	if (!isNameValid) {
		validationErrors.push('Name must contain only letters.');
	}
	const isAgeValid = isInt(age);
	if (!isAgeValid) {
		validationErrors.push('Age must be an integer.');
	}
	if (!isNameValid || !isAgeValid) {
		return res.status(400).send({ validationErrors});
	}
	res.status(200).send(`Message received at ${new Date().toISOString()}`);
});

// Serve remote-app production build if it exists
const remoteDist = path.resolve(__dirname, '..', '..', 'remote-app', 'dist');
console.log('remoteDist:', remoteDist);

app.use(express.static(remoteDist));
app.get('/*splat', (req, res, next) => {
	res.sendFile(path.join(remoteDist, 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Remote server is running on http://localhost:${PORT}`);
});