# MIS Frontend

This is a small React frontend (Vite) for the MIS project. It calls the backend endpoints under `/api/employees`.

Quick start

1. Install dependencies

```bash
npm install
```

2. Run dev server (proxies /api to http://localhost:8080)

```bash
npm run dev
```

3. Build

```bash
npm run build
```

Notes
- Vite dev server proxies `/api` to `http://localhost:8080` as configured in `vite.config.js`. Make sure the Spring Boot app runs on port 8080.
- The UI provides an Employee create form and a list with edit capability.
