// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.add('active');
    document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
    navLinks.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll reveal animation
function scrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        } else {
            reveal.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollReveal);

// Initialize scroll reveal on page load
document.addEventListener('DOMContentLoaded', () => {
    scrollReveal();
    
    // Add animation classes to elements that should animate on load
    document.querySelectorAll('.feature, .destination-card, .team-member').forEach((el, index) => {
        el.classList.add('reveal', 'fade-bottom');
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Initialize counter animation when stats section is in view
const statsSection = document.querySelector('.stats-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    observer.observe(statsSection);
}

// Modal functionality
function setupModal(modalClass, closeClass, openClass, closeHandler) {
    const modal = document.querySelector(modalClass);
    const closeBtn = document.querySelector(closeClass);
    const openElements = document.querySelectorAll(openClass);
    
    if (!modal) return;
    
    openElements.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (closeHandler) closeHandler();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            if (closeHandler) closeHandler();
        }
    });
}

// Destination modal
setupModal('.destination-modal', '.close-modal', '[data-destination]', () => {
    document.querySelector('.modal-body').innerHTML = '';
});

// Booking confirmation modal
setupModal('.confirmation-modal', '.close-confirmation', '#bookingForm', () => {
    document.getElementById('bookingForm').reset();
});

// Contact modal
setupModal('.contact-modal', '.close-contact-modal', '#contactForm', () => {
    document.getElementById('contactForm').reset();
});

// Destination filter
const filterButtons = document.querySelectorAll('.filter-btn');
const destinationItems = document.querySelectorAll('.destination-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            destinationItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Destination modal content
document.querySelectorAll('[data-destination]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const destinationId = button.getAttribute('data-destination');
        const destinationItem = document.getElementById(destinationId);
        
        if (destinationItem) {
            const destinationCard = destinationItem.querySelector('.destination-card');
            const modalBody = document.querySelector('.modal-body');
            
            // Create modal content based on destination
            const modalContent = `
                <div class="modal-image">
                    ${destinationCard.querySelector('.card-image').innerHTML}
                </div>
                <div class="modal-info">
                    <h2>${destinationCard.querySelector('.card-content h3').textContent}</h2>
                    <div class="modal-price">${destinationCard.querySelector('.price').textContent}</div>
                    <div class="modal-duration">${destinationCard.querySelector('.card-overlay p').textContent}</div>
                    <div class="modal-description">
                        <p>${destinationCard.querySelector('.card-content p').textContent}</p>
                    </div>
                    <div class="modal-highlights">
                        <h3>Trip Highlights</h3>
                        <ul>
                            <li><i class="fas fa-check"></i> Accommodation in 4-star hotels</li>
                            <li><i class="fas fa-check"></i> Daily breakfast included</li>
                            <li><i class="fas fa-check"></i> Airport transfers</li>
                            <li><i class="fas fa-check"></i> Guided city tours</li>
                            <li><i class="fas fa-check"></i> 24/7 customer support</li>
                        </ul>
                    </div>
                    <div class="modal-actions">
                        <a href="booking.html" class="btn">Book Now</a>
                        <a href="destinations.html" class="btn-outline">View All Destinations</a>
                    </div>
                </div>
            `;
            
            modalBody.innerHTML = modalContent;
            document.querySelector('.destination-modal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Generate random reference number for booking
document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const referenceNumber = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('referenceNumber').textContent = referenceNumber;
    document.querySelector('.confirmation-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Newsletter form
document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    alert(`Thank you for subscribing with ${emailInput.value}!`);
    emailInput.value = '';
});

// Smooth scroll for anchor links
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