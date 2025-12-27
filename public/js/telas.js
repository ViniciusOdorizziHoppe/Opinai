// ABA DE DENUNCIA
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

// ABA DE AJUDA
document.addEventListener("DOMContentLoaded", () => {

    // Garante que só roda na tela de ajuda
    if (!document.querySelector(".ajuda-container")) return;

    /* Troca dos grupos (Login / Denúncias / Suporte) */

    const cards = document.querySelectorAll(".card");
    const groups = document.querySelectorAll(".faq-group");

    cards.forEach(card => {
        card.addEventListener("click", () => {

            // ativa o card clicado
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            // mostra apenas o grupo correto
            const alvo = card.dataset.target;

            groups.forEach(group => {
                if (group.id === alvo) {
                    group.classList.add("active");
                } else {
                    group.classList.remove("active");
                }
            });

        });
    });

    /* Abrir / fechar cada faq-item */

    document.addEventListener("click", (e) => {

        const botao = e.target.closest(".faq-toggle");
        if (!botao) return;

        const item = botao.closest(".faq-item");
        if (!item) return;

        item.classList.toggle("open");

    });

});