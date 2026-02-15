// ===================================
// TYPING ANIMATION
// ===================================

const typingText = document.getElementById("typing-text");

// ===================================
// SIDEBAR NAVIGATION TOGGLE
// ===================================

const menuToggle = document.getElementById("menuToggle");
const sidebarNav = document.getElementById("sidebarNav");
const navLinks = document.querySelectorAll(".nav-links a");
const body = document.body;

// Toggle sidebar collapse/expand (desktop) or show/hide (mobile)
menuToggle.addEventListener("click", () => {
  if (window.innerWidth > 768) {
    // Desktop: Toggle collapse state
    sidebarNav.classList.toggle("collapsed");
    body.classList.toggle("sidebar-collapsed");
  } else {
    // Mobile: Toggle visibility
    sidebarNav.classList.toggle("active");
    menuToggle.classList.toggle("active");
  }
});

// Close menu when clicking a link (mobile)
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      sidebarNav.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

// Highlight active link based on scroll position
function highlightActiveLink() {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.scrollY + 200;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightActiveLink);
highlightActiveLink(); // Call on load

const phrases = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
  "Tech Innovator",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    // Pause at end of phrase
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeEffect, 1000);
});

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 70; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================

const revealElements = document.querySelectorAll(".reveal");

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((element) => {
  observer.observe(element);
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const nav = document.querySelector("nav");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add shadow on scroll
  if (currentScroll > 50) {
    nav.style.boxShadow = "0 4px 20px rgba(255, 0, 0, 0.2)";
  } else {
    nav.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// ===================================
// PARALLAX EFFECT
// ===================================

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector("#hero");

  if (hero) {
    const heroContent = hero.querySelector(".hero-content");
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroContent.style.opacity = 1 - scrolled / window.innerHeight;
    }
  }
});

// ===================================
// CERTIFICATE CARD INTERACTIONS
// ===================================

const certificateCards = document.querySelectorAll(".certificate-card");

certificateCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// ===================================
// REPO CARD INTERACTIONS
// ===================================

const repoCards = document.querySelectorAll(".repo-card");

repoCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// ===================================
// ANIMATED COUNTER (FOR STATS)
// ===================================

function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// ===================================
// MOUSE TRAIL EFFECT (OPTIONAL)
// ===================================

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function createCursorTrail() {
  const trail = document.createElement("div");
  trail.className = "cursor-trail";
  trail.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: var(--color-red-vibrant);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.5;
        transition: opacity 0.3s;
    `;
  document.body.appendChild(trail);

  function animateTrail() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    trail.style.left = cursorX + "px";
    trail.style.top = cursorY + "px";

    requestAnimationFrame(animateTrail);
  }

  animateTrail();
}

// Uncomment to enable cursor trail effect
// createCursorTrail();

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===================================
// LOADING ANIMATION
// ===================================

window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger initial animations
  const fadeElements = document.querySelectorAll(".fade-in-up");
  fadeElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.animationDelay = `${index * 0.2}s`;
    }, 100);
  });
});

// ===================================
// DYNAMIC THEME ACCENT (OPTIONAL)
// ===================================

function createFloatingParticles() {
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles";
  particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
  document.body.insertBefore(particlesContainer, document.body.firstChild);

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--color-red-vibrant);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s infinite;
            opacity: ${0.1 + Math.random() * 0.3};
        `;
    particlesContainer.appendChild(particle);
  }
}

// Uncomment to enable floating particles
// createFloatingParticles();

// Navbar scroll effect removed - using sidebar navigation now

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log(
  "%c Welcome to my Portfolio! ",
  "background: #ffffff; color: #000; font-size: 20px; font-weight: bold; padding: 10px;",
);
console.log(
  "%c Built with ❤️ and modern web technologies ",
  "background: #000; color: #ffffff; font-size: 14px; padding: 5px;",
);
