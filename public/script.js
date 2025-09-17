function validar() {
    event.preventDefault()
    var senha = document.getElementById("senha").value.trim()
    var email = document.getElementById("email").value.trim()

    if (email === "" || senha === "") {
    alert("Preencha todos os campos!")
    return false
  } else  {
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
function encaminhar() {
  window.location.href = "inicio.html"
}

document.addEventListener("DOMContentLoaded", () => {

  // Sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('closeBtn');
  const openBtn = document.getElementById('openBtn');

  if(sidebar && closeBtn && openBtn){
    closeBtn.addEventListener('click', () => {
      sidebar.classList.add('closed');
      setTimeout(() => openBtn.classList.add('visible'), 300);
    });
    openBtn.addEventListener('click', () => {
      sidebar.classList.remove('closed');
      openBtn.classList.remove('visible');
    });
  }

  // Accordion
  const accordions = document.querySelectorAll('.accordion-btn');
  accordions.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      if(content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        accordions.forEach(otherBtn => {
          if(otherBtn !== btn){
            otherBtn.nextElementSibling.style.maxHeight = null;
          }
        });
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

});
