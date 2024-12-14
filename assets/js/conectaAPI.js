// Archivo: conectarApi.js
const urlAPI = '/api/productos.js'; // Función serverless
// Función para listar productos
async function listarProductos() {
    try {
        const respuesta = await fetch(urlAPI, {
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
async function enviarProducto(nombre, precio, url_imagen) {
    try {
        const respuesta = await fetch(urlAPI, {
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

async function eliminarProducto(id) {
    try {
        const respuesta = await fetch(`/api/productos?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!respuesta.ok) {
            throw new Error("No se pudo eliminar el producto");
        }
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error; // Lanza el error para manejarlo fuera de esta función
    }
}
// Exportar las funciones para uso externo
export const conectaAPI = {
    listarProductos,
    eliminarProducto,
    enviarProducto
};
