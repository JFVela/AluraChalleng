import { conectaAPI } from "./conectaAPI.js";
const lista = document.querySelector("[data-lista]");

// Función para crear una card de producto
export default function crearCardProducto(nombre, precio, url_imagen) {
    const producto = document.createElement("li");
    producto.innerHTML = `
        <div class="card">
            <img src="${url_imagen}" alt="Producto de imagen" class="imagen__producto">
            <div class="card-container--info">
                <p>${nombre}</p>
                <div class="card-container--value">
                    <p>$ ${precio.toFixed(2)}</p>
                    <img src="assets/icons/tacho.png" alt="Eliminar producto" class="icono__tacho">
                </div>
            </div>
        </div>`;
    return producto;
}

// Función para listar productos y mostrarlos en la lista
async function listarProductos() {
    try {
        const listaAPI = await conectaAPI.listarProductos();
        listaAPI.forEach(producto => {
            lista.appendChild(crearCardProducto(producto.nombre, producto.precio, producto.url_imagen));
        });
    } catch {
        lista.innerHTML = "<h2 class=\"mensaje__titulo\">Ha ocurrido un error en el servidor :,v</h2>";
    }
}

listarProductos();
