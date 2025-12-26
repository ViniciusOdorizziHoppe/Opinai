const telaMapa = document.getElementById('telaMapa');
const telaDenuncia = document.getElementById('telaDenuncia');

const btnAbrirMapa = document.getElementById('btnAbrirMapa');
const btnIrDenuncia = document.getElementById('btnIrDenuncia');
const mapDiv = document.getElementById('map');

btnAbrirMapa.addEventListener('click', () => {
  mapDiv.style.display = 'block';
  btnIrDenuncia.style.display = 'block';
  btnAbrirMapa.style.display = 'none';

  window.iniciarMapa();
});

btnIrDenuncia.addEventListener('click', () => {
  if (!window.localSelecionado) {
    alert('Clique no mapa para escolher o local da denúncia!');
    return;
  }

  telaMapa.style.display = 'none';
  telaDenuncia.style.display = 'flex';
});
