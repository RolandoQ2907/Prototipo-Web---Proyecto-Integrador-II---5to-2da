// Código existente para guardar form...

// Evento para mostrar/ocultar código
document.addEventListener('DOMContentLoaded', () => {
  const togglePass = document.querySelector('.campo span.toggle-pass');
  const inputPass = document.getElementById('codigo');

  togglePass.addEventListener('click', () => {
    if(inputPass.type === 'password') {
      inputPass.type = 'text';
      togglePass.textContent = 'Ocultar';
    } else {
      inputPass.type = 'password';
      togglePass.textContent = 'Mostrar';
    }
  });
});
