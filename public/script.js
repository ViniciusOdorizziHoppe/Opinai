async function salvarTodo(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (data.success) {
      alert(data.message);
      encaminhar();
    } else {
      alert("Erro ao cadastrar!");
    }

  } catch (error) {
    console.error("Fetch error:", error);
    alert("Erro ao salvar, tente novamente!");
  }
}

// Denúncias
let denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];
function criarDenuncia() {
  let titulo = document.getElementById("tituloDenuncia")?.value.trim();
  let descricao = document.getElementById("denuncia")?.value.trim();
  let imagem = document.getElementById("preview")?.querySelector("img")?.src || "";
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
  window.location.href = "inicio.html";
}
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
document.addEventListener("DOMContentLoaded", mostrarDenuncias);

// redirecionamento genérico
function encaminhar() {
  window.location.href = "inicio.html";
}

// Sidebar
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("closeBtn");
  const openBtn = document.getElementById("openBtn");
  const mainSection = document.getElementById("mainSection") || null;

  if (sidebar && closeBtn && openBtn) {
    // Fecha a sidebar
    closeBtn.addEventListener("click", () => {
      sidebar.classList.add("closed");
      if (mainSection) {
        mainSection.classList.add("expanded");
      }
      setTimeout(() => {
        openBtn.classList.add("visible");
      }, 300);
    });

    // Abre a sidebar
    openBtn.addEventListener("click", () => {
      sidebar.classList.remove("closed");
      if (mainSection) {
        mainSection.classList.remove("expanded");
      }
      openBtn.classList.remove("visible");
    });
  }
});

    closeBtn.addEventListener('click', () => {
      sidebar.classList.add('closed');
      mainSection?.classList.add('expanded');
      setTimeout(() => openBtn.classList.add('visible'), 300);
    });
    openBtn.addEventListener('click', () => {
      sidebar.classList.remove('closed');
      mainSection?.classList.remove('expanded');
      openBtn.classList.remove('visible');
    });

// Câmera
const video = document.getElementById("video");
const btnAbrir = document.getElementById("btnAbrirCamera");
const btnFoto = document.getElementById("btnFoto");
const preview = document.getElementById("preview");
const canvas = document.createElement("canvas");
let stream = null;

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = "block";       // mostra o vídeo
    btnFoto.style.display = "inline-block"; // mostra botão de tirar foto
    btnAbrir.style.display = "none";     // esconde botão de abrir câmera
    preview.innerHTML = "";               // limpa preview anterior
  } catch (err) {
    alert("Erro ao acessar a câmera: " + err.message);
  }
}

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

btnFoto.addEventListener("click", () => {
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL("image/png");
  preview.innerHTML = `<div class="photo-frame"><img src="${dataUrl}" alt="Preview da foto"></div>`;

  stopCamera();
});
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const app = document.getElementById("app");

  if (splash && app) {
    splash.style.display = "none";
    app.style.display = "block";
  }
});
