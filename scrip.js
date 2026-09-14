// REEMPLAZAR CON EL NÚMERO DE FAST BURGER (con código de país, ej: 5491112345678)
const TELEFONO_BURGER = "5492612470256"; 

let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const lista = document.getElementById('lista-carrito');
    const totalEl = document.getElementById('total-precio');

    lista.innerHTML = '';

    if (carrito.length === 0) {
        lista.innerHTML = '<li class="vacio">No agregaste productos aún.</li>';
        totalEl.innerText = '0';
        return;
    }

    let total = 0;
    carrito.forEach((prod, index) => {
        total += prod.precio;
        const li = document.createElement('li');
        li.innerHTML = `${prod.nombre} - $${prod.precio} <button onclick="eliminarDelCarrito(${index})" style="background:transparent; color:red; float:right;">❌</button>`;
        lista.appendChild(li);
    });

    totalEl.innerText = total.toLocaleString('es-AR');
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarritoUI();
}

function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("Por favor, agrega al menos un producto al carrito.");
        return;
    }

    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const pago = document.getElementById('pago').value;
    const notas = document.getElementById('notas').value;

    if (!nombre || !direccion) {
        alert("Por favor completa tu nombre y dirección.");
        return;
    }

    // Armar lista de productos
    let listaTexto = "";
    let total = 0;
    carrito.forEach((p) => {
        listaTexto += `• ${p.nombre} - $${p.precio}\n`;
        total += p.precio;
    });

    // Formatear mensaje
    const mensaje = 
`*🍔 NUEVO PEDIDO - FAST BURGER 🍟*
___________________________________

📋 *DETALLE DEL PEDIDO:*
${listaTexto}
💰 *TOTAL:* $${total.toLocaleString('es-AR')}

👤 *DATOS DEL CLIENTE:*
• *Nombre:* ${nombre}
• *Dirección:* ${direccion}
• *Forma de Pago:* ${pago}
${notas ? `• *Notas:* ${notas}` : ''}
___________________________________`;

    // Abrir WhatsApp
    const url = `https://wa.me/${TELEFONO_BURGER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}