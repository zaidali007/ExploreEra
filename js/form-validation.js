// Form Validation
document.addEventListener('DOMContentLoaded', () => {
    // Booking form validation
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', validateBookingForm);
        
        // Add real-time validation
        const inputs = bookingForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
        });
    }
    
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
        });
    }
    
    // Generic field validation
    function validateField(field) {
        const errorElement = field.nextElementSibling?.classList.contains('error-message') 
            ? field.nextElementSibling 
            : field.parentElement.querySelector('.error-message');
        
        if (!errorElement) return;
        
        errorElement.textContent = '';
        field.style.borderColor = '';
        
        if (field.required && !field.value.trim()) {
            errorElement.textContent = 'This field is required';
            field.style.borderColor = '#e63946';
            return false;
        }
        
        if (field.type === 'email' && !isValidEmail(field.value)) {
            errorElement.textContent = 'Please enter a valid email address';
            field.style.borderColor = '#e63946';
            return false;
        }
        
        if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
            errorElement.textContent = 'Please enter a valid phone number';
            field.style.borderColor = '#e63946';
            return false;
        }
        
        return true;
    }
    
    // Email validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Phone validation (simple version)
    function isValidPhone(phone) {
        const re = /^[0-9]{10,15}$/;
        return re.test(phone);
    }
    
    // Booking form validation
    function validateBookingForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const inputs = form.querySelectorAll('input, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Generate random reference number
            const referenceNumber = Math.floor(1000 + Math.random() * 9000);
            document.getElementById('referenceNumber').textContent = referenceNumber;
            
            // Show confirmation modal
            document.querySelector('.confirmation-modal').classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset form
            form.reset();
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.error-message:not(:empty)');
            if (firstError) {
                const input = firstError.previousElementSibling || 
                              firstError.parentElement.querySelector('input, select, textarea');
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                input.focus();
            }
        }
    }
    
    // Contact form validation
    function validateContactForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show success modal
            document.querySelector('.contact-modal').classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset form
            form.reset();
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.error-message:not(:empty)');
            if (firstError) {
                const input = firstError.previousElementSibling || 
                              firstError.parentElement.querySelector('input, textarea');
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                input.focus();
            }
        }
    }
});