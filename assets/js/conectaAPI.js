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
async function eliminarProducto(id) {
    const respuesta = await fetch(`https://fake-api-beryl.vercel.app/productos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Verificar si la eliminación fue exitosa
    if (respuesta.ok) {
        // Después de eliminar, verificamos si el producto aún existe
        const checkExistencia = await fetch(`https://fake-api-beryl.vercel.app/productos/${id}`);
        if (checkExistencia.ok) {
            // Si el producto aún existe (no fue eliminado correctamente), no recargamos
            console.log("El producto no fue eliminado correctamente.");
        } else {
            // Si el producto ya no existe (eliminado correctamente), recargamos la página
            console.log("Producto eliminado correctamente.");
            location.reload();  // Recarga la página para reflejar los cambios
        }
    } else {
        // Si la respuesta no es exitosa, mostramos un mensaje de error
        console.error("Error al intentar eliminar el producto.");
    }
}


// Exportar las funciones para uso externo
export const conectaAPI = {
    listarProductos,
    eliminarProducto,
    enviarProducto
};
