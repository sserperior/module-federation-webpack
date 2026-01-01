Remote App (Webpack 5)

Quick start

1. Install dependencies

```bash
cd remote-app
npm i
```

2. Run dev server on localhost:3000 with HMR support. API requests will be proxied to localhost:4000.

```bash
npm dev
```

3. Build

```bash
npm run build
```

4. Preview on localhost:3000. No API requests are proxied. This is for UI previewing only.

```bash
npm run preview
```

5. Combinations and Results

| remote-app | remote-server | Port         |      Result                                                     |
| :--------- | :------------ | :----------- | :-------------------------------------------------------------- |
| dev        | not running   | 3000         | Front end ok. Form Submission failed with status 504.           |
| dev        | running       | 3000         | Front end ok. Submission works.                                 |
| preview    | not running   | 3000         | Front end ok. Submission "works". serve server returns OK.      |
| preview    | running       | 3000         | Front end ok. Submission "works". serve server returns OK.      |
| build      | running       | 4000         | Front end ok. Submission works.                                 |
