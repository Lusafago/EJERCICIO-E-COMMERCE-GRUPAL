// Función para actualizar el contador del carrito
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = document.getElementById('cart-counter');

    // Actualiza el contador con la cantidad de productos
    cartCounter.textContent = cart.length;
}

// Función para agregar productos al carrito
function addToCart(productName, price, button) {
    // Obtén el carrito actual desde localStorage o crea uno nuevo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualiza el contador del carrito
    updateCartCounter();

    // Selecciona el div de mensaje correspondiente
    const messageDiv = button.closest('.col-12').querySelector('.message, .message-promos-uno, .message-promos-dos, .message-promos-tres, .message-promos-cuatro');
    
    // Configura el mensaje
    messageDiv.textContent = `${productName} ha sido agregado al carrito.`;
    messageDiv.style.display = 'block'; // Muestra el div

    // Oculta el mensaje después de 2 segundos
    setTimeout(() => {
        messageDiv.style.opacity = '0'; // Suaviza la desaparición
        setTimeout(() => {
            messageDiv.style.display = 'none'; // Finalmente oculta el div
            messageDiv.style.opacity = '1'; // Resetea la opacidad para la próxima vez
        }, 500); 
    }, 2000);
}

/* Función para mostrar el carrito: los datos del carrito se guardan localmente en el 
dispositivo del usuario utilizando localStorage, 
lo que permite que los datos persistan entre sesiones del navegador.*/

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    // Vaciar el contenido actual de la tabla
    cartList.innerHTML = '';

    // Mostrar los productos en la tabla del carrito
    cart.forEach((item, index) => {
        // Crear la fila de la tabla
        let row = document.createElement('tr');

        // Crear la celda para el nombre del producto
        let productCell = document.createElement('td');
        productCell.textContent = item.name;
        row.appendChild(productCell);

        // Crear la celda para el precio del producto
        let priceCell = document.createElement('td');
        priceCell.textContent = `$${item.price}`;
        row.appendChild(priceCell);

        // Crear la celda para el botón de eliminar
        let actionCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => removeFromCart(index); // Llamar a removeFromCart con el índice del producto
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        // Agregar la fila a la tabla
        cartList.appendChild(row);

        // Sumar el precio al total
        total += item.price;
    });

    // Actualizar el total
    cartTotal.textContent = total;

    // Actualiza el contador del carrito después de mostrarlo
    updateCartCounter();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Eliminar el producto del carrito por su índice
    cart.splice(index, 1);

    // Actualizar el localStorage con el carrito modificado
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la visualización del carrito
    displayCart();
}

// Vaciar el carrito
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCounter(); // Asegúrate de actualizar el contador al vaciar el carrito
    displayCart();
}

// Redirigir a la página de pago cuando se hace clic en "Pagar"
function handlePaymentRedirect() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        window.location.href = 'pago.html'; // Redirigir a la página de pago
    } else {
        alert("El carrito está vacío. Agrega productos antes de proceder con el pago.");
    }
}

// Cargar el carrito cuando se accede a carrito.html
if (window.location.pathname.includes('carrito.html')) {
    // Mostrar los productos en el carrito
    displayCart();

    // Asociar el botón de vaciar carrito con su función
    document.getElementById('clear-cart').addEventListener('click', clearCart);

    // Asociar el botón de pagar con su función
    document.getElementById('pay-btn').addEventListener('click', handlePaymentRedirect);

    // Actualiza el contador al cargar la página de carrito
    updateCartCounter();
}

// Inicializar el contador al cargar la página
window.onload = function() {
    // Si el carrito no existe en localStorage, lo inicializamos como un array vacío
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    updateCartCounter(); // Actualiza el contador cuando se carga la página
};
