async function salvarTodo(email, senha) {
  try {
    const response = await fetch('http://localhost:2409/cadastro', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        senha: senha,
        email: email
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched:", data);

    encaminhar();

  } catch (error) {
    console.error("Fetch error:", error);
    alert("Erro ao salvar, tente novamente!");
  }
}

let denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];

// Função para criar e salvar uma denúncia
function criarDenuncia() {
  let titulo = document.getElementById("tituloDenuncia").value.trim();
  let descricao = document.getElementById("denuncia").value.trim();
  let imagem = document.getElementById("preview").querySelector("img")?.src || "";

  if (!titulo || !descricao) {
    alert("Preencha todos os campos!");
    return;
  }

  if (!window.localSelecionado) {
    alert("Selecione o local da denúncia no mapa!");
    return;
  }

  const denuncia = {
    titulo,
    descricao,
    imagem,
    latitude: window.localSelecionado.lat,
    longitude: window.localSelecionado.lng
  };

  denuncias.push(denuncia);
  localStorage.setItem("denuncias", JSON.stringify(denuncias));

  alert("Denúncia registrada!");
  encaminhar2();
}

function encaminhar2() {
  window.location.href = "inicio.html"
}
// Função para exibir todas as denúncias em uma página
function mostrarDenuncias() {
  let container = document.getElementById("listaDenuncias");
  if (!container) return;

  container.innerHTML = "";
  denuncias.forEach(d => {
    container.innerHTML += `
      <div class="denuncia">
        <h3>${d.titulo}</h3>
        <img src="${d.imagem}" alt="Imagem da denúncia" width="200">
        <p>${d.descricao}</p>
      </div>
    `;
  });
}

// Chama automaticamente quando entrar na página de ver denúncias
document.addEventListener("DOMContentLoaded", mostrarDenuncias);
// Redirecionamento genérico
function encaminhar() {
  window.location.href = "inicio.html"
}

// SIDEBAR TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('closeBtn');
  const openBtn = document.getElementById('openBtn');
  const mainSection = document.getElementById('mainSection');

  if (sidebar && closeBtn && openBtn) {
    // Fecha a sidebar
    closeBtn.addEventListener('click', () => {
      sidebar.classList.add('closed');
      mainSection.classList.add('expanded');
      setTimeout(() => openBtn.classList.add('visible'), 300);
    });

    // Abre a sidebar
    openBtn.addEventListener('click', () => {
      sidebar.classList.remove('closed');
      mainSection.classList.remove('expanded');
      openBtn.classList.remove('visible');
    });
  }
});
const video = document.getElementById("video");
const btnAbrir = document.getElementById("btnAbrir");
const btnFoto = document.getElementById("btnFoto");
const preview = document.getElementById("preview");
const canvas = document.createElement("canvas");
let stream = null;

// Abrir câmera
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = "block";
    btnFoto.style.display = "inline-block";
    btnAbrir.style.display = "none";
    preview.innerHTML = "";
  } catch (err) {
    alert("Erro ao acessar a câmera: " + err.message);
    console.error(err);
  }
}

// Parar câmera
function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  video.srcObject = null;
  video.style.display = "none";
  btnFoto.style.display = "none";
  btnAbrir.style.display = "inline-block";
  btnAbrir.textContent = "Tirar novamente?";
}

// Eventos
btnAbrir.addEventListener("click", startCamera);

btnFoto.addEventListener("click", () => {
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL("image/png");
  preview.innerHTML = `<div class="photo-frame"><img src="${dataUrl}" alt="Preview da foto"></div>`;

  stopCamera();
});
