window.addEventListener('DOMContentLoaded', () => {
  const nombreAlmacenado = localStorage.getItem('nombreEmpleado') || 'Empleado';
  const profileName = document.querySelector('.profile-name');
  profileName.textContent = nombreAlmacenado;

  const welcomeMsg = document.querySelector('.welcome-message');
  welcomeMsg.innerHTML = `
    Querido ${nombreAlmacenado}, nos alegra que haya iniciado sesión para empezar a hacerse cargo del hotel que le corresponde. Como parte fundamental de nuestra familia HomeTels, queremos que sepa que valoramos mucho su compromiso, dedicación y profesionalismo. 
    <br/><br/>
    Estamos convencidos de que con su esfuerzo y responsabilidad, lograremos brindar la mejor experiencia a nuestros huéspedes y mantener la excelencia en la administración de las habitaciones y servicios del hotel. Su aporte es clave para el éxito de nuestro equipo.
    <br/><br/>
    Le deseamos mucho éxito en esta nueva etapa y queremos que sepa que aquí encontrará apoyo, crecimiento y reconocimiento. ¡Bienvenido a nuestra compañía, estamos felices de contar con usted!
  `;
});
