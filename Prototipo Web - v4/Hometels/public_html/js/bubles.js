// Parámetros configurables
const bubbleCount = 30;       // Cantidad de burbujas activas
const bubbleSizeMin = 10;     // Tamaño mínimo de burbuja en px
const bubbleSizeMax = 30;     // Tamaño máximo de burbuja en px
const animationDuration = 8000; // Duración de subida en ms

// Crear burbuja
function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // Tamaño aleatorio
  const size = Math.random() * (bubbleSizeMax - bubbleSizeMin) + bubbleSizeMin;
  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';

  // Posición horizontal aleatoria dentro del viewport
  bubble.style.left = Math.random() * 100 + 'vw';

  // Posición inicial desde abajo (fuera de pantalla)
  bubble.style.bottom = '-50px';

  // Agregar animación con duración aleatoria basado en animationDuration ±20%
  const duration = animationDuration * (0.8 + Math.random() * 0.4);
  bubble.style.animation = `rise ${duration}ms linear forwards`;

  document.body.appendChild(bubble);

  // Eliminar burbuja después de la animación para liberar DOM
  setTimeout(() => {
    bubble.remove();
  }, duration);
}

// Generar continuamente burbujas
setInterval(() => {
  if (document.body) {
    createBubble();
  }
}, animationDuration / bubbleCount);

// Agregar estilos CSS dinámicamente para burbujas y animación
const style = document.createElement('style');
style.textContent = `
  .bubble {
    position: fixed;
    background: rgba(173, 216, 230, 0.5);
    border-radius: 50%;
    pointer-events: none;
    filter: drop-shadow(0 0 2px rgba(0, 150, 255, 0.7));
    will-change: transform, opacity;
  }
  @keyframes rise {
    0% {
      transform: translateY(0);
      opacity: 0.7;
    }
    100% {
      transform: translateY(-120vh);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
