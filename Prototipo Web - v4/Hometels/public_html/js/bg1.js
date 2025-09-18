const container = document.querySelector('.circles-container');
const circleCount = 40;
const circles = [];

function randomRange(min, max) {
return Math.random() * (max - min) + min;
}

for (let i = 0; i < circleCount; i++) {
const circle = document.createElement('div');
circle.classList.add('circle');
container.appendChild(circle);

// Tamaño inicial algo mayor para ser visible
const size = randomRange(80, 200);
circle.style.width = `${size}px`;
circle.style.height = `${size}px`;
circle.style.top = `${randomRange(0, window.innerHeight - size)}px`;
circle.style.left = `${randomRange(0, window.innerWidth - size)}px`;

circles.push({
    element: circle,
    x: parseFloat(circle.style.left),
    y: parseFloat(circle.style.top),
    size: size,
    scale: 1,
    dx: randomRange(-1.5, 1.5),
    dy: randomRange(-1.3, 1.3),
    dscale: randomRange(0.0015, 0.003),
    growing: Math.random() > 0.5
});
}

function animate() {
circles.forEach(c => {
    c.x += c.dx;
    c.y += c.dy;

    if (c.growing) {
    c.scale += c.dscale;
    if (c.scale > 1.15) c.growing = false;
    } else {
    c.scale -= c.dscale;
    if (c.scale < 0.85) c.growing = true;
    }

    // Limites con rebote (para no salir del viewport)
    if (c.x < 0) { c.x = 0; c.dx = -c.dx; }
    if (c.x > window.innerWidth - c.size) { c.x = window.innerWidth - c.size; c.dx = -c.dx; }
    if (c.y < 0) { c.y = 0; c.dy = -c.dy; }
    if (c.y > window.innerHeight - c.size) { c.y = window.innerHeight - c.size; c.dy = -c.dy; }

    c.element.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) scale(${c.scale})`;
});

requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
circles.forEach(c => {
    c.x = randomRange(0, window.innerWidth - c.size);
    c.y = randomRange(0, window.innerHeight - c.size);
    c.element.style.width = `${c.size}px`;
    c.element.style.height = `${c.size}px`;
});
});