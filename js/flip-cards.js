// Animation effect for flip cards
document.addEventListener('DOMContentLoaded', function() {
    // Get all flip cards and set their animation delay index
    const flipCards = document.querySelectorAll('.flip-card');
    
    // Group cards into rows for better animation flow
    // This will make cards animate in a more natural way
    const cardsPerRow = window.innerWidth >= 768 ? 
        (window.innerWidth >= 1200 ? 4 : 3) : 
        (window.innerWidth >= 480 ? 2 : 1);
    
    flipCards.forEach((card, index) => {
        // Calculate row and position for staggered animations
        const row = Math.floor(index / cardsPerRow);
        const position = index % cardsPerRow;
        
        // Adjust animation delay based on position in grid
        // This creates a wave-like animation effect
        const delay = row * 0.1 + position * 0.1;
        card.style.setProperty('--card-index', delay * 10);
    });

    // Intersection Observer to trigger animations when cards come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before cards enter viewport
    });

    // Observe each flip card
    flipCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
    
    // Re-initialize on window resize to adjust animation based on new layout
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Refresh page if width changes significantly to reset animations
            if (window.innerWidth < 768 && window.innerWidth > 1200) {
                location.reload();
            }
        }, 250);
    });
});
