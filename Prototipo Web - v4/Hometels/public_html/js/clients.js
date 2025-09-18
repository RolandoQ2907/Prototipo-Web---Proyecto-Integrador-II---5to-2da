const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.seccion');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remover clase activa en botones
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.getAttribute('data-seccion');
    // Mostrar solo la sección seleccionada
    sections.forEach(sec => {
      if (sec.id === target) {
        sec.classList.add('seccion-activa');
      } else {
        sec.classList.remove('seccion-activa');
      }
    });
  });
});

//Boton de Regreso
const btnBack = document.getElementById('btn-back');
btnBack.addEventListener('click', () => {
  window.history.back();
});
