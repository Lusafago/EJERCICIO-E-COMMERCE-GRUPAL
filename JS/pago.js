// Obtener el total del carrito desde localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

// Función para mostrar el mensaje de pago exitoso
function showPaymentMessage(message) {
    const paymentMessageDiv = document.getElementById('payment-message');
    paymentMessageDiv.textContent = message;
    paymentMessageDiv.style.padding = '20px';
    paymentMessageDiv.style.border = '1px solid green';
    paymentMessageDiv.style.marginTop = '20px';
    paymentMessageDiv.style.textAlign = 'center';
}

// Función para vaciar el carrito
function clearCart() {
    localStorage.removeItem('cart'); // Vaciar el carrito en el localStorage
}

// Pagar con tarjeta
document.getElementById('card-payment').addEventListener('click', () => {
    // Mostrar mensaje de pago con tarjeta
    showPaymentMessage("Pago realizado con éxito. En unos momentos le estaremos enviando el pedido.");

    // Vaciar el carrito
    clearCart();

    // Redirigir a la página de inicio después de 3 segundos
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000); // 3 segundos de retraso para que el usuario pueda ver el mensaje
});

// Pagar en efectivo
document.getElementById('cash-payment').addEventListener('click', () => {
    // Mostrar mensaje de pago en efectivo
    showPaymentMessage(`Gracias por su compra. Deberá abonarle al repartidor la cantidad de $${total}.`);

    // Vaciar el carrito
    clearCart();

    // Redirigir a la página de inicio después de 3 segundos
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000); // 3 segundos de retraso para que el usuario pueda ver el mensaje
});
