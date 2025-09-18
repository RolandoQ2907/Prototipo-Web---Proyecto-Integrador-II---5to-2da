// Datos simulados
const localidades = [
    "Buenos Aires","Córdoba","Rosario","Mendoza",
    "La Plata","Mar del Plata","Salta","Tucumán",
    "Neuquén","San Juan","Resistencia","Santa Fe",
    "Corrientes","Posadas","Bariloche","Paraná"
];

const hotelesPorLocalidad = {
    "Buenos Aires": [
    { nombre: "Hotel Central BA", imagen: "../../../../images/thumbnails-Hotels/HotelCenBsAs.png", total: 80, disponibles: 18 },
    { nombre: "Hotel Plaza", imagen: "../../../../images/thumbnails-Hotels/HotelPlaza.png", total: 120, disponibles: 45 }
    ],
    "Córdoba": [
    { nombre: "Córdoba Suites", imagen: "../../../../images/thumbnails-Hotels/CordobaSuite.png", total: 65, disponibles: 20 }
    ],
    // puedes agregar hoteles para más localidades aquí
};

const listaLocalidades = document.getElementById('localidades-lista');
const contenedorHoteles = document.getElementById('hoteles-contenido');

// Crear botones localidades
localidades.forEach(localidad => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = localidad;
    btn.addEventListener('click', () => {
    // Actualizar UI
    document.querySelectorAll('.localidades button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    mostrarHoteles(localidad);
    });
    li.appendChild(btn);
    listaLocalidades.appendChild(li);
});

function mostrarHoteles(localidad) {
    contenedorHoteles.innerHTML = '';
    const hoteles = hotelesPorLocalidad[localidad];
    if(!hoteles || hoteles.length === 0){
    contenedorHoteles.innerHTML = '<p class="mensaje-inicial">No hay hoteles registrados en esta localidad.</p>';
    return;
    }
    // Crear lista de hoteles
    const divLista = document.createElement('div');
    divLista.className = 'hotel-list';

    hoteles.forEach(hotel => {
    const divHotel = document.createElement('div');
    divHotel.className = 'hotel';

    const nombre = document.createElement('h3');
    nombre.textContent = hotel.nombre;

    const img = document.createElement('img');
    img.src = hotel.imagen;
    img.alt = 'Imagen ' + hotel.nombre;

    const info = document.createElement('p');
    info.textContent = `Cantidad habitaciones (${hotel.disponibles}/${hotel.total})`;

    const btnAdmin = document.createElement('button');
    btnAdmin.textContent = 'Administrar';
    btnAdmin.addEventListener('click', () => {
        if (hotel.nombre === "Hotel Central BA") {
            window.location.href = 'RoomPanel.html';
        } else {
            alert(`Administrar hotel: ${hotel.nombre} (sin redirección)`);
            // O poner lógica distinta para ese hotel
        }
    });


    const infoDiv = document.createElement('div');
    infoDiv.className = 'hotel-info';
    infoDiv.appendChild(nombre);
    infoDiv.appendChild(info);

    divHotel.appendChild(img);
    divHotel.appendChild(infoDiv);
    divHotel.appendChild(btnAdmin);

    divLista.appendChild(divHotel);
    });

    contenedorHoteles.appendChild(divLista);
}