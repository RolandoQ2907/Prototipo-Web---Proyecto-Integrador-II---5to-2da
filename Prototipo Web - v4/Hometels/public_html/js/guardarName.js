const form = document.getElementById('personal-form');

// Define el código válido aquí
const CODIGO_VALIDO = "HOTEL123";

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre = form.nombre.value.trim();
  const codigo = form.codigo.value.trim();

  if(!nombre){
    alert('Por favor, ingresa tu nombre completo.');
    return;
  }

  // Validar código
  if(codigo !== CODIGO_VALIDO){
    alert('Código de verificación incorrecto. Por favor, inténtalo de nuevo.');
    return;
  }

  // Si pasa validación guarda datos y redirige
  localStorage.setItem('nombreEmpleado', nombre);

  // Luego puedes agregar guardar otros campos si quieres

  window.location.href = './ingresoEmpleado/pagInicio.html';
});
