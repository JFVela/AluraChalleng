const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Cambia "db.json" si usas otro archivo
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = 3000; // Cambia el puerto si es necesario
server.listen(PORT, () => {
    console.log(`JSON Server está corriendo en http://localhost:${PORT}`);
});
