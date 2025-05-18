/**
 * Image Fallback Handler
 * This script replaces missing images with a styled fallback element
 * and adds loading placeholders
 */

document.addEventListener('DOMContentLoaded', function() {
    // Handle broken/missing images
    const images = document.querySelectorAll('img');
    
    // Add fade-in animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    images.forEach(img => {
        // Skip preloader logo to avoid flickering
        if (img.closest('.preloader-logo')) return;
        
        // Add loading placeholder before image loads
        if (!img.complete && !img.closest('.preloader')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'image-loading-placeholder';
            placeholder.style.height = img.height ? img.height + 'px' : '200px';
            
            // Insert placeholder before the image
            if (img.parentElement) {
                img.style.display = 'none'; // Hide the image until loaded
                img.parentElement.insertBefore(placeholder, img);
                
                // Remove placeholder when image loads
                img.addEventListener('load', function() {
                    if (placeholder.parentElement) {
                        placeholder.parentElement.removeChild(placeholder);
                    }
                    img.style.display = ''; // Restore image display
                    
                    // Add fade-in effect
                    img.style.animation = 'fadeIn 0.5s';
                });
            }
        }
        
        // Add error handler to each image
        img.addEventListener('error', function() {
            // Get information about the image
            const alt = this.getAttribute('alt') || 'Image';
            const parentElement = this.parentElement;
            
            // Remove any placeholder that might exist
            const previousPlaceholder = this.previousSibling;
            if (previousPlaceholder && previousPlaceholder.className === 'image-loading-placeholder') {
                if (parentElement) {
                    parentElement.removeChild(previousPlaceholder);
                }
            }
            
            // Create replacement element
            const fallbackElement = document.createElement('div');
            fallbackElement.className = 'missing-image';
            
            // Add content to the fallback element
            fallbackElement.innerHTML = `
                <i class="fas fa-image"></i>
                <h3>${alt}</h3>
                <p>Image currently unavailable</p>
            `;
            
            // Replace the image with our fallback
            if (parentElement) {
                parentElement.replaceChild(fallbackElement, this);
            }
            
            // Log error for debugging
            console.warn(`Image failed to load: ${this.src}`);
        });
    });
});
