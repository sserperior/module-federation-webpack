const express = require('express');
const { fetch } = require('undici');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

// Server-to-server forwarder: handle /api/* requests by forwarding to localhost:4000
app.post('/api/send', async (req, res) => {
	const result = await fetch('http://localhost:4000/api/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req.body),
	});
	res.status(200).send(await result.text());
});

app.get('/api/remote-url', (req, res) => {
	// In a real application, this URL might be fetched from a database, configuration file or from the environment.
	res.json({ url: process.env.ENV === 'development' ? 'http://localhost:3000/remoteEntry.js' : 'http://localhost:4000/remoteEntry.js' });
});

// Serve host-app production build if it exists
const hostDist = path.resolve(__dirname, '..', '..', 'host-app', 'dist');
console.log('hostDist:', hostDist);

app.use(express.static(hostDist));
app.get('/*splat', (req, res, next) => {
	res.sendFile(path.join(hostDist, 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Host server is running on http://localhost:${PORT}`);
});
