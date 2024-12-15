const url = "/api/productos";

export const listarProductos = async () => {
    try {
        const respuesta = await fetch(url);
        const productos = await respuesta.json();
        return productos;
    } catch (error) {
        console.error("Error al listar productos:", error);
    }
};

export const enviarProducto = async (producto) => {
    try {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(producto),
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error al enviar producto:", error);
    }
};

export const eliminarProducto = async (id) => {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
};
