import { conectaAPI } from "./conectaAPI.js";

const formulario = document.querySelector("[data-formulario]");

async function crearProducto(evento) {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = parseFloat(document.querySelector("[data-precio]").value);
    const urlImagen = document.querySelector("[data-url-imagen]").value;

    // Generar ID o descripción aleatoria
    const idAleatorio = Math.floor(Math.random() * 10000).toString(); // Número entre 0 y 9999

    try {
        // Validar entradas antes de enviar
        if (!nombre || !urlImagen || isNaN(precio) || precio <= 0) {
            throw new Error("Por favor, completa todos los campos correctamente.");
        }

        // Enviar datos a la API
        await conectaAPI.enviarProducto(nombre, precio, urlImagen, idAleatorio);
        location.reload();
    } catch (error) {
        alert(`Error al enviar el producto: ${error.message}`);
    }
}

formulario.addEventListener("submit", crearProducto);
