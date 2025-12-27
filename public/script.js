// ==========================
// CADASTRO
// ==========================
async function salvarTodo(event) {
  event.preventDefault();

  const email = document.getElementById("email")?.value;
  const senha = document.getElementById("senha")?.value;

  try {
    const response = await fetch("/html/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (data.success) {
      alert(data.message || "Cadastro realizado!");
      encaminhar();
    } else {
      alert(data.message || "Erro ao cadastrar!");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Erro ao salvar, tente novamente!");
  }
}

function encaminhar() {
  window.location.href = "/html/inicio.html";
}

// ==========================
// DENÚNCIAS (localStorage)
// ==========================
let denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];

function criarDenuncia() {
  const titulo = document.getElementById("tituloDenuncia")?.value.trim();
  const descricao = document.getElementById("denuncia")?.value.trim();
  const imagem =
    document.getElementById("preview")?.querySelector("img")?.src || "";

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
    longitude: window.localSelecionado.lng,
    data: new Date().toLocaleString(),
  };

  denuncias.push(denuncia);
  localStorage.setItem("denuncias", JSON.stringify(denuncias));

  alert("Denúncia registrada!");
  window.location.href = "/html/inicio.html";
}

function mostrarDenuncias() {
  const container = document.getElementById("listaDenuncias");
  if (!container) return;

  container.innerHTML = "";

  if (denuncias.length === 0) {
    container.innerHTML = "<p>Nenhuma denúncia registrada.</p>";
    return;
  }

  denuncias.forEach((d) => {
    container.innerHTML += `
      <div class="denuncia">
        <h3>${d.titulo}</h3>
        ${d.imagem ? `<img src="${d.imagem}" alt="Imagem da denúncia">` : ""}
        <p>${d.descricao}</p>
        <small>${d.data || ""}</small>
      </div>
    `;
  });
}

// ==========================
// DOM READY
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  mostrarDenuncias();

  // ==========================
  // SIDEBAR
  // ==========================
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("closeBtn");
  const openBtn = document.getElementById("openBtn");
  const mainSection = document.getElementById("mainSection");

  if (sidebar && closeBtn && openBtn) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.add("closed");
      mainSection?.classList.add("expanded");
      setTimeout(() => openBtn.classList.add("visible"), 300);
    });

    openBtn.addEventListener("click", () => {
      sidebar.classList.remove("closed");
      mainSection?.classList.remove("expanded");
      openBtn.classList.remove("visible");
    });
  }

  // ==========================
  // CÂMERA COM TROCA
  // ==========================
  const video = document.getElementById("video");
  const btnAbrir = document.getElementById("btnAbrirCamera");
  const btnFoto = document.getElementById("btnFoto");
  const btnTrocar = document.getElementById("btnTrocarCamera");
  const preview = document.getElementById("preview");

  if (video && btnAbrir && btnFoto && preview) {
    const canvas = document.createElement("canvas");
    let stream = null;
    let usarFrontal = true;

    async function startCamera() {
      try {
        if (stream) {
          stream.getTracks().forEach((t) => t.stop());
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: usarFrontal ? "user" : "environment" },
          audio: false,
        });

        video.srcObject = stream;
        video.style.display = "block";
        btnFoto.style.display = "inline-block";
        btnAbrir.style.display = "none";
        if (btnTrocar) btnTrocar.style.display = "inline-block";
        preview.innerHTML = "";
      } catch (err) {
        alert("Erro ao acessar a câmera: " + err.message);
      }
    }

    function stopCamera() {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
        stream = null;
      }
      video.srcObject = null;
      video.style.display = "none";
      btnFoto.style.display = "none";
      if (btnTrocar) btnTrocar.style.display = "none";
      btnAbrir.style.display = "inline-block";
      btnAbrir.textContent = "Tirar novamente?";
    }

    btnAbrir.addEventListener("click", startCamera);

    btnFoto.addEventListener("click", () => {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      const dataUrl = canvas.toDataURL("image/png");
      preview.innerHTML = `
        <div class="photo-frame">
          <img src="${dataUrl}" alt="Preview da foto">
        </div>
      `;

      stopCamera();
    });

    if (btnTrocar) {
      btnTrocar.addEventListener("click", () => {
        usarFrontal = !usarFrontal;
        startCamera();
      });
    }
  }
});

// ==========================
// SPLASH SCREEN
// ==========================
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const app = document.getElementById("app");

  if (splash && app) {
    splash.style.display = "none";
    app.style.display = "block";
  }
});
