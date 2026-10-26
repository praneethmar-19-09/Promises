# Backend

Express + TypeScript API server.

## Stack

- Express 5, TypeScript, run with `tsx`
- `helmet` (security headers), `cors`, `zod` (ID validation), `dotenv`
- `morgan` (HTTP request logging)

## Project structure

```
src/
  server.ts              # starts the HTTP server, graceful shutdown
  app.ts                 # express app, middleware, route mounting
  routes/user.routes.ts  # user routes
  controllers/           # request handlers
  services/              # user / order data logic
  middleware/            # error handler
  types/
```

## Run the server

1. Go to the backend folder:
   ```bash
   cd promises/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   PORT=4000
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```
   `FRONTEND_URL` is the allowed CORS origin (defaults to `http://localhost:3000`).
   `PORT` defaults to `4000`.
4. Start in dev mode (auto-restarts on file changes):
   ```bash
   npm run dev
   ```
   The terminal prints `Server is running on port 4000`.

Other scripts:

| Command             | Purpose                              |
| ------------------- | ------------------------------------ |
| `npm run typecheck` | Type-check without emitting          |
| `npm run build`     | Compile to `dist/`                   |
| `npm start`         | Run the compiled `dist/server.js`    |

## API endpoints

| Method | Path                      | Description              |
| ------ | ------------------------- | ------------------------ |
| GET    | `/api/health`             | Health check             |
| GET    | `/api/users`              | List all users           |
| GET    | `/api/users/:id`          | Get one user             |
| GET    | `/api/users/:id/orders`   | Get orders for a user    |

`:id` must be a positive integer, otherwise the API returns `400`.

```bash
curl -s http://localhost:4000/api/users
curl -s http://localhost:4000/api/users/1
curl -s http://localhost:4000/api/users/1/orders
```

Use `curl -i` to also see the response headers.

## What we did / fixes

1. **Fixed 404 on `/api/users`.** The router is mounted with
   `app.use("/api/users", userRoutes)`, but the routes inside `user.routes.ts`
   also started with `/users`, so the list endpoint was served at
   `/api/users/users`. Routes inside the router must be relative to the mount
   point (`/`, `/:id`, `/:id/orders`).
2. **Explained `curl -i` output.** Headers come first, then a blank line, then
   the JSON body. The security headers are added by `helmet`, the CORS headers by `cors`.
3. **Explained where logs go.** `console.log` prints to the terminal running
   the server, not to the `curl` terminal or the browser. Startup and shutdown
   messages print once; `Unhandled application error` prints only when a
   request throws; `Fetched orders for user <id>` prints when the orders
   endpoint is called.
4. **Added request logging with `morgan`.**
   ```bash
   npm i morgan && npm i -D @types/morgan
   ```
   ```ts
   import morgan from "morgan";
   app.use(morgan("dev")); // before the routes
   ```
   Every request now prints a line such as
   `GET /api/users/1 200 5.123 ms - 51` in the server terminal.

## Troubleshooting

- **404 on an endpoint:** check the mount path in `app.ts` plus the route path
  in `user.routes.ts`.
- **No logs in the terminal:** look at the terminal tab where `npm run dev` is
  running; make sure `morgan` is registered before the routes.
- **CORS errors from the frontend:** set `FRONTEND_URL` to the frontend's origin.
