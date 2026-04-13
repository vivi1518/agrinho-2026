// Contador animado para estatísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
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
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Modo escuro
function initDarkMode() {
    const darkModeBtn = document.getElementById('darkModeBtn');
    const body = document.body;
    
    // Verifica preferência salva ou do sistema
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
    
    slider.addEventListener('input', (e) => {
        const size = e.target.value + 'px';
        valueSpan.textContent = size;
        
        // Aplica a todos os parágrafos da seção impacto
        const impactoTexts = document.querySelectorAll('.impacto-text p');
        impactoTexts.forEach(p => {
            p.style.fontSize = size;
        });
    });
}

// Smooth scroll para navegação
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efeito de tilt nos cards (simplificado e funcional)
function initTiltEffect() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Gráfico simples no canvas
function initImpactChart() {
    const canvas = document.getElementById('impactChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;
    
    // Dados do gráfico (pizza)
    const data = [95, 85, 92]; // Produtividade, Sustentabilidade, Eficiência
    const colors = ['#4a9a4a', '#2d5a2d', '#d4a017'];
    const total = data.reduce((a, b) => a + b, 0);
    
    let startAngle = 0;
    
    data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 140, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        startAngle += sliceAngle;
    });
    
    // Centro do gráfico
    ctx.beginPath();
    ctx.arc(150, 150, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
}

// Navbar scroll effect
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255,255,255,0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255,255,255,0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });
}

// Inicialização principal
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    initDarkMode();
    initFontControl();
    initSmoothScroll();
    initTiltEffect();
    initImpactChart();
    initNavbarScroll();
    
    console.log('🌱 AgroForte carregado com sucesso! 🚜');
});
/* Adicione esta variável no :root existente */
:root {
    --primary-green: #2d5a2d;
    --secondary-green: #4a9a4a;
    --accent-gold: #d4a017;
    --text-dark: #1a3c1a;
    --text-light: #f8f9fa;
    --bg-light: #f8fff8;
    --bg-dark: #1a2d1a;
    --shadow: 0 10px 30px rgba(0,0,0,0.1);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --font-size: 16px; /* Nova variável */
}

/* Canvas do gráfico */
#impactChart {
    max-width: 100%;
    height: auto;
    border-radius: 50%;
    box-shadow: var(--shadow);
    display: block;
    margin: 0 auto;
}
