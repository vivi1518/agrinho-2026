// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menu Mobile (Hamburguer)
    // Se você adicionar um botão com a classe 'mobile-menu' no HTML
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.navbar');

    // 2. Scroll Suave para os links internos
    const menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calcula a posição descontando a altura do header fixo
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth' // Rola de forma suave
                });
            }
        });
    });

    // 3. Mudança visual do Header ao rolar a página
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.backgroundColor = '#ffffff';
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // 4. Animação simples de entrada (Cards aparecendo)
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
