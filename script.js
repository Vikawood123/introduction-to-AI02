// script.js - Оригинальный скрипт сайта "ИИ в Люберецком техникуме"
// НЕ содержит код анимации логотипа (это в logo-animation.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Загрузка основного скрипта сайта');
    
    // ===== МОБИЛЬНОЕ МЕНЮ =====
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            const isVisible = navMenu.style.display === 'flex';
            navMenu.style.display = isVisible ? 'none' : 'flex';
            
            if (!isVisible) {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'linear-gradient(135deg, #4a0072, #7b1fa2)';
                navMenu.style.padding = '20px';
                navMenu.style.borderRadius = '0 0 10px 10px';
                navMenu.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                navMenu.style.gap = '10px';
                navMenu.style.zIndex = '1000';
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
                
                // Обновление активной ссылки
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Адаптация при изменении размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'row';
                navMenu.style.position = 'static';
                navMenu.style.background = 'transparent';
                navMenu.style.padding = '0';
                navMenu.style.boxShadow = 'none';
                navMenu.style.borderRadius = '0';
            } else {
                navMenu.style.display = 'none';
            }
        });
    }
    
    // ===== АНИМАЦИЯ ОРИГИНАЛЬНОГО ЛОГОТИПА SVG =====
    const logoBorder = document.querySelector('.logo-border');
    if (logoBorder) {
        setTimeout(() => {
            logoBorder.style.strokeDashoffset = '0';
        }, 500);
    }
    
    // ===== АНИМАЦИЯ СЧЕТЧИКОВ В БЛОКЕ "ПРОЕКТ" =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const projectSection = document.querySelector('.digital-production');
        if (projectSection) {
            statsObserver.observe(projectSection);
        }
    }
    
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            if (isNaN(finalValue)) return;
            
            const duration = 2000;
            const increment = finalValue / (duration / 16);
            let currentValue = 0;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue);
                }
            }, 16);
        });
    }
    
    // ===== АНИМАЦИЯ КАРТОЧЕК ПРИ ПОЯВЛЕНИИ =====
    const cards = document.querySelectorAll('.course-card, .tech-card, .module-card');
    
    if (cards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });
    }
    
    // ===== ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ ПРИ ПРОКРУТКЕ =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length > 0 && navLinks.length > 0) {
        function highlightNavOnScroll() {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', highlightNavOnScroll);
    }
    
    // ===== ДОПОЛНИТЕЛЬНЫЕ ЭФФЕКТЫ =====
    
    // Эффект при наведении на кнопки
    const buttons = document.querySelectorAll('.banner-btn, .course-link, .doc-link, .unity-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Динамическое обновление года в футере
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    console.log('✅ Сайт "ИИ в Люберецком техникуме" полностью загружен и готов!');
});