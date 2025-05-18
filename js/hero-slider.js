/**
 * Hero Slider Functionality
 * Controls the hero image slider on the homepage
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get slider elements
    const sliderContainer = document.querySelector('.hero-slider');
    if (!sliderContainer) return;
    
    const slides = sliderContainer.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('prev-hero-slide');
    const nextBtn = document.getElementById('next-hero-slide');
    const indicatorsContainer = document.querySelector('.hero-indicators');
    
    let currentSlideIndex = 0;
    let autoSlideInterval;
    const autoSlideDelay = 6000; // 6 seconds per slide
    let isTransitioning = false; // Flag to prevent rapid clicking
    
    // Create indicator dots
    if (indicatorsContainer) {
        slides.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.classList.add('hero-indicator');
            if (index === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => {
                if (!isTransitioning) {
                    goToSlide(index);
                    resetAutoSlideTimer();
                }
            });
            
            indicatorsContainer.appendChild(indicator);
        });
    }
      // Initialize slider
    function initSlider() {
        if (slides.length <= 1) return;
        
        // Show first slide
        slides[0].classList.add('active');
        
        // Set up navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (!isTransitioning) {
                    prevSlide();
                    resetAutoSlideTimer();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (!isTransitioning) {
                    nextSlide();
                    resetAutoSlideTimer();
                }
            });
        }
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!isTransitioning) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                    resetAutoSlideTimer();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    resetAutoSlideTimer();
                }
            }
        });
        
        // Start auto-sliding
        startAutoSlide();
    }
      // Navigate to specific slide
    function goToSlide(index) {
        if (currentSlideIndex === index) return;
        
        // Set transitioning flag
        isTransitioning = true;
        
        // Hide current slide
        slides[currentSlideIndex].classList.remove('active');
        
        // Update indicators
        const indicators = indicatorsContainer?.querySelectorAll('.hero-indicator');
        if (indicators) {
            indicators[currentSlideIndex].classList.remove('active');
            indicators[index].classList.add('active');
        }
        
        // Show new slide
        currentSlideIndex = index;
        slides[currentSlideIndex].classList.add('active');
        
        // Reset transitioning flag after transition completes
        setTimeout(() => {
            isTransitioning = false;
        }, 1200); // Match this to the CSS transition duration
    }
    
    // Navigate to previous slide
    function prevSlide() {
        let newIndex = currentSlideIndex - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1;
        }
        goToSlide(newIndex);
    }
    
    // Navigate to next slide
    function nextSlide() {
        let newIndex = currentSlideIndex + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        goToSlide(newIndex);
    }
      // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!isTransitioning) {
                nextSlide();
            }
        }, autoSlideDelay);
    }
    
    function resetAutoSlideTimer() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
      // Initialize the slider
    initSlider();
    
    // Add touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlideInterval);
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, { passive: true });
    
    function handleSwipe() {
        if (!isTransitioning) {
            const swipeThreshold = 50; // Minimum distance for a swipe
            const swipeDistance = touchEndX - touchStartX;
            
            if (swipeDistance > swipeThreshold) {
                // Swiped right, go to previous slide
                prevSlide();
            } else if (swipeDistance < -swipeThreshold) {
                // Swiped left, go to next slide
                nextSlide();
            }
        }
    }
    
    // Pause auto-slide when user hovers over the slider or content
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    document.querySelector('.hero-content')?.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    // Resume auto-slide when user leaves the slider or content
    sliderContainer.addEventListener('mouseleave', () => {
        if (!document.querySelector('.hero-content:hover')) {
            startAutoSlide();
        }
    });
    
    document.querySelector('.hero-content')?.addEventListener('mouseleave', () => {
        if (!sliderContainer.matches(':hover')) {
            startAutoSlide();
        }
    });
});
