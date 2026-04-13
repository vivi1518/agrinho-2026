// Contador animado para estatísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + '%';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '%';
            }
        };
        
        updateCounter();
    });
}

// Modo escuro
function initDarkMode() {
    const darkModeBtn = document.getElementById('darkModeBtn');
    const body = document.body;
    
    // Verifica preferência do sistema
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.setAttribute('data-theme', 'dark');
        darkModeBtn.textContent = '☀️';
    }
    
    darkModeBtn.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        darkModeBtn.textContent = isDark ? '🌙' : '☀️';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
}

// Controle de fonte
function initFontControl() {
    const slider = document.getElementById('fontSize');
    const valueSpan = document.getElementById('fontValue');
    const impactoText = document.querySelector('.impacto-text p');
    
    slider.addEventListener('input', (e) => {
        const size = e.target.value;
        valueSpan.textContent = size + 'px';
        document.documentElement.style.setProperty('--font-size', size + 'px');
        impactoText.style.fontSize = size + 'px';
    });
}

// Smooth scroll para navegação
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efeito de tilt nos cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.card[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - center
