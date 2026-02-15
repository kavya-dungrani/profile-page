/**
 * 3D Tilted Card Animation
 * Vanilla JS implementation inspired by TiltedCard component
 */

class TiltedCard {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      scaleOnHover: options.scaleOnHover || 1.05,
      rotateAmplitude: options.rotateAmplitude || 12,
      springConfig: options.springConfig || { damping: 0.15, stiffness: 0.08 },
      perspective: options.perspective || 1000,
      ...options
    };

    this.state = {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      targetRotateX: 0,
      targetRotateY: 0,
      targetScale: 1
    };

    this.init();
  }

  init() {
    // Add 3D transform styles
    this.element.style.transform = 'perspective(' + this.options.perspective + 'px)';
    this.element.style.transformStyle = 'preserve-3d';
    this.element.style.transition = 'transform 0.1s ease-out';
    this.element.style.willChange = 'transform';

    // Bind event listeners
    this.handleMouseMove = this.onMouseMove.bind(this);
    this.handleMouseEnter = this.onMouseEnter.bind(this);
    this.handleMouseLeave = this.onMouseLeave.bind(this);

    this.element.addEventListener('mousemove', this.handleMouseMove);
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);

    // Start animation loop
    this.animationFrame = null;
    this.animate();
  }

  onMouseMove(e) {
    const rect = this.element.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    this.state.targetRotateX = (offsetY / (rect.height / 2)) * -this.options.rotateAmplitude;
    this.state.targetRotateY = (offsetX / (rect.width / 2)) * this.options.rotateAmplitude;
  }

  onMouseEnter() {
    this.state.targetScale = this.options.scaleOnHover;
  }

  onMouseLeave() {
    this.state.targetRotateX = 0;
    this.state.targetRotateY = 0;
    this.state.targetScale = 1;
  }

  // Spring physics for smooth animation
  animate() {
    const { damping, stiffness } = this.options.springConfig;

    // Apply spring physics
    this.state.rotateX += (this.state.targetRotateX - this.state.rotateX) * stiffness;
    this.state.rotateY += (this.state.targetRotateY - this.state.rotateY) * stiffness;
    this.state.scale += (this.state.targetScale - this.state.scale) * stiffness;

    // Apply damping
    this.state.rotateX *= (1 - damping);
    this.state.rotateY *= (1 - damping);

    // Update transform
    this.updateTransform();

    // Continue animation
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }

  updateTransform() {
    const transform = `
      perspective(${this.options.perspective}px)
      rotateX(${this.state.rotateX}deg)
      rotateY(${this.state.rotateY}deg)
      scale(${this.state.scale})
    `;
    this.element.style.transform = transform;
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.element.removeEventListener('mousemove', this.handleMouseMove);
    this.element.removeEventListener('mouseenter', this.handleMouseEnter);
    this.element.removeEventListener('mouseleave', this.handleMouseLeave);
  }
}

// Auto-initialize on all cards
function initializeTiltedCards() {
  // Certificate cards
  const certificateCards = document.querySelectorAll('.certificate-card');
  certificateCards.forEach(card => {
    new TiltedCard(card, {
      scaleOnHover: 1.05,
      rotateAmplitude: 10,
      perspective: 1000
    });
  });

  // Repo cards (projects)
  const repoCards = document.querySelectorAll('.repo-card');
  repoCards.forEach(card => {
    new TiltedCard(card, {
      scaleOnHover: 1.05,
      rotateAmplitude: 10,
      perspective: 1000
    });
  });

  // Social cards
  const socialCards = document.querySelectorAll('.social-card');
  socialCards.forEach(card => {
    new TiltedCard(card, {
      scaleOnHover: 1.08,
      rotateAmplitude: 12,
      perspective: 800
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTiltedCards);
} else {
  initializeTiltedCards();
}

// Make it globally available
if (typeof window !== 'undefined') {
  window.TiltedCard = TiltedCard;
  window.initializeTiltedCards = initializeTiltedCards;
}
