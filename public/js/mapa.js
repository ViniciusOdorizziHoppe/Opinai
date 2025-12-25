console.log('mapa.js carregado');

// posição inicial Brasil
const map = L.map('map').setView([-14.2350, -51.9253], 5);

// camada do mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// tenta localizar o usuário
map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });

map.on('locationfound', e => {
  L.marker(e.latlng)
    .addTo(map)
    .bindPopup('📍 Você está aqui')
    .openPopup();
});

// variável global para o local escolhido
window.localSelecionado = null;
let markerSelecionado = null;

// ao clicar no mapa, escolher local da denúncia
map.on('click', e => {
  window.localSelecionado = e.latlng;

  if (markerSelecionado) {
    map.removeLayer(markerSelecionado);
  }

  markerSelecionado = L.marker(e.latlng)
    .addTo(map)
    .bindPopup('📌 Local da denúncia')
    .openPopup();
});
