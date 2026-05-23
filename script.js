// Music Player
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🎵';
        isPlaying = false;
    } else {
        bgMusic.play();
        musicToggle.textContent = '⏸️';
        isPlaying = true;
    }
});

// Auto-play music on page load (muted initially due to browser policies)
window.addEventListener('load', () => {
    bgMusic.muted = false;
    bgMusic.play().catch(() => {
        console.log('Auto-play prevented. User must click music button.');
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
});

// Button Click Animation
document.getElementById('heartBtn').addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 100);
    
    // Create multiple hearts
    for (let i = 0; i < 10; i++) {
        createHeart();
    }
});

// Double-click for floating hearts
document.addEventListener('dblclick', (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.id !== 'musicToggle') {
        for (let i = 0; i < 5; i++) {
            createHeart(e.clientX, e.clientY);
        }
    }
});

// Create floating hearts
function createHeart(x = Math.random() * window.innerWidth, y = Math.random() * window.innerHeight) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '💔';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.speech-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

console.log('🎵 Website loaded! Click the music button to play "Tum Hi Ho"');