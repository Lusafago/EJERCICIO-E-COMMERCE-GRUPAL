
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
      // Evita el envío si el formulario no es válido o si el honeypot está lleno
      if (!validarFormulario()) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Añade las clases de Bootstrap para mostrar validaciones
      form.classList.add('was-validated');
    });

    // Validación adicional para el campo de correo
    const emailInput = document.getElementById('validationDefaultUsername');
    emailInput.addEventListener('input', function () {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        emailInput.classList.add('is-invalid');
      } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      }
    });
  });

  function validarFormulario() {
    const campos = document.querySelectorAll('input[required]');
    let esValido = true;

    campos.forEach(campo => {
      if (!campo.checkValidity()) {
        campo.setCustomValidity(campo.title);
        esValido = false;
      } else {
        campo.setCustomValidity('');
      }
    });

    // Verificación del honeypot para protección contra SPAM
    const honeypot = document.getElementById('honeypot');
    if (honeypot.value !== "") {
      esValido = false; // Evita el envío del formulario si el honeypot no está vacío
    }

    return esValido;
  }

  /* */

  window.onload = function() {
    // Mostrar todas las categorías al cargar la página
    var categorias = document.querySelectorAll('.oculto');
    categorias.forEach(function(categoria) {
        categoria.style.display = 'block';  // Mostrar todas las categorías
    });

    // Detectar si hay un hash en la URL (ej: #contenedor1)
    var hash = window.location.hash;
    if (hash) {
        // Ocultar todas las categorías
        categorias.forEach(function(categoria) {
            categoria.style.display = 'none';
        });

        // Mostrar solo la categoría seleccionada
        var categoriaSeleccionada = document.querySelector(hash);
        if (categoriaSeleccionada) {
            categoriaSeleccionada.style.display = 'block';

            // Forzar el recargado de las imágenes en la categoría seleccionada
            var imagenes = categoriaSeleccionada.querySelectorAll('img');
            imagenes.forEach(function(imagen) {
                var src = imagen.src;
                imagen.src = '';  // Vaciamos el src temporalmente
                imagen.src = src; // Recargamos la imagen forzadamente
            });
        }
    }
};

// Este boton de volver en pagos, Vuelve a la página anterior en el historial
function goBack() {
  window.history.back(); 
}