// Testimonial Slider
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.dot');
    
    if (!sliderContainer) return;
    
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;
    
    // Initialize slider
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Next testimonial
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        showTestimonial(currentIndex);
    }
    
    // Previous testimonial
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(currentIndex);
    }
    
    // Auto slide
    let slideInterval = setInterval(nextTestimonial, 5000);
    
    // Reset interval when manually changing slide
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextTestimonial, 5000);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextTestimonial();
        resetInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        prevTestimonial();
        resetInterval();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
            resetInterval();
        });
    });
    
    // Initialize first testimonial
    showTestimonial(currentIndex);
    
    // Pause on hover
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        resetInterval();
    });
    
    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextTestimonial();
        }
        if (touchEndX > touchStartX + 50) {
            prevTestimonial();
        }
        resetInterval();
    }
});