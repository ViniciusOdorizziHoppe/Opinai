function validar() {
  event.preventDefault()
  var senha = document.getElementById("senha").value.trim()
  var email = document.getElementById("email").value.trim()

  if (email === "" || senha === "") {
    alert("Preencha todos os campos!")
    return false
  } else {
    encaminhar()
    return true
  }
}
function capturarValores() {
  var denuncia = document.getElementById("denuncia").value.trim()
  var imagem = 0
  if (denuncia == "") {
    alert("Preencha o campo")
  } else {

  }
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
