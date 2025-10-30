// Music Control
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

// Auto-start music when page loads
window.addEventListener('load', () => {
    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.textContent = '🔊';
        musicToggle.classList.add('playing');
    }).catch(error => {
        // If autoplay is blocked by browser, user will need to click the button
        console.log('Autoplay was prevented. User will need to click play.');
    });
});

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🎵';
        musicToggle.classList.remove('playing');
    } else {
        bgMusic.play();
        musicToggle.textContent = '🔊';
        musicToggle.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// Start Button
const startBtn = document.getElementById('startBtn');
const hero = document.getElementById('hero');

startBtn.addEventListener('click', () => {
    // Make sure music is playing (in case autoplay was blocked)
    if (!isPlaying) {
        bgMusic.play();
        musicToggle.textContent = '🔊';
        musicToggle.classList.add('playing');
        isPlaying = true;
    }
    
    // Hide the arrows after clicking
    const arrows = document.querySelectorAll('.arrow, .arrow-below');
    arrows.forEach(arrow => {
        arrow.style.opacity = '0';
        arrow.style.transition = 'opacity 0.5s ease';
    });
    
    // Scroll to first chapter
    document.getElementById('chapter1').scrollIntoView({ behavior: 'smooth' });
});

// Replay Button
const replayBtn = document.getElementById('replayBtn');

replayBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Reset animations
    setTimeout(() => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            element.classList.remove('active');
        });
        
        const messages = document.querySelectorAll('.message-card');
        messages.forEach(message => {
            message.classList.remove('visible');
        });
    }, 1000);
});

// Navbar Show/Hide on Scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// Progress Bar
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / documentHeight) * 100;
    
    progressBar.style.width = progress + '%';
});

// Scroll Reveal Animation
const revealElements = () => {
    const reveals = document.querySelectorAll('.chapter, .content-grid, .love-card, .activity-card, .moment-card, .confession-card');
    
    reveals.forEach(element => {
        element.classList.add('reveal');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    reveals.forEach(element => {
        observer.observe(element);
    });
};

// Message Cards Animation
const animateMessages = () => {
    const messages = document.querySelectorAll('.message-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, {
        threshold: 0.2
    });
    
    messages.forEach(message => {
        observer.observe(message);
    });
};

// Particle System
const createParticles = () => {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random colors
        const colors = ['#ff6b9d', '#c084fc', '#fbbf24', '#67e8f9'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
};

// Image Hover Effect
const addImageEffects = () => {
    const images = document.querySelectorAll('.story-image, .gallery-image, .moment-image');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
};

// Smooth Scroll for Internal Links
const smoothScrollLinks = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
};

// Typing Effect for Hero Subtitle
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Parallax Effect
const parallaxEffect = () => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content, .stars');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
};

// Card Tilt Effect
const addCardTilt = () => {
    const cards = document.querySelectorAll('.love-card, .activity-card, .moment-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
};

// Lazy Loading Images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Confetti Effect
const createConfetti = () => {
    const colors = ['#ff6b9d', '#c084fc', '#fbbf24', '#67e8f9', '#86efac'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        confetti.style.transition = 'all 3s ease-out';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = '100vh';
            confetti.style.opacity = '0';
            confetti.style.transform = 'rotate(' + (Math.random() * 720) + 'deg)';
        }, 10);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
};

// Trigger confetti when reaching final chapter
const triggerConfettiOnFinal = () => {
    const finalChapter = document.getElementById('finalChapter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createConfetti();
                observer.unobserve(finalChapter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(finalChapter);
};

// Easter Egg: Click on hero title multiple times
let clickCount = 0;
const heroTitle = document.querySelector('.hero-title');

heroTitle.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 5) {
        createConfetti();
        clickCount = 0;
    }
});

// Cursor Trail Effect
const cursorTrail = () => {
    const trail = [];
    const trailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.width = '5px';
        dot.style.height = '5px';
        dot.style.borderRadius = '50%';
        dot.style.background = 'var(--primary)';
        dot.style.pointerEvents = 'none';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        dot.style.opacity = '0.5';
        dot.style.zIndex = '9998';
        
        document.body.appendChild(dot);
        trail.push(dot);
        
        if (trail.length > trailLength) {
            const oldDot = trail.shift();
            oldDot.remove();
        }
        
        setTimeout(() => {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(0)';
            dot.style.transition = 'all 0.5s ease';
        }, 10);
    });
};

// Sound Effects (optional)
const playSoundEffect = (type) => {
    // You can add sound effects here if needed
    // const audio = new Audio(`sounds/${type}.mp3`);
    // audio.play();
};

// Initialize Everything
const init = () => {
    revealElements();
    animateMessages();
    createParticles();
    addImageEffects();
    smoothScrollLinks();
    parallaxEffect();
    addCardTilt();
    lazyLoadImages();
    triggerConfettiOnFinal();
    // cursorTrail(); // Uncomment if you want cursor trail effect
    
    console.log('💝 Love Story Website Initialized 💝');
    console.log('Made with ❤️ for Angel');
};

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Performance Optimization
const optimizePerformance = () => {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 10);
    };
};

optimizePerformance();

// Add custom cursor
document.body.style.cursor = 'default';

// Prevent right-click on images (optional protection)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
        bgMusic.pause();
    } else if (!document.hidden && isPlaying) {
        bgMusic.play();
    }
});

// Mobile touch optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    } else if (e.key === ' ') {
        e.preventDefault();
        if (!isPlaying) {
            musicToggle.click();
        }
    }
});

// Console Easter Egg
console.log('%c💝 For My Angel 💝', 'color: #ff6b9d; font-size: 24px; font-weight: bold;');
console.log('%cThis website was made with endless love and dedication.', 'color: #c084fc; font-size: 14px;');
console.log('%cEvery line of code, every animation, every word is for you.', 'color: #fbbf24; font-size: 14px;');
console.log('%cI love you, deeply, endlessly, and always. - Sinatra', 'color: #ff6b9d; font-size: 14px; font-style: italic;');