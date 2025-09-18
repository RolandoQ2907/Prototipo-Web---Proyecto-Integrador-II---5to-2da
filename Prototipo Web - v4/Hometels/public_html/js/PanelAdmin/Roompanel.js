const mockRooms = [
{ id: 1, number: '101', type: 'Estándar', status: 'occupied', guest: 'Juan Pérez', checkout: '2024-09-18' },
{ id: 2, number: '102', type: 'Estándar', status: 'available', guest: null, checkout: null },
{ id: 3, number: '201', type: 'Superior', status: 'maintenance', guest: null, checkout: null },
{ id: 4, number: '301', type: 'Suite', status: 'occupied', guest: 'María García', checkout: '2024-09-17' },
{ id: 5, number: '302', type: 'Suite', status: 'cleaning', guest: null, checkout: null },
];

const mockReservations = [
{ id: 1, guest: 'Carlos Rodriguez', room: '205', checkin: '2024-09-16', checkout: '2024-09-20', status: 'confirmed', total: 45000, channel: 'direct' },
{ id: 2, guest: 'Ana Martínez', room: '103', checkin: '2024-09-17', checkout: '2024-09-19', status: 'pending', total: 28000, channel: 'booking' },
{ id: 3, guest: 'Roberto Silva', room: '401', checkin: '2024-09-18', checkout: '2024-09-22', status: 'checkedin', total: 78000, channel: 'direct' }
];

let searchTerm = '';
let statusFilter = 'all';

function getStatusColor(status) {
switch (status) {
    case 'available': return 'status-available';
    case 'occupied': return 'status-occupied';
    case 'maintenance': return 'status-maintenance';
    case 'cleaning': return 'status-cleaning';
    case 'confirmed': return 'status-confirmed';
    case 'pending': return 'status-pending';
    case 'cancelled': return 'status-cancelled';
    case 'checkedin': return 'status-checkedin';
    default: return '';
}
}
function getStatusText(status) {
switch (status) {
    case 'available': return 'Disponible';
    case 'occupied': return 'Ocupada';
    case 'maintenance': return 'Mantenimiento';
    case 'cleaning': return 'Limpieza';
    case 'confirmed': return 'Confirmada';
    case 'pending': return 'Pendiente';
    case 'cancelled': return 'Cancelada';
    case 'checkedin': return 'Check-in';
    default: return status;
}
}

function renderRooms() {
const container = document.getElementById('rooms-list');
container.innerHTML = '';
mockRooms.forEach(room => {
    const div = document.createElement('div');
    div.className = 'border rounded-lg p-4 hover:shadow-md transition-shadow cursor-default';

    const statusClass = getStatusColor(room.status);

    div.innerHTML = `
    <div class="flex items-center justify-between mb-2">
        <h4 class="font-semibold text-lg">Hab. ${room.number}</h4>
        <span class="px-2 py-1 text-xs rounded-full ${statusClass}">${getStatusText(room.status)}</span>
    </div>
    <p class="text-sm text-gray-600 mb-2">${room.type}</p>
    ${room.guest ? `<div class="mb-3">
        <p class="text-sm font-medium">${room.guest}</p>
        ${room.checkout ? `<p class="text-xs text-gray-500">Salida: ${room.checkout}</p>` : ''}
    </div>` : ''}
    <div class="flex gap-1">
        <select class="flex-1 text-xs border rounded px-2 py-1" data-room-id="${room.id}">
        <option value="available" ${room.status === 'available' ? 'selected' : ''}>Disponible</option>
        <option value="occupied" ${room.status === 'occupied' ? 'selected' : ''}>Ocupada</option>
        <option value="cleaning" ${room.status === 'cleaning' ? 'selected' : ''}>Limpieza</option>
        <option value="maintenance" ${room.status === 'maintenance' ? 'selected' : ''}>Mantenimiento</option>
        </select>
    </div>
    `;
    container.appendChild(div);
});

container.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', (e) => {
    const roomId = parseInt(e.target.getAttribute('data-room-id'));
    const newStatus = e.target.value;
    const room = mockRooms.find(r => r.id === roomId);
    if(room) {
        room.status = newStatus;
        renderRooms();
    }
    });
});
}

function renderReservations() {
const tbody = document.getElementById('reservationsTableBody');
tbody.innerHTML = '';

let filtered = mockReservations.filter(r => {
    const matchesSearch = r.guest.toLowerCase().includes(searchTerm.toLowerCase()) || r.room.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
});

filtered.forEach(r => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50';
    const statusClass = getStatusColor(r.status);
    const statusText = getStatusText(r.status);

    tr.innerHTML = `
    <td class="px-6 py-4 whitespace-nowrap"><div class="text-sm font-medium text-gray-900">${r.guest}</div></td>
    <td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${r.room}</div></td>
    <td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${r.checkin} - ${r.checkout}</div></td>
    <td class="px-6 py-4 whitespace-nowrap"><span class="px-2 py-1 text-xs rounded-full ${statusClass}">${statusText}</span></td>
    <td class="px-6 py-4 whitespace-nowrap"><div class="text-sm font-medium text-gray-900">$${r.total.toLocaleString()}</div></td>
    <td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-900 capitalize">${r.channel}</div></td>
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div class="flex gap-2">
        <button title="Ver detalles" class="text-blue-600 hover:text-blue-900">👁️</button>
        <button title="Editar reserva" class="text-green-600 hover:text-green-900">✏️</button>
        <button title="Eliminar reserva" class="text-red-600 hover:text-red-900">🗑️</button>
        </div>
    </td>
    `;
    tbody.appendChild(tr);
});
}

function showTab(tabName) {
document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
document.getElementById(tabName).classList.remove('hidden');

document.querySelectorAll('.tab-button').forEach(button => {
    if (button.getAttribute('data-tab') === tabName) {
    button.classList.add('bg-blue-100', 'text-blue-700');
    button.classList.remove('text-gray-600');
    } else {
    button.classList.remove('bg-blue-100', 'text-blue-700');
    button.classList.add('text-gray-600');
    }
});
}

document.addEventListener('DOMContentLoaded', () => {
renderRooms();
renderReservations();
showTab('dashboard');
});

document.querySelectorAll('.tab-button').forEach(btn => {
btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    showTab(tab);
});
});

document.getElementById('searchInput').addEventListener('input', e => {
searchTerm = e.target.value;
renderReservations();
});
document.getElementById('statusFilter').addEventListener('change', e => {
statusFilter = e.target.value;
renderReservations();
});

document.getElementById('btn-update-status').addEventListener('click', () => {
alert('Estados de habitaciones actualizados (simulado).');
});

document.getElementById('btnExport').addEventListener('click', () => {
alert('Exportar reservas (simulado).');
});