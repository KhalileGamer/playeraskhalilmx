// DATOS DE PRODUCTOS CON LINKS DE PAGO INTEGRADOS
const productos = [
  {
    code: 'PC01',
    name: 'Playera Cuello V Caballero',
    gender: 'Caballero',
    type: 'Cuello V',
    sizes: ['S', 'M', 'G', 'XL'],
    price: 180,
    paymentLink: 'https://mpago.la/2sZT4iM',
    colors: ['Negro', 'Blanco', 'Rosa', 'Azul Rey', 'Azul Marino', 'Morado', 'Café', 'Gris'],
    description: 'Playera de algodón puro con cuello en V'
  },
  {
    code: 'PD01',
    name: 'Playera Cuello V Dama',
    gender: 'Dama',
    type: 'Cuello V',
    sizes: ['S', 'M', 'G'],
    price: 180,
    paymentLink: 'https://mpago.la/2sZT4iM',
    colors: ['Negro', 'Blanco', 'Rosa', 'Azul Rey', 'Azul Marino', 'Morado', 'Café', 'Gris'],
    description: 'Playera de algodón puro con cuello en V para dama'
  },
  {
    code: 'PC02',
    name: 'Playera Cuello Redondo Caballero',
    gender: 'Caballero',
    type: 'Cuello Redondo',
    sizes: ['S', 'M', 'G', 'XL', '2XL'],
    price: 200,
    paymentLink: 'https://mpago.la/26J3w3Z',
    colors: ['Negro', 'Blanco', 'Rosa', 'Azul Rey', 'Azul Marino', 'Morado', 'Café', 'Rojo', 'Verde Oscuro', 'Gris'],
    description: 'Playera clásica de algodón con cuello redondo'
  },
  {
    code: 'PD02',
    name: 'Playera Cuello Redondo Dama',
    gender: 'Dama',
    type: 'Cuello Redondo',
    sizes: ['S', 'M', 'G', 'XL'],
    price: 200,
    paymentLink: 'https://mpago.la/26J3w3Z',
    colors: ['Negro', 'Blanco', 'Rosa', 'Azul Rey', 'Azul Marino', 'Morado', 'Café', 'Rojo', 'Verde Oscuro', 'Gris'],
    description: 'Playera clásica de algodón con cuello redondo para dama'
  },
  {
    code: 'PC03',
    name: 'Playera Manga Larga Normal Caballero',
    gender: 'Caballero',
    type: 'Manga Larga Normal',
    sizes: ['S', 'M', 'G', 'XL'],
    price: 250,
    paymentLink: 'https://mpago.la/2Z6pR37',
    colors: ['Negro', 'Azul Marino'],
    description: 'Playera cómoda de manga larga'
  },
  {
    code: 'PD03',
    name: 'Playera Manga Larga Normal Dama',
    gender: 'Dama',
    type: 'Manga Larga Normal',
    sizes: ['S', 'M'],
    price: 250,
    paymentLink: 'https://mpago.la/2Z6pR37',
    colors: ['Negro', 'Azul Marino'],
    description: 'Playera cómoda de manga larga para dama'
  },
  {
    code: 'PC04',
    name: 'Playera Manga Larga Bicolor Caballero',
    gender: 'Caballero',
    type: 'Manga Larga Bicolor',
    sizes: ['S', 'M', 'G'],
    price: 250,
    paymentLink: 'https://mpago.la/1BAUPzG',
    colors: ['Azul Marino', 'Negro'],
    description: 'Playera de diseño bicolor con mangas de contraste'
  },
  {
    code: 'PD04',
    name: 'Playera Manga Larga Bicolor Dama',
    gender: 'Dama',
    type: 'Manga Larga Bicolor',
    sizes: ['S', 'M', 'G'],
    price: 250,
    paymentLink: 'https://mpago.la/1BAUPzG',
    colors: ['Azul Marino', 'Negro'],
    description: 'Playera de diseño bicolor con mangas de contraste para dama'
  },
  {
    code: 'PC05',
    name: 'Sudadera Con Capucha Unisex',
    gender: 'Unisex',
    type: 'Sudadera Con Capucha',
    sizes: ['S', 'M', 'G', 'XL'],
    price: 300,
    paymentLink: 'https://mpago.la/1AsZwXC',
    colors: ['Negro', 'Blanco', 'Azul Marino', 'Azul Rey', 'Rosa', 'Morado'],
    description: 'Sudadera cómoda y versátil con capucha'
  },
  {
    code: 'PD06',
    name: 'Sudadera Sin Capucha Unisex',
    gender: 'Unisex',
    type: 'Sudadera Sin Capucha',
    sizes: ['S', 'M', 'G', 'XL'],
    price: 300,
    paymentLink: 'https://mpago.la/2HLmXh2',
    colors: ['Negro', 'Blanco', 'Azul Marino', 'Azul Rey', 'Rosa', 'Morado'],
    description: 'Sudadera cómoda sin capucha'
  }
];

