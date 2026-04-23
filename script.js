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
