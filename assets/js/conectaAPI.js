// Archivo: conectarApi.js

// Función para listar productos
async function listarProductos() {
    try {
        const respuesta = await fetch("http://localhost:3000/productos", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });

        if (!respuesta.ok) {
            throw new Error("Error al obtener los productos: " + respuesta.status);
        }

        const productos = await respuesta.json();
        return productos;
    } catch (error) {
        console.error("Error al listar productos:", error);
        return [];
    }
}

// Función para crear un producto
async function crearProducto(nombre, precio, url_imagen) {
    try {
        const respuesta = await fetch("http://localhost:3000/productos", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                precio: parseFloat(precio),
                url_imagen: url_imagen
            })
        });

        if (!respuesta.ok) {
            throw new Error("Error al crear el producto: " + respuesta.status);
        }

        const nuevoProducto = await respuesta.json();
        return nuevoProducto;
    } catch (error) {
        console.error("Error al crear producto:", error);
        return null;
    }
}

// Exportar las funciones para uso externo
export const conectaAPI = {
    listarProductos,
    crearProducto
};