// CARRITO
let carrito = [];

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
  inicializarProductos();
  cargarCarritoDels();
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
        <h3>${producto.name}</h3>
        <p>${producto.description}</p>
        <div class="producto-precio">$${producto.price}</div>
        <button class="btn btn-primary" onclick="redirigirAPago('${producto.code}', ${producto.price}, '${producto.paymentLink}')">Comprar Ahora</button>
      </div>
    `;
    productosGrid.appendChild(productoCard);
  });
}

// REDIRIGIR A PAGO
function redirigirAPago(productCode, precio, paymentLink) {
  const producto = productos.find(p => p.code === productCode);
  if (!producto) return;
  
  // Abrir el link de pago en una nueva pestaña
  window.open(paymentLink, '_blank');
  
  // También añadir al carrito
  carrito.push({
    ...producto,
    cartId: Date.now()
  });
  
  guardarCarrito();
  actualizarCarrito();
  alert(`${producto.name} - Se abrirá el pago. Si necesitas ayuda, contacta con nosotros.`);
}

// GUARDAR CARRITO EN LOCAL STORAGE
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// CARGAR CARRITO DESDE LOCAL STORAGE
function cargarCarritoDels() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
  }
}

// ACTUALIZAR VISTA DEL CARRITO
function actualizarCarrito() {
  const carritoCount = document.querySelector('.cart-count');
  if (carritoCount) {
    carritoCount.textContent = carrito.length;
  }
  actualizarResumen();
}

// ACTUALIZAR RESUMEN DEL CARRITO
function actualizarResumen() {
  const subtotal = carrito.reduce((sum, item) => sum + item.price, 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;
  
  const subtotalEl = document.querySelector('#subtotal');
  const ivaEl = document.querySelector('#iva');
  const totalEl = document.querySelector('#total');
  
  if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2);
  if (ivaEl) ivaEl.textContent = iva.toFixed(2);
  if (totalEl) totalEl.textContent = total.toFixed(2);
}

// LIMPIAR CARRITO
function limpiarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

// PROCESAR COMPRA
function procesarCompra() {
  if (carrito.length === 0) {
    alert('El carrito está vacío');
    return;
  }
  alert('Procesando compra...');
}

// CONFIGURAR PERSONALIZACIÓN
function configurarPersonalizacion() {
  const textInput = document.querySelector('#textInput');
  const textColor = document.querySelector('#textColor');
  const colorInput = document.querySelector('#colorInput');
  const shirtPreview = document.querySelector('#shirtPreview');
  const previewText = document.querySelector('#previewText');
  
  if (!shirtPreview) return;
  
  if (textInput) {
    textInput.addEventListener('input', (e) => {
      if (previewText) previewText.textContent = e.target.value || 'Tu Diseño Aquí';
    });
  }
  
  if (textColor) {
    textColor.addEventListener('change', (e) => {
      if (previewText) previewText.style.color = e.target.value;
    });
  }
  
  if (colorInput) {
    colorInput.addEventListener('change', (e) => {
      shirtPreview.style.backgroundColor = e.target.value;
    });
  }
}

// DESPLAZAR A SECCIÓN
function scrollToSection(sectionId) {
  const section = document.querySelector(`#${sectionId}`);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
