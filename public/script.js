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

let denuncias = []
let titulo = document.getElementById("tituloDenuncia").value.trim()
let descricao = document.getElementById("denuncia").value.trim()


// Função para criar e salvar uma denúncia
function criarDenuncia(titulo, descricao) {
  const denuncia = {
    titulo: titulo,
    descricao: descricao,
    mostrar: function() {
      return `
        <div class="denuncia">
          <h3>${this.titulo}</h3>
          <img src="${this.imagem}" alt="Imagem da denúncia" width="200">
          <p>${this.descricao}</p>
        </div>
      `;
    }
  };

  denuncias.push(denuncia);
  return denuncia;
}

// Função para exibir todas as denúncias em uma página
function mostrarDenuncias() {
  let container = document.getElementById("listaDenuncias");
  container.innerHTML = ""; // limpa antes de renderizar

  denuncias.forEach(d => {
    container.innerHTML += d.mostrar();
  });
}

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
