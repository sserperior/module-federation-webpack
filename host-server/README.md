# Host Server

Lightweight Express server used by the `host-app` during development and production.

This server provides two small helper APIs used by the host application, and it can serve the `host-app` production build from `../host-app/dist` when present.

Prerequisites
- Node.js (14+)
- npm (or yarn)

Install

```bash
npm install
```

Run (development)

```bash
PORT=4001 npm start
```

The `PORT` environment variable is optional; the default is `4001`.

Available endpoints
- `POST /api/send` — a server-to-server forwarder. The host forwards the JSON body to the remote server at `http://localhost:4000/api/send` and returns the remote server response.
- `GET /api/remote-url` — returns a JSON object with the runtime URL for the remote's `remoteEntry.js`, for example:

```json
{ "url": "http://localhost:4000/remoteEntry.js" }
```

Production / Serving the frontend
1. Build the `host-app`:

```bash
cd ../host-app
npm install
npm run build
```

2. Start this server (it will serve the static files from `../host-app/dist`):

```bash
PORT=4001 npm start
```

Notes & troubleshooting
- The host's `/api/send` endpoint expects the remote server to be reachable at `http://localhost:4000` by default. Ensure the `remote-server` is running when testing forwarding.
- If you need to change the remote server address in a real deployment, update the `GET /api/remote-url` response or the server code to read from configuration or environment.

Source
- server entry: `src/index.js`
Host Server

This server runs on port 4001 and:
- Serves `host-app/dist` as static files if present. This is created if you run ```npm build:prod``` in host-app
- Proxies `/api/send` requests to `http://localhost:4000/api/send` (the remote-server backend).

Quick start:

```bash
cd host-server
npm install
npm start
```

Make sure `host-app` is built (`cd host-app && npm run build:prod`) before expecting static assets to be served.
