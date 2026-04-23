// Saudação personalizada
function saudacao() {
  let nome = document.getElementById("nome").value;
  let resposta = document.getElementById("resposta");

  if (nome === "") {
    resposta.innerText = "Por favor, digite seu nome.";
  } else {
    resposta.innerText = `Olá, ${nome}! Bem-vindo ao Agro Forte 🌱`;
  }
}

// Mostrar e esconder galeria
function toggleGaleria() {
  let galeria = document.getElementById("galeria");

  if (galeria.style.display === "none") {
    galeria.style.display = "flex";
  } else {
    galeria.style.display = "none";
  }
}

// Alternar modo escuro
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
