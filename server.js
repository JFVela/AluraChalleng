const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json")); // Conecta con tu db.json
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000; // Cambia el puerto si es necesario
server.listen(PORT, () => {
  console.log(`JSON Server está corriendo en el puerto ${PORT}`);
});
