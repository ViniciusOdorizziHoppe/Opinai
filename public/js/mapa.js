console.log('mapa.js carregado');

let map = null;
window.localSelecionado = null;
let markerSelecionado = null;

window.iniciarMapa = function () {
  if (map) return;

  map = L.map('map').setView([-14.2350, -51.9253], 5);
  window.map = map;

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

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

  setTimeout(() => {
    map.invalidateSize();
  }, 200);
};
