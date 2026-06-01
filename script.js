// Saudação personalizada
function saudacao() {
  let nome = document.getElementById("nome").value;
  let resposta = document.getElementById("resposta");

  if (nome.trim() === "") {
    resposta.innerText = "Por favor, digite seu nome.";
  } else {
    resposta.innerText = `Olá, ${nome}! Seja bem-vindo(a) 🌱`;
  }
}

// Mostrar ou esconder galeria
function toggleGaleria() {
  let galeria = document.getElementById("galeriaImagens");

  if (galeria.style.display === "none") {
    galeria.style.display = "flex";
  } else {
    galeria.style.display = "none";
  }
}

// Modo escuro
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.innerText = "☀";
  } else {
    themeToggle.innerText = "🌙";
  }
});
/* LOADER */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 1500);
});

/* BOTÃO TOPO */
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

  if(window.scrollY > 300){
    topBtn.style.display = "block";
  }else{
    topBtn.style.display = "none";
  }

});

topBtn.addEventListener("click", () => {

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

});
