const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

if (process.env.VERCEL) {
  // On Vercel → export handler
  module.exports = server;
} else {
  // Local dev
  const port = 3000;
  server.listen(port, () => {
    console.log(`JSON Server running on http://localhost:${port}`);
  });
}
