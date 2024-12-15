// Archivo: conectarApi.js
//WEB
//https://fake-api-beryl.vercel.app/productos
//LOCAL
//http://localhost:3000/productos

// Función para listar productos
async function listarProductos() {
    try {
        const respuesta = await fetch("https://fake-api-beryl.vercel.app/productos", {
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
        const respuesta = await fetch("https://fake-api-beryl.vercel.app/productos", {
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
        // Si el producto se agrega correctamente, lo devolvemos para actualizar la UI
        return nuevoProducto;
    } catch (error) {
        console.error("Error al crear producto:", error);
        return null;
    }
}

// Función para eliminar un producto
async function eliminarProducto(id, setProductos) {
    try {
        const respuesta = await fetch(`https://fake-api-beryl.vercel.app/productos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo eliminar el producto");
        }

        // Actualizar la lista de productos eliminando el producto eliminado sin recargar la página
        setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));

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
