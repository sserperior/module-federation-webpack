# Remote Server

Express server backing the `remote-app`. It exposes a simple API used by the demo remote and serves the `remote-app` production build from `../remote-app/dist` when available.

Prerequisites
- Node.js (14+)
- npm (or yarn)

Install

```bash
npm install
```

Run (development)

```bash
PORT=4000 npm start
```

The `PORT` environment variable is optional; the default is `4000`.

Available endpoints
- `POST /api/send` — accepts JSON like `{ "name": "Alice", "age": "30" }` and validates the fields:
  - `name` must contain only letters
  - `age` must be an integer
  Returns `200` with a confirmation string on success, or `400` with `{ validationErrors }` on validation failure.

Production / Serving the frontend
1. Build the `remote-app`:

```bash
cd ../remote-app
npm install
npm run build
```

2. Start this server (it will serve static files from `../remote-app/dist`, including `remoteEntry.js`):

```bash
PORT=4000 npm start
```

Notes & troubleshooting
- The server serves static files from `../remote-app/dist` so ensure `remote-app` is built before relying on the remote entry.
- Validation uses the `validator` package; malformed `name`/`age` values will return a `400` response with `validationErrors`.

Source
- server entry: `src/index.js`
Remote Server

This server runs on port 4000 and:
- Serves `remote-app/dist` as static files if present. This is created if you run ```npm build``` in host-app

Quick start:

```bash
cd remote-server
npm install
npm start
```

Make sure `remote-app` is built (`cd remote-app && npm run build`) before expecting static assets to be served.
