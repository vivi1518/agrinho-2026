// Alternar entre modo escuro e claro
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Armazenar o estado do modo escuro
let isDarkMode = false;

// Alterna o modo escuro
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

// Personalizar saudação
const personalizeGreetingBtn = document.getElementById('personalizeGreetingBtn');

// Função para personalizar a saudação com o nome do usuário
personalizeGreetingBtn.addEventListener('click', () => {
    const userName = prompt("Qual é o seu nome?");
    if (userName) {
        alert(`Olá, ${userName}! Bem-vindo ao Agro Forte, Futuro Sustentável.`);
    }
});
