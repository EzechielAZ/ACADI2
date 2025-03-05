import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Sticky header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
    
    // Hero slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.hero-slider .dot');
    const totalSlides = slides.length;
    
    function goToSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Next slide button
    document.querySelector('.hero-slider .next').addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    });
    
    // Previous slide button
    document.querySelector('.hero-slider .prev').addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }, 5000);
    
    // Projects filter functionality
    const filterButtons = document.querySelectorAll('.projects-filter .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Testimonial carousel
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-controls .dot');
    const totalTestimonials = testimonials.length;
    
    function goToTestimonial(index) {
        // Remove active class from all testimonials and dots
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current testimonial and dot
        testimonials[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Next testimonial button
    document.querySelector('.testimonial-controls .next').addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        goToTestimonial(currentTestimonial);
    });
    
    // Previous testimonial button
    document.querySelector('.testimonial-controls .prev').addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        goToTestimonial(currentTestimonial);
    });
    
    // Testimonial dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToTestimonial(index);
        });
    });
    
    // Donation amount selection
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountContainer = document.querySelector('.custom-amount-container');
    const customAmountInput = document.querySelector('#custom-amount');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide custom amount input
            if (this.getAttribute('data-amount') === 'custom') {
                customAmountContainer.style.display = 'block';
                customAmountInput.focus();
            } else {
                customAmountContainer.style.display = 'none';
            }
        });
    });
    
    // Gallery filter
    const mediaFilterButtons = document.querySelectorAll('.media-filter .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    mediaFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            mediaFilterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxVideoContainer = document.querySelector('.lightbox-video-container');
    const lightboxCaption = document.querySelector('.lightbox-caption h3');
    const lightboxCaptionText = document.querySelector('.lightbox-caption p');
    const galleryViewButtons = document.querySelectorAll('.gallery-view');
    let currentLightboxIndex = 0;
    
    galleryViewButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const galleryItem = this.closest('.gallery-item');
            const isVideo = galleryItem.classList.contains('videos');
            const title = galleryItem.querySelector('h4').textContent;
            const caption = galleryItem.querySelector('p').textContent;
            
            // Show appropriate container (image or video)
            if (isVideo) {
                lightboxImage.style.display = 'none';
                lightboxVideoContainer.style.display = 'block';
            } else {
                lightboxImage.style.display = 'block';
                lightboxVideoContainer.style.display = 'none';
                // Set background as image (since we're not using actual images)
                const bgStyle = getComputedStyle(galleryItem.querySelector('.gallery-image')).backgroundImage;
                lightboxImage.style.backgroundImage = bgStyle;
                lightboxImage.style.width = '100%';
                lightboxImage.style.height = '50vh';
                lightboxImage.style.backgroundSize = 'cover';
                lightboxImage.style.backgroundPosition = 'center';
            }
            
            // Set caption
            lightboxCaption.textContent = title;
            lightboxCaptionText.textContent = caption;
            
            // Show lightbox
            lightbox.style.display = 'flex';
            currentLightboxIndex = index;
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    document.querySelector('.lightbox-close').addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close lightbox when clicking outside content
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Lightbox navigation
    document.querySelector('.lightbox-next').addEventListener('click', function() {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryViewButtons.length;
        galleryViewButtons[currentLightboxIndex].click();
    });
    
    document.querySelector('.lightbox-prev').addEventListener('click', function() {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryViewButtons.length) % galleryViewButtons.length;
        galleryViewButtons[currentLightboxIndex].click();
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowRight') {
                document.querySelector('.lightbox-next').click();
            } else if (e.key === 'ArrowLeft') {
                document.querySelector('.lightbox-prev').click();
            }
        }
    });
    
    // Animate stats numbers
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Format number with commas for thousands
            element.textContent = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Intersection Observer for stats animation
    const statElements = document.querySelectorAll('.number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.getAttribute('data-count'));
                animateValue(element, 0, finalValue, 2000);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statElements.forEach(stat => {
        observer.observe(stat);
    });
    
    // Form validations
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation could be added here
            
            // Show success message
            const formElements = this.elements;
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit') {
                    formElements[i].value = '';
                }
            }
            
            // Create and show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Merci ! Votre message a été envoyé avec succès.';
            successMessage.style.color = 'var(--primary-color)';
            successMessage.style.padding = '10px';
            successMessage.style.marginTop = '10px';
            successMessage.style.backgroundColor = 'var(--primary-bg)';
            successMessage.style.borderRadius = 'var(--border-radius)';
            successMessage.style.textAlign = 'center';
            
            this.appendChild(successMessage);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    });
    
    // GSAP animations
    // Hero content animation
    gsap.from('.hero-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Section headers animation
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        gsap.from(header, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Add tooltip functionality
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', showTooltip);
        trigger.addEventListener('mouseleave', hideTooltip);
        trigger.addEventListener('focus', showTooltip);
        trigger.addEventListener('blur', hideTooltip);
    });

    function showTooltip(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        
        // Position the tooltip
        const triggerRect = this.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        const top = triggerRect.top - tooltipRect.height - 10;
        const left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        
        tooltip.style.top = `${top + window.scrollY}px`;
        tooltip.style.left = `${left}px`;
        tooltip.style.opacity = '1';
        
        this.setAttribute('data-tooltip-active', 'true');
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.custom-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
        this.removeAttribute('data-tooltip-active');
    }

    // Page navigation handler
    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href');
            window.location.href = targetPage;
        });
    });
});
