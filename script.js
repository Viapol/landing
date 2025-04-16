// Mobile Menu Toggle
const burgerButton = document.querySelector('.burger-button');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.burger-button')) {
        burgerButton.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burgerButton.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Функция для создания элемента с сообщением об ошибке
function createErrorElement() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    return errorDiv;
}

// Функция для валидации email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция для валидации телефона
function isValidPhone(phone) {
    const phoneRegex = /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return phoneRegex.test(phone);
}

// Функция для валидации имени
function isValidName(name) {
    return name.length >= 2 && /^[а-яА-ЯёЁa-zA-Z\s\-]+$/.test(name);
}

// Функция для валидации сообщения
function isValidMessage(message) {
    return message.length >= 10;
}

// Добавляем обработчики событий для каждого поля
formInputs.forEach(input => {
    const errorElement = createErrorElement();
    input.parentNode.insertBefore(errorElement, input.nextSibling);

    // Валидация при вводе
    input.addEventListener('input', () => {
        validateField(input);
    });

    // Валидация при потере фокуса
    input.addEventListener('blur', () => {
        validateField(input);
    });
});

// Функция валидации отдельного поля
function validateField(input) {
    const errorElement = input.nextElementSibling;
    let errorMessage = '';
    let isValid = true;

    switch(input.type) {
        case 'text':
            if (!isValidName(input.value)) {
                errorMessage = 'Введите корректное имя (минимум 2 символа, только буквы)';
                isValid = false;
            }
            break;
        case 'email':
            if (!isValidEmail(input.value)) {
                errorMessage = 'Введите корректный email адрес';
                isValid = false;
            }
            break;
        case 'tel':
            if (input.value && !isValidPhone(input.value)) {
                errorMessage = 'Введите корректный номер телефона';
                isValid = false;
            }
            break;
        case 'textarea':
            if (!isValidMessage(input.value)) {
                errorMessage = 'Сообщение должно содержать минимум 10 символов';
                isValid = false;
            }
            break;
    }

    // Обновляем стили и сообщение об ошибке
    if (errorMessage) {
        input.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    } else {
        input.classList.remove('error');
        errorElement.style.display = 'none';
    }

    return isValid;
}

// Обработка отправки формы
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Проверяем все поля
    let isFormValid = true;
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        return;
    }
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    try {
        // Simulate form submission (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        contactForm.reset();
        // Очищаем все сообщения об ошибках
        formInputs.forEach(input => {
            input.classList.remove('error');
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.style.display = 'none';
            }
        });
    } catch (error) {
        // Show error message
        alert('Извините, произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .fleet-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
}); 