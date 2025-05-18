/**
 * TENTFLAIR SOLUTIONS Preloader Script
 * Controls the preloader display and animations
 */

// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the preloader element
    const preloader = document.querySelector('.preloader');
    
    // If no preloader is found, exit gracefully
    if (!preloader) {
        console.log('Preloader element not found');
        return;
    }
    
    // Function to update loading text (creates typing effect)
    function updateLoadingText() {
        const loadingElement = document.querySelector('.preloader-text');
        if (!loadingElement) return;
        
        const originalText = loadingElement.textContent;
        let dots = 0;
        
        // Update dots every 500ms
        setInterval(() => {
            dots = (dots + 1) % 4;
            let newText = originalText.replace(/\.+$/, '') + '.'.repeat(dots);
            loadingElement.textContent = newText;
        }, 500);
    }
    
    // Function to hide preloader
    function hidePreloader() {
        if (preloader) {
            // Add the fadeOut class
            preloader.classList.add('fade-out');
            
            // After animation completes, hide the preloader completely
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 500); // Should match the transition duration in CSS
        }
    }
    
    // Start the loading text animation
    updateLoadingText();
    
    // If all content including images is already loaded
    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        // Hide preloader when window is fully loaded
        window.addEventListener('load', hidePreloader);
        
        // Fallback - hide preloader after maximum time
        // In case some resources are slow or fail to load
        setTimeout(hidePreloader, 5000);
    }
    
    // Add event listener to all images to track loading progress
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;
    
    // Update the loading bar progress based on image loading
    function updateProgress() {
        if (totalImages === 0) return;
        const progressPercent = (loadedImages / totalImages) * 100;
        const loadingBar = document.querySelector('.loading-bar:after');
        if (loadingBar) {
            loadingBar.style.width = progressPercent + '%';
        }
    }
    
    // Check if browser supports image loading events
    const supportsImageEvents = 'onload' in new Image();
    
    if (supportsImageEvents && totalImages > 0) {
        images.forEach(img => {
            // If image is already loaded
            if (img.complete) {
                loadedImages++;
                updateProgress();
            } else {
                // Add load event listener
                img.addEventListener('load', () => {
                    loadedImages++;
                    updateProgress();
                    
                    // If all images loaded, hide preloader
                    if (loadedImages === totalImages) {
                        setTimeout(hidePreloader, 500);
                    }
                });
                
                // Handle errors
                img.addEventListener('error', () => {
                    loadedImages++;
                    updateProgress();
                });
            }
        });
    }
});
