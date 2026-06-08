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

let tamanhoFonte = 16;

// Aumentar e diminuir fonte
function alterarFonte(valor) {
    tamanhoFonte += valor;
    if (tamanhoFonte < 12) tamanhoFonte = 12;
    if (tamanhoFonte > 32) tamanhoFonte = 32;
    document.body.style.fontSize = tamanhoFonte + "px";
}

// Modo escuro/claro
function alternarTema() {
    document.body.classList.toggle("dark-mode");
}

// Leitura por voz
function lerPagina() {
    pararLeitura();
   const texto =
document.querySelector("main")?.innerText ||
document.querySelector("#agro")?.innerText ||
"";
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    fala.rate = 1;
    fala.pitch = 1;
    speechSynthesis.speak(fala);
}

// Parar leitura
function pararLeitura() {
    speechSynthesis.cancel();
}

// Ajuste dinâmico para tela cheia
window.addEventListener("resize", () => {
    window.addEventListener("resize", () => {
    document.getElementById("container").style.height =
    window.innerHeight + "px";
});

// Inicializa altura completa
document.getElementById("container").style.height = window.innerHeight + "px";

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
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if(loader){
      loader.style.opacity = "0";

      setTimeout(() => {
          loader.remove();
      }, 300);
  }
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
