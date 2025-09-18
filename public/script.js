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

  const denuncia = { titulo, descricao, imagem };

  denuncias.push(denuncia);
  localStorage.setItem("denuncias", JSON.stringify(denuncias));

  alert("Denúncia registrada!");
  encaminhar2()
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
    <h2>${d.titulo}</h2>
    <p>${d.descricao}</p>
    <img src="${d.imagem}" alt="Imagem da denúncia">
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
