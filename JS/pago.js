// Obtener el total del carrito desde localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);


// Función para vaciar el carrito
function clearCart() {
    localStorage.removeItem('cart'); // Vaciar el carrito en el localStorage
}

// Función para mostrar mensaje de pago con SweetAlert2
function showPaymentMessage(message, icon) {
    Swal.fire({
        title: '¡Pedido confirmado!',
        text: message,
        icon: icon,
        background: '#fff4e0',
        confirmButtonColor: '#e94e77',
        timer: 5000,
        timerProgressBar: true,
        width: '40rem', 
        customClass: {
            popup: 'swal2-popup',  // Clase personalizada para el popup
           
        }
    });
}



// Pagar con tarjeta
document.getElementById('card-payment').addEventListener('click', () => {
    showPaymentMessage(`Pago realizado con éxito. ¡Tu pedido está en camino!`, 'success');
    clearCart();
    setTimeout(() => window.location.href = 'index.html', 5000);
});

// Pagar en efectivo
document.getElementById('cash-payment').addEventListener('click', () => {
    showPaymentMessage(`Gracias por tu compra. Deberás pagar al repartidor $${total}.`, 'success');
    clearCart();
    setTimeout(() => window.location.href = 'index.html', 5000);
});

