// Custom cursor functionality
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.cursorOutline = document.getElementById('cursor-outline');
        this.init();
    }

    init() {
        // Only initialize cursor on non-mobile devices
        if (window.innerWidth > 768) {
            this.bindEvents();
        }
    }

    bindEvents() {
        document.addEventListener('mousemove', this.updateCursor.bind(this));
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .social-link, .nav-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', this.addHoverEffect.bind(this));
            element.addEventListener('mouseleave', this.removeHoverEffect.bind(this));
        });
    }

    updateCursor(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        this.cursor.style.left = x + 'px';
        this.cursor.style.top = y + 'px';
        
        // Smooth follow for outline
        setTimeout(() => {
            this.cursorOutline.style.left = (x - 16) + 'px';
            this.cursorOutline.style.top = (y - 16) + 'px';
        }, 50);
    }

    addHoverEffect() {
        this.cursor.classList.add('cursor-hover');
        this.cursorOutline.classList.add('cursor-outline-hover');
    }

    removeHoverEffect() {
        this.cursor.classList.remove('cursor-hover');
        this.cursorOutline.classList.remove('cursor-outline-hover');
    }
}

// Smooth scrolling navigation
class SmoothNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.bindNavigation();
        this.bindMobileMenu();
    }

    bindNavigation() {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });
    }

    bindMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                this.closeMobileMenu();
            }
        });
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.add('hidden');
    }
}

// Scroll animations using Intersection Observer
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.createObserver();
        this.observeElements();
        this.animateSkillBars();
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate skill bars when skills section is visible
                    if (entry.target.closest('#skills')) {
                        this.animateSkillBars();
                    }
                }
            });
        }, this.observerOptions);
    }

    observeElements() {
        const animatedElements = document.querySelectorAll('.section-content');
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200);
        });
    }
}

// Navbar background on scroll
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('nav');
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 50) {
            this.navbar.classList.add('bg-black/80');
            this.navbar.classList.remove('bg-black/10');
        } else {
            this.navbar.classList.add('bg-black/10');
            this.navbar.classList.remove('bg-black/80');
        }
    }
}

// Parallax effect for hero section
class ParallaxEffect {
    constructor() {
        this.heroSection = document.getElementById('home');
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (this.heroSection) {
            this.heroSection.style.transform = `translateY(${rate}px)`;
        }
    }
}

// Form handling
class FormHandler {
    constructor() {
        this.form = document.querySelector('form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const name = formData.get('name') || this.form.querySelector('input[type="text"]').value;
        const email = formData.get('email') || this.form.querySelector('input[type="email"]').value;
        const message = formData.get('message') || this.form.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            this.showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        this.showNotification('Thank you! Your message has been sent.', 'success');
        this.form.reset();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white transition-all duration-300 ${
            type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Loading animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', this.hideLoading.bind(this));
    }

    hideLoading() {
        // Add a slight delay for smooth transition
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 500);
    }
}

// Typing animation for hero text
class TypingAnimation {
    constructor() {
        this.texts = [
            'Machine Learning Developer',
            'Web Developer',
            'Cloud Computing Enthusiast',
            'Binus University Student'
        ];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        const heroSubtitle = document.querySelector('#home p');
        if (heroSubtitle) {
            this.animateText(heroSubtitle);
        }
    }

    animateText(element) {
        let currentText = '';
        let isDeleting = false;
        let textIndex = 0;
        let charIndex = 0;

        const type = () => {
            const fullText = this.texts[textIndex];
            
            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            element.textContent = currentText;
            
            let typeSpeed = isDeleting ? 100 : 150;
            
            if (!isDeleting && charIndex === fullText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % this.texts.length;
                typeSpeed = 500; // Pause before next text
            }
            
            setTimeout(type, typeSpeed);
        };
        
        // Start the animation after a delay
        setTimeout(type, 1000);
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.preloadImages();
        this.lazyLoadImages();
        this.optimizeScrollEvents();
    }

    preloadImages() {
        const imagesToPreload = [
            // Add any critical images here
        ];
        
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    optimizeScrollEvents() {
        let ticking = false;
        
        const optimizedScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-based animations here
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScroll, { passive: true });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new CustomCursor();
    new SmoothNavigation();
    new ScrollAnimations();
    new NavbarScroll();
    new ParallaxEffect();
    new FormHandler();
    new LoadingAnimation();
    new PerformanceOptimizer();
    
    // Set initial opacity
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Handle resize events
window.addEventListener('resize', () => {
    // Reinitialize cursor on resize if needed
    if (window.innerWidth <= 768) {
        const cursor = document.getElementById('cursor');
        const cursorOutline = document.getElementById('cursor-outline');
        if (cursor) cursor.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    } else {
        const cursor = document.getElementById('cursor');
        const cursorOutline = document.getElementById('cursor-outline');
        if (cursor) cursor.style.display = 'block';
        if (cursorOutline) cursorOutline.style.display = 'block';
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

// Service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// filepath: c:\Users\HP\Downloads\StudentPortfolio\StudentPortfolio\script.js
document.addEventListener("DOMContentLoaded", () => {
    const character = document.querySelector(".character");
    const container = document.querySelector("#about");

    let posX = 10; // Posisi awal X
    let posY = 10; // Posisi awal Y
    let velocityX = 2; // Kecepatan horizontal
    let velocityY = 2; // Kecepatan vertikal

    const moveCharacter = () => {
        // Hitung batas kontainer
        const containerRect = container.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();

        // Perbarui posisi
        posX += velocityX;
        posY += velocityY;

        // Pantulkan jika mencapai batas
        if (posX + characterRect.width >= containerRect.width || posX <= 0) {
            velocityX *= -1; // Balik arah horizontal
        }
        if (posY + characterRect.height >= containerRect.height || posY <= 0) {
            velocityY *= -1; // Balik arah vertikal
        }

        // Terapkan posisi ke elemen
        character.style.left = `${posX}px`;
        character.style.top = `${posY}px`;

        // Panggil fungsi lagi
        requestAnimationFrame(moveCharacter);
    };

    // Mulai animasi
    moveCharacter();
});
