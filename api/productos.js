// api/productos.js
import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.resolve('db.json'); // Asegúrate de que db.json esté en la raíz del proyecto

export default async function handler(req, res) {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        const productos = JSON.parse(data).productos;

        if (req.method === 'GET') {
            res.status(200).json(productos);
        } else if (req.method === 'POST') {
            const nuevoProducto = req.body;
            const db = JSON.parse(data);
            db.productos.push(nuevoProducto);
            await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
            res.status(201).json(nuevoProducto);
        } else if (req.method === 'DELETE') {
            const { id } = req.query;
            const db = JSON.parse(data);
            const productosFiltrados = db.productos.filter(producto => producto.id !== parseInt(id));
            await fs.writeFile(dbPath, JSON.stringify({ productos: productosFiltrados }, null, 2));
            res.status(200).json({ message: 'Producto eliminado' });
        } else {
            res.status(405).json({ message: 'Método no permitido' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
