// DATOS DE PRODUCTOS
const productos = [
    { id: 1, nombre: 'Playera Básica', precio: 250, descripcion: 'Playera de algodón puro' },
    { id: 2, nombre: 'Playera Premium', precio: 350, descripcion: 'Playera de máxima calidad' },
    { id: 3, nombre: 'Playera Deportiva', precio: 300, descripcion: 'Ideal para el deporte' },
    { id: 4, nombre: 'Playera Oversize', precio: 320, descripcion: 'Corte amplio y cómodo' },
];

// CARRITO
let carrito = [];

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    inicializarProductos();
    cargarCarritoDelLS();
    configurarPersonalizacion();
});

// GENERAR PRODUCTOS
function inicializarProductos() {
    const productosGrid = document.querySelector('.productos-grid');
    productosGrid.innerHTML = '';

    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.classList.add('producto-card');
        productoCard.innerHTML = `
            <div class="producto-img">👕</div>
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <div class="producto-precio">$${producto.precio}</div>
                <button class="btn btn-primary" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Añadir al Carrito</button>
            </div>
        `;
        productosGrid.appendChild(productoCard);
    });
}

// AÑADIR AL CARRITO
function agregarAlCarrito(nombre, precio) {
    const item = {
        id: Date.now(),
        nombre: nombre,
        precio: precio,
        cantidad: 1
    };

    carrito.push(item);
    guardarCarritoEnLS();
    actualizarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion(`${nombre} añadido al carrito!`);
}

// ACTUALIZAR CARRITO EN LA VISTA
function actualizarCarrito() {
    const carritoItems = document.getElementById('carritoItems');
    
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
    } else {
        carritoItems.innerHTML = '';
        carrito.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('carrito-item');
            itemElement.innerHTML = `
                <div class="item-info">
                    <h4>${item.nombre}</h4>
                    <p>Cantidad: ${item.cantidad}</p>
                </div>
                <div>
                    <div class="item-precio">$${(item.precio * item.cantidad).toFixed(2)}</div>
                    <button class="btn btn-secondary" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                </div>
            `;
            carritoItems.appendChild(itemElement);
        });
    }
    
    actualizarResumenCarrito();
}

// ELIMINAR DEL CARRITO
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarritoEnLS();
    actualizarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion('Producto eliminado del carrito');
}

// LIMPIAR CARRITO
function limpiarCarrito() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito ya está vacío');
        return;
    }
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        carrito = [];
        guardarCarritoEnLS();
        actualizarCarrito();
        actualizarContadorCarrito();
        mostrarNotificacion('Carrito vaciado');
    }
}

// ACTUALIZAR RESUMEN DEL CARRITO
function actualizarResumenCarrito() {
    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });

    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('iva').textContent = iva.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

// ACTUALIZAR CONTADOR DEL CARRITO EN NAVBAR
function actualizarContadorCarrito() {
    const contador = document.querySelector('.cart-count');
    let cantidad = 0;
    carrito.forEach(item => {
        cantidad += item.cantidad;
    });
    contador.textContent = cantidad;
}

// PERSONALIZAR PLAYERA
function configurarPersonalizacion() {
    const colorInput = document.getElementById('colorInput');
    const textInput = document.getElementById('textInput');
    const textColor = document.getElementById('textColor');
    const shirtPreview = document.getElementById('shirtPreview');
    const previewText = document.getElementById('previewText');

    colorInput.addEventListener('change', function() {
        shirtPreview.style.backgroundColor = this.value;
    });

    textInput.addEventListener('input', function() {
        previewText.textContent = this.value || 'Tu Diseño Aquí';
    });

    textColor.addEventListener('change', function() {
        previewText.style.color = this.value;
    });
}

// PROCESAR COMPRA
function procesarCompra() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío');
        return;
    }

    const total = document.getElementById('total').textContent;
    const mensaje = `Procediendo al pago de $${total}. ¿Deseas continuar?`;
    
    if (confirm(mensaje)) {
        mostrarNotificacion('Pago procesado correctamente! Gracias por tu compra');
        setTimeout(() => {
            carrito = [];
            guardarCarritoEnLS();
            actualizarCarrito();
            actualizarContadorCarrito();
            scrollToSection('inicio');
        }, 2000);
    }
}

// SCROLL A SECCIÓN
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// NOTIFICACIÓN
function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #cc0000;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: bold;
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 3000);
}

// LOCAL STORAGE
function guardarCarritoEnLS() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDelLS() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
        actualizarContadorCarrito();
    }
}

// ANIMACIÓN SLIDE IN
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
