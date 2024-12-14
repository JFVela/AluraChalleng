import { conectaAPI } from "./conectaAPI.js";
const lista = document.querySelector("[data-lista]");

// Función para crear una card de producto
export default function crearCardProducto(id, nombre, precio, url_imagen) {
    const producto = document.createElement("li");

    producto.innerHTML = `
        <div class="card">
            <img src="${url_imagen}" alt="Producto de imagen" class="imagen__producto">
            <div class="card-container--info">
                <p>${nombre}</p>
                <div class="card-container--value">
                    <p>$ ${precio.toFixed(2)}</p>
                    <img src="assets/icons/tacho.png" alt="Eliminar producto" class="icono__tacho" data-eliminar>
                </div>
            </div>
        </div>
    `;

    // Configura el evento de eliminación
    const botonEliminar = producto.querySelector("[data-eliminar]");
    botonEliminar.addEventListener("click", async () => {
        try {
            await conectaAPI.eliminarProducto(id);
            producto.remove(); // Elimina el elemento del DOM
        } catch (error) {
            alert("Error al eliminar el producto, inténtalo de nuevo.");
        }
        console.log(id);
    });

    return producto;
}

async function listarProductos() {
    try {
        const listaAPI = await conectaAPI.listarProductos();
        listaAPI.forEach(producto => {
            lista.appendChild(crearCardProducto(producto.id, producto.nombre, producto.precio, producto.url_imagen));
        });
    } catch {
        lista.innerHTML = "<h2 class='mensaje__titulo'>Error al cargar los productos</h2>";
    }
}

listarProductos();