document.addEventListener('DOMContentLoaded', () => {
  const telaMapa = document.getElementById('telaMapa');
  const telaDenuncia = document.getElementById('telaDenuncia');

  const btnAbrirMapa = document.getElementById('btnAbrirMapa');
  const btnIrDenuncia = document.getElementById('btnIrDenuncia');
  const btnLocalizacao = document.getElementById('btnLocalizacao');
  const mapDiv = document.getElementById('map');

  // Abrir mapa
  btnAbrirMapa.addEventListener('click', () => {
    mapDiv.style.display = 'block';
    btnLocalizacao.style.display = 'block';
    btnAbrirMapa.style.display = 'none';

    window.iniciarMapa();
  });

  // Ir para tela de formulário
  btnIrDenuncia.addEventListener('click', () => {
    if (!window.localSelecionado) {
      alert('Clique no mapa para escolher o local da denúncia!');
      return;
    }

    telaMapa.style.display = 'none';
    telaDenuncia.style.display = 'flex';
  });
});
