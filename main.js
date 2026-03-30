// ==========================================================================
// INICIALIZAÇÃO & CONFIGURAÇÕES GLOBAIS
// ==========================================================================
class AgroForteApp {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        // Inicializar após DOM carregado
        document.addEventListener('DOMContentLoaded', () => {
            this.preloader();
            this.smoothScroll();
            this.navbarScroll();
            this.animateCounters();
            this.particleSystem();
            this.tabsSystem();
            this.testimonialsSlider();
            this.aosInit();
            this.formValidation();
            this.scrollProgress();
            this.typedEffect();
            this.chartImpact();
            this.videoPlay();
            this.mobileMenu();
            this.statsHover();
            this.sectionReveal();
        });

        // Window events
        window.addEventListener('scroll', this.debounce(this.handleScroll, 10));
        window.addEventListener('resize', this.debounce(this.handleResize, 250));
        window.addEventListener('load', this.afterLoad);
    }

    // ==========================================================================
    // PRELOADER PREMIUM
    // ==========================================================================
    preloader() {
        const preloader = document.querySelector('.preloader');
        const progress = document.querySelector('.loader-progress') || document.querySelector('.progress-fill');
        
        if (!preloader) return;

        let progressValue = 0;
        const progressInterval = setInterval(() => {
            progressValue += Math.random() * 15;
            if (progressValue >= 100) {
                progressValue = 100;
                clearInterval(progressInterval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    document.body.classList.add('loaded');
                }, 500);
            }
            if (progress) progress.style.width = `${progressValue}%`;
        }, 50);
    }

    // ==========================================================================
    // SMOOTH SCROLL & NAVIGATION
    // ==========================================================================
    smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    this.closeMobileMenu();
                }
            });
        });
    }

    navbarScroll() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;

        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Navbar shrink on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', this.debounce(updateHeader, 10));
    }

    // ==========================================================================
    // ANIMAÇÕES DE CONTADORES
    // ==========================================================================
    animateCounters() {
        const counters = document.querySelectorAll('[data-target]');
        
        const animateCounter = (el) => {
            const target = parseFloat(el.getAttribute('data-target'));
            const unit = el.nextElementSibling?.textContent || '';
            const increment = target / 200;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    el.textContent = current < 10 ? current.toFixed(0) : Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = target.toLocaleString();
                }
            };
            updateCounter();
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const countersInView = entry.target.querySelectorAll('[data-target]');
                    countersInView.forEach(animateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-card, .highlight, .impacto-numbers').forEach(el => {
            observer.observe(el);
        });
    }

    // ==========================================================================
    // SISTEMA DE PARTÍCULAS
    // ==========================================================================
    particleSystem() {
        const canvas = document.getElementById('hero-particles');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#A8E6CF';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        };

        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // ==========================================================================
    // SISTEMA DE TABS PREMIUM
    // ==========================================================================
    tabsSystem() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');

                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update active tab panel
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === targetTab) {
                        panel.classList.add('active');
                    }
                });
            });
        });
    }

    // ==========================================================================
    // SLIDER DE DEPOIMENTOS
    // ==========================================================================
    testimonialsSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        let currentSlide = 0;

        const nextSlide = () => {
            testimonials[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % testimonials.length;
            testimonials[currentSlide].classList.add('active');
        };

        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // ==========================================================================
    // AOS - Animate On Scroll
    // ==========================================================================
    aosInit() {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // ==========================================================================
    // FORMULÁRIO VALIDATION & SUBMISSION
    // ==========================================================================
    formValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    // Success message
                    form.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>Mensagem enviada com sucesso!</h3>
                            <p>Entraremos em contato em até 2 horas.</p>
                            <a href="#home" class="btn btn-primary">Voltar ao topo</a>
                        </div>
                    `;
                }, 2000);
            }
        });

        // Remove error on input
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
    }

    // ==========================================================================
    // PROGRESS BAR SCROLL
    // ==========================================================================
    scrollProgress() {
        const progressFill = document.querySelector('.progress-fill');
        
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressFill.style.width = `${scrollPercent}%`;
        };

        window.addEventListener('scroll', this.debounce(updateProgress, 10));
    }

    // ==========================================================================
    // EFEITO TYPED (Hero subtitle)
    // ==========================================================================
    typedEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;

        const phrases = [
            "Produção 3x maior com 100% preservação ambiental",
            "Tecnologia + Natureza = Prosperidade Eterna",
            "Líder nacional em Agro Regenerativo 2024",
            "ROI garantido em 18 meses"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                subtitle.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                subtitle.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    // ==========================================================================
    // GRÁFICO DE IMPACTO (Chart.js)
    // ==========================================================================
    chartImpact() {
        const ctx = document.getElementById('impactChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Produção ↑', 'CO₂ ↓', 'Água 💧', 'Solo 🌱'],
                datasets: [{
                    data: [42, 89, 73, 47],
                    backgroundColor: [
                        '#4CAF50',
                        '#FF9800',
                        '#2196F3',
                        '#9C27B0'
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 30,
                            usePointStyle: true,
                            font: {
                                size: 14,
                                weight: '600'
                            }
                        }
                    }
                },
                cutout: '65%',
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }

    // ==========================================================================
    // VIDEO PLAY ON HOVER
    // ==========================================================================
    videoPlay() {
        document.querySelectorAll('.video-placeholder').forEach(placeholder => {
            placeholder.addEventListener('mouseenter', () => {
                placeholder.style.transform = 'scale(1.05)';
            });
            
            placeholder.addEventListener('mouseleave', () => {
                placeholder.style.transform = 'scale(1)';
            });
            
            placeholder.addEventListener('click', (e) => {
                e.preventDefault();
                // Simulate video modal
                alert('🎥 Vídeo modal seria aberto aqui!');
            });
        });
    }

    // ==========================================================================
    // MOBILE MENU
    // ==========================================================================
    mobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    closeMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        toggle.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // ==========================================================================
    // STATS HOVER EFFECT
    // ==========================================================================
    statsHover() {
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ==========================================================================
    // SECTION REVEAL ON SCROLL
    // ==========================================================================
    sectionReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    // ==========================================================================
    // UTILITÁRIOS
    // ==========================================================================
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    handleScroll = () => {
        // Active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    handleResize = () => {
        this.isMobile = window.innerWidth <= 768;
        // Recalcular canvas sizes, etc.
    }

    afterLoad = () => {
        document.body.classList.add('page-loaded');
        // Additional post-load animations
    }
}

// ==========================================================================
// INICIALIZAR APLICAÇÃO
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se AOS está disponível
    if (typeof AOS !== 'undefined') {
        new AgroForteApp();
    } else {
        console.warn('AOS não encontrado. Carregando versão básica...');
        // Fallback sem AOS
        new AgroForteApp();
    }
});

// ==========================================================================
// WEBP SUPPORT & RESPONSIVE IMAGES
// ==========================================================================
if (window.HTMLPictureElement && window.HTMLImageElement.prototype.hasOwnProperty('decode')) {
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
    });
}

// ==========================================================================
// SERVICE WORKER (PWA)
// ==========================================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registrado'))
            .catch(err => console.log('SW falhou'));
    });
}

// ==========================================================================
// PARALLAX EFFECT SIMPLES
// ==========================================================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.hero-bg-layer');
    parallax.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed') || 0.5);
        layer.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==========================================================================
// CURSOR FOLLOWER (Desktop only)
// ==========================================================================
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const cursor = document.querySelector('.cursor-follower');
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    }
});
