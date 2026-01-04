Host App (Webpack 5)

Quick start

1. Install dependencies

```bash
cd host-app
npm i
```

2. Run dev server on localhost:3001 with HMR support. API requests are proxied to localhost:4001

```bash
npm dev
```

3. Build

```bash
npm run build
```

4. Preview on localhost:3001. No API requests are proxied. This is for UI previewing only.

```bash
npm run preview
```

5. Combinations and Results

| remote-app  | remote-server | host-app     | host-server                  | Port          | Result                                                          |
| :---------  | :------------ | :----------- | :--------------------------- | :------------ | :-------------------------------------------------------------- |
| not running | not running   | dev          | not running                  | 3001          | Error loading remote component.                                 |
| dev         | running       | dev          | not running                  | 3001          | Front end ok. Form submission failed with status 504.           |
| dev         | running       | dev          | running (ENV=development)    | 3001          | Error loading remote component.                                 |
| preview     | not running   | dev          | not running                  | 3001          | Front end ok. Form submission failed with status 504.           |
| preview     | not running   | dev          | running                      | 3001          | Error loading remote component.                                 |
| preview     | not running   | preview      | not running                  | 3001          | Front end ok. Form submission "works". serve server returns ok. |
| build       | running       | dev          | not running                  | 3001          | Error loading remote component.                                 |
| build       | running       | dev          | running                      | 3001          | Front end ok. Form submission works.                            |
| build       | running       | preview      | not running                  | 3001          | Error loading remote component.                                 |
| build       | running       | build        | running                      | 4001          | Front end ok. Form submission works.                            |