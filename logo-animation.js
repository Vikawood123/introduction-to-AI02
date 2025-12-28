// logo-animation.js - ТОЛЬКО анимация логотипа в шапке

const LOGO_CONFIG = {
    autoPlay: true,
    autoPlayDelay: 1000,
    animationSpeed: 1.0
};

let isLogoAnimating = false;
let logoElements = {};

function initLogo() {
    console.log('🎨 Инициализация анимированного логотипа');
    
    // Находим элементы логотипа
    logoElements = {
        cityText: document.getElementById('cityText'),
        subtitleText: document.getElementById('subtitleText'),
        techText: document.getElementById('techText'),
        yearText: document.getElementById('yearText'),
        logoContainer: document.getElementById('logoContainer')
    };
    
    // Проверяем наличие элементов
    Object.keys(logoElements).forEach(key => {
        if (!logoElements[key]) {
            console.warn(`⚠️ Элемент логотипа не найден: ${key}`);
        }
    });
    
    // Автозапуск анимации
    if (LOGO_CONFIG.autoPlay && logoElements.cityText) {
        setTimeout(() => {
            playLogoAnimation();
        }, LOGO_CONFIG.autoPlayDelay);
    }
}

function playLogoAnimation() {
    if (isLogoAnimating || !logoElements.cityText) return;
    
    isLogoAnimating = true;
    console.log('🎬 Запуск анимации логотипа');
    
    // Сброс стилей
    resetLogoStyles();
    
    // Последовательность анимаций
    setTimeout(animateCityName, 300);
    setTimeout(animateSubtitle, 800);
    setTimeout(animateSymbol, 1300);
    setTimeout(animateTechLine, 2000);
    setTimeout(animateYear, 2500);
    setTimeout(completeLogoAnimation, 3500);
}

function animateCityName() {
    if (logoElements.cityText) {
        logoElements.cityText.style.animation = 'fadeInUp 0.8s ease-out forwards';
        logoElements.cityText.style.opacity = '1';
    }
}

function animateSubtitle() {
    if (logoElements.subtitleText) {
        logoElements.subtitleText.style.animation = 'fadeInUp 0.8s ease-out forwards';
        logoElements.subtitleText.style.opacity = '1';
    }
}

function animateSymbol() {
    const circle = document.querySelector('.symbol-circle');
    const gear = document.querySelector('.gear:not(.small)');
    const smallGear = document.querySelector('.gear.small');
    const star = document.querySelector('.symbol-star');
    
    if (circle) circle.style.animation = 'scaleIn 0.6s ease-out forwards, glowPulse 2s ease-in-out infinite 0.6s';
    if (gear) gear.style.animation = 'fadeIn 0.4s ease-out forwards, rotateGear 3s linear infinite 0.4s';
    if (smallGear) smallGear.style.animation = 'fadeIn 0.4s ease-out forwards, rotateGear 2s linear infinite reverse 0.5s';
    if (star) star.style.animation = 'fadeIn 0.4s ease-out forwards, starPulse 1.2s ease-in-out infinite 0.6s';
}

function animateTechLine() {
    if (logoElements.techText) {
        logoElements.techText.style.animation = 'fadeIn 0.8s ease-out forwards';
        logoElements.techText.style.opacity = '1';
    }
}

function animateYear() {
    if (logoElements.yearText) {
        logoElements.yearText.style.animation = 'fadeIn 0.6s ease-out forwards';
        logoElements.yearText.style.opacity = '1';
    }
}

function completeLogoAnimation() {
    isLogoAnimating = false;
    console.log('✅ Анимация логотипа завершена');
}

function resetLogoStyles() {
    // Сброс всех элементов логотипа
    const allElements = [
        logoElements.cityText,
        logoElements.subtitleText,
        logoElements.techText,
        logoElements.yearText,
        ...document.querySelectorAll('.symbol-circle'),
        ...document.querySelectorAll('.gear'),
        ...document.querySelectorAll('.symbol-star')
    ];
    
    allElements.forEach(el => {
        if (el) {
            el.style.animation = 'none';
            el.style.opacity = '0';
        }
    });
}

// Глобальные функции для ручного управления
window.logoAnimation = {
    play: playLogoAnimation,
    reset: resetLogoStyles,
    init: initLogo
};

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', initLogo);