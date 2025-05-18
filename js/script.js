/**
 * TENTFLAIR SOLUTIONS Website JavaScript
 * Provides interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('show');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('show');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburgerMenu.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('show')) {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('show');
            }
        });
    }

    // Testimonial Slider
    initTestimonialSlider('testimonial-slider', 'prev-testimonial', 'next-testimonial');
    initTestimonialSlider('testimonial-slider-mini', 'prev-testimonial-mini', 'next-testimonial-mini');

    // Product Gallery Thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const mainImage = this.closest('.product-gallery').querySelector('.main-image img');
            const thumbnailSrc = this.getAttribute('src');
            const mainSrc = mainImage.getAttribute('src');
            
            // Swap the images with a fade effect
            mainImage.style.opacity = 0;
            setTimeout(() => {
                mainImage.setAttribute('src', thumbnailSrc);
                mainImage.style.opacity = 1;
            }, 300);
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });

    // Form Validation for Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // For demonstration purposes, showing a success message
                // In a real application, you would send the form data to a server
                showFormMessage(contactForm, 'Your message has been sent successfully! We will contact you soon.', 'success');
                contactForm.reset();
            } else {
                showFormMessage(contactForm, 'Please fill in all required fields correctly.', 'error');
            }
        });
    }

    // Form Validation for Quote Form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        const productTypeSelect = document.getElementById('productType');
        const otherProductGroup = document.getElementById('otherProductGroup');
        
        if (productTypeSelect && otherProductGroup) {
            productTypeSelect.addEventListener('change', function() {
                if (this.value === 'other') {
                    otherProductGroup.style.display = 'block';
                    document.getElementById('otherProduct').setAttribute('required', '');
                } else {
                    otherProductGroup.style.display = 'none';
                    document.getElementById('otherProduct').removeAttribute('required');
                }
            });
        }
        
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = quoteForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = quoteForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // For demonstration purposes, showing a success message
                showFormMessage(quoteForm, 'Your quote request has been submitted successfully! We will get back to you within 1-2 business days.', 'success');
                quoteForm.reset();
                if (otherProductGroup) {
                    otherProductGroup.style.display = 'none';
                }
            } else {
                showFormMessage(quoteForm, 'Please fill in all required fields correctly.', 'error');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links based on current page
    const currentPath = window.location.pathname;
    const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if ((filename === '' || filename === 'index.html') && linkPath === 'index.html') {
            link.classList.add('active');
        } else if (linkPath === filename) {
            link.classList.add('active');
        }
    });
});

/**
 * Initialize a testimonial slider
 * @param {string} sliderId - The ID of the slider container
 * @param {string} prevBtnId - The ID of the previous button
 * @param {string} nextBtnId - The ID of the next button
 */
function initTestimonialSlider(sliderId, prevBtnId, nextBtnId) {
    const slider = document.getElementById(sliderId);
    const prevButton = document.getElementById(prevBtnId);
    const nextButton = document.getElementById(nextBtnId);
    
    if (!slider || !prevButton || !nextButton) return;
    
    const slides = slider.querySelectorAll('.testimonial-slide');
    if (slides.length < 2) return;
    
    let currentSlide = 0;
    
    // Set initial position
    updateSliderPosition();
    
    // Event listeners for navigation buttons
    prevButton.addEventListener('click', showPreviousSlide);
    nextButton.addEventListener('click', showNextSlide);
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(showNextSlide, 5000);
    
    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(showNextSlide, 5000);
    });
    
    function showNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSliderPosition();
    }
    
    function showPreviousSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSliderPosition();
    }
    
    function updateSliderPosition() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slides[currentSlide].style.display = 'block';
    }
}

/**
 * Show a message after form submission
 * @param {HTMLElement} form - The form element
 * @param {string} message - The message to display
 * @param {string} type - The message type ('success' or 'error')
 */
function showFormMessage(form, message, type) {
    // Remove any existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('form-message', type);
    messageElement.textContent = message;
    
    // Add message to form
    form.querySelector('.form-actions').insertAdjacentElement('beforebegin', messageElement);
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove message after 5 seconds if it's a success message
    if (type === 'success') {
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

/**
 * Shows a message below a form after submission
 * @param {HTMLElement} form - The form element
 * @param {string} message - The message to display
 * @param {string} type - The type of message ('success' or 'error')
 */
function showFormMessage(form, message, type) {
    // Remove any existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <p>${message}</p>
    `;
    
    // Insert after the form
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove message after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.remove();
            }, 500);
        }, 5000);
    }
}
