console.log('mapa.js carregado');

document.addEventListener('DOMContentLoaded', () => {

  // Variáveis globais
  let map = null;
  window.localSelecionado = null;
  let markerSelecionado = null;

  // Elementos do DOM
  const mapDiv = document.getElementById("map");
  const btnLocalizacao = document.getElementById("btnLocalizacao");
  const btnIrDenuncia = document.getElementById("btnIrDenuncia");

  // Inicialmente esconder mapa e botões
  mapDiv.style.display = "none";
  btnLocalizacao.style.display = "none";
  btnIrDenuncia.style.display = "none";

  // Função para mostrar/esconder botão de denunciar
  function atualizarBotaoDenunciar() {
    if (window.localSelecionado) {
      btnIrDenuncia.style.display = "block";
    } else {
      btnIrDenuncia.style.display = "none";
    }
  }

  // Inicializa o mapa
  window.iniciarMapa = function () {
    if (map) return;

    map = L.map('map').setView([-14.2350, -51.9253], 5);

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

      atualizarBotaoDenunciar();
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  };

  // Botão de localização atual
  window.usarLocalizacaoAtual = function () {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        window.localSelecionado = latlng;

        if (markerSelecionado) {
          map.removeLayer(markerSelecionado);
        }

        markerSelecionado = L.marker(latlng)
          .addTo(map)
          .bindPopup('📍 Localização atual')
          .openPopup();

        map.setView(latlng, 16);
        atualizarBotaoDenunciar();
      },
      () => alert("Não foi possível obter sua localização.")
    );
  };
});
