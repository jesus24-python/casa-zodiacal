document.addEventListener("DOMContentLoaded", function () {
    const botonesAgregar = document.querySelectorAll(".btn_icono");
    const botonesAgregarOffcanvas = document.querySelectorAll(".agregar-carrito");
    const listaCarrito = document.getElementById("lista-carrito");
    const totalSpan = document.getElementById("total");
    const btnComprar = document.getElementById("btn-comprar");
    const contadorCarrito = document.getElementById("contador-carrito");
    const contadorCarritoFijo = document.getElementById("contador-carrito-fijo");

    // ✅ Cargar carrito y total desde localStorage si existen
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = carrito.reduce((sum, item) => sum + item.precio, 0);

    function guardarEnLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Función para agregar productos al carrito
    function agregarProducto(nombre, precio, imagen) {
        carrito.push({ nombre, precio, imagen });
        total += precio;
        actualizarCarrito();
        guardarEnLocalStorage();
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(index) {
        total -= carrito[index].precio;
        carrito.splice(index, 1);
        actualizarCarrito();
        guardarEnLocalStorage();
    }

    // funcion vaciar carrito 
    function vaciarCarrito(){
        carrito = [];
        total = 0;
        actualizarCarrito();
        localStorage.removeItem("carrito"); //  Elimina datos guardados
    }

    // Evento para agregar productos desde los botones en la card
    botonesAgregar.forEach((btn) => {
        btn.addEventListener("click", () => {
            const producto = btn.closest(".card");
            const nombre = producto.querySelector(".card-title").textContent;
            const precioTexto = producto.querySelector("p").textContent.replace(/\D/g, '');
            const precio = parseInt(precioTexto);
            const imagen = producto.querySelector("img").src;

            agregarProducto(nombre, precio, imagen);
        });
    });

    // Evento para agregar productos desde el offcanvas 
    botonesAgregarOffcanvas.forEach((btn) => {
        btn.addEventListener("click", () => {
            const offcanvas = btn.closest(".offcanvas");
            const nombre = offcanvas.querySelector(".offcanvas-header h5")?.textContent.trim();
            const precioTexto = offcanvas.querySelector("p strong")?.nextSibling?.textContent || "0";
            const precio = parseInt(precioTexto.replace(/\D/g, '')) || 0;
            const imagen = offcanvas.querySelector("img")?.src;

            if (nombre && precio && imagen) {
                agregarProducto(nombre, precio, imagen);
            }
        });
    });

    // Función para actualizar la vista del carrito
    function actualizarCarrito() {
        listaCarrito.innerHTML = "";
        carrito.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex align-items-center";
            li.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                <div>
                    <strong>${item.nombre}</strong><br>
                    <span>$${item.precio.toLocaleString("es-CO")}</span>
                </div>
                <span class="eliminar-item" onclick="eliminarProducto(${index})" style="cursor: pointer; color: red; font-weight: bold; margin-left: auto;">&times;</span>
            `;
            listaCarrito.appendChild(li);
        });

        totalSpan.textContent = total.toLocaleString("es-CO");
        contadorCarrito.textContent = carrito.length;

        if (contadorCarritoFijo) {
            contadorCarritoFijo.textContent = carrito.length;
        }

        const mensaje = encodeURIComponent(
            "¡Hola! casa zodiacal un cordial saludo quisiera comprar los siguientes productos:\n" +
            carrito.map(p => `- ${p.nombre}: $${p.precio}`).join("\n") +
            `\n\nTotal: $${total.toLocaleString("es-CO")}`
        );
        btnComprar.href = `https://wa.me/573108959076?text=${mensaje}`;
    }

    // ✅ Mostrar carrito guardado al cargar
    actualizarCarrito();

    // Hacer accesible la función eliminar desde el HTML
    window.eliminarProducto = eliminarProducto;

    // vaciar carrito
    window.vaciarCarrito = vaciarCarrito;
});
