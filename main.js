// Função para alternar entre modo escuro e claro
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Armazenar o estado do modo escuro
let isDarkMode = false;

// Função para alternar o modo escuro
darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = "Modo Claro";
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.textContent = "Modo Escuro";
    }
});

// Função para personalizar a saudação com o nome do usuário
function personalizeGreeting() {
    const userName = prompt("Qual é o seu nome?");
    const greetingElement = document.getElementById('personalized-greeting');
    if (userName) {
        greetingElement.textContent = `Olá, ${userName}! Bem-vindo ao Agro Forte, Futuro Sustentável.`;
    }
}

// Chama a função para personalizar a saudação
personalizeGreeting();
