const contenedor = document.getElementById("listaPersonajes");
const buscador = document.getElementById("buscador");
const formulario = document.getElementById("formBusqueda");
const botonLimpiar = document.getElementById("limpiarBusqueda");

let personajesActuales = [];


// Carga y muestra los personajes de una categoría
function cargarPersonajes(categoria) {
    fetch("data/" + categoria + ".json")
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("No se pudo encontrar el archivo de la categoría.");
            }
            return respuesta.json();
        })
        .then(function (datos) {
            personajesActuales = datos.results;
            mostrarPersonajes();

            document.getElementById("personajes").scrollIntoView({
                behavior: "smooth"
            });
        })
        .catch(function (error) {
            console.log("Error al cargar los personajes:", error);
            contenedor.innerHTML = "<p>No se pudieron cargar los personajes.</p>";
        });
}


// Carga los datos de todas las categorías para realizar la búsqueda
function buscarEnTodasLasCategorias(nombreBuscado) {
    const archivos = ["oro", "plata", "bronce", "otros"];

    const solicitudes = archivos.map(function (categoria) {
        return fetch("data/" + categoria + ".json")
            .then(function (respuesta) {
                if (!respuesta.ok) {
                    throw new Error("No se pudo cargar " + categoria + ".json");
                }
                return respuesta.json();
            });
    });

    Promise.all(solicitudes)
        .then(function (datos) {
            personajesActuales = [];

            datos.forEach(function (categoria) {
                categoria.results.forEach(function (personaje) {
                    personajesActuales.push(personaje);
                });
            });

            mostrarPersonajes(nombreBuscado);

            document.getElementById("personajes").scrollIntoView({
                behavior: "smooth"
            });
        })
        .catch(function (error) {
            console.log("Error al buscar personajes:", error);
            contenedor.innerHTML = "<p>No se pudieron cargar los personajes.</p>";
        });
}


// Muestra las fichas y, si se indicó, filtra los resultados
function mostrarPersonajes(nombreBuscado = "") {
    contenedor.innerHTML = "";

    const busqueda = nombreBuscado.trim().toLowerCase();

    // Sin búsqueda mostramos todos los personajes de la categoría cargada.
    let personajesFiltrados = personajesActuales;

    if (busqueda !== "") {
        const coincidenciaExacta = personajesActuales.filter(function (personaje) {
            return personaje.nombre.toLowerCase() === busqueda;
        });

        if (coincidenciaExacta.length > 0) {
            personajesFiltrados = coincidenciaExacta;
        } else {
            personajesFiltrados = personajesActuales.filter(function (personaje) {
                return personaje.nombre.toLowerCase().includes(busqueda) ||
                    personaje.armadura.toLowerCase().includes(busqueda) ||
                    personaje.tecnicas.toLowerCase().includes(busqueda);
            });
        }
    }

    if (personajesFiltrados.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron personajes.</p>";
        return;
    }

    contenedor.innerHTML = personajesFiltrados.map(function (personaje) {
        const imagen = personaje.imagen
            ? `<img src="${personaje.imagen}" alt="Retrato de ${personaje.nombre}" width="500" height="500" decoding="async">`
            : `<div class="personaje-sin-imagen"><span aria-hidden="true">✦</span><p>Imagen no disponible</p></div>`;

        return `
            <article class="personaje">
                ${imagen}
                <h3>${personaje.nombre}</h3>
                <p class="categoria-personaje">${personaje.categoria}</p>
                <p><strong>Armadura:</strong> ${personaje.armadura}</p>
                <p><strong>Procedencia:</strong> ${personaje.procedencia}</p>
                <p><strong>Técnica:</strong> ${personaje.tecnicas}</p>
                <p>${personaje.descripcion}</p>
            </article>
        `;
    }).join("");
}


// Al enviar el formulario, busca en todas las categorías
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const texto = buscador.value.trim();

    if (texto === "") {
        contenedor.innerHTML = "<p>Escribí un nombre, armadura o técnica para buscar.</p>";
        return;
    }

    buscarEnTodasLasCategorias(texto);
});


// Limpia el buscador y las fichas
botonLimpiar.addEventListener("click", function () {
    buscador.value = "";
    personajesActuales = [];
    contenedor.innerHTML = "<p>Seleccioná una categoría o buscá un personaje.</p>";
});