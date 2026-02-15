// Animated Dock Navigation Component
// Vanilla JavaScript implementation with smooth animations

class DockNavigation {
  constructor(containerId, items, options = {}) {
    this.container = document.getElementById(containerId);
    this.items = items;
    this.options = {
      spring: options.spring || { mass: 0.1, stiffness: 150, damping: 12 },
      magnification: options.magnification || 70,
      distance: options.distance || 200,
      panelHeight: options.panelHeight || 64,
      baseItemSize: options.baseItemSize || 50,
      ...options
    };
    
    this.mouseX = Infinity;
    this.isHovered = false;
    this.init();
  }

  init() {
    if (!this.container) {
      console.error('Dock container not found');
      return;
    }
    this.render();
    this.attachEventListeners();
  }

  render() {
    const dockHTML = `
      <div class="dock-container" id="dockContainer">
        <div class="dock-panel" id="dockPanel">
          ${this.items.map((item, index) => this.renderItem(item, index)).join('')}
        </div>
      </div>
    `;
    this.container.innerHTML = dockHTML;
  }

  renderItem(item, index) {
    const isActive = item.isActive ? 'active' : '';
    return `
      <div class="dock-item ${isActive}" data-index="${index}" data-label="${item.label}">
        <a href="${item.href}" class="dock-item-link" ${item.target ? `target="${item.target}"` : ''}>
          <div class="dock-icon">
            ${item.icon}
          </div>
        </a>
        <div class="dock-label">${item.label}</div>
      </div>
    `;
  }

  attachEventListeners() {
    const dockPanel = document.getElementById('dockPanel');
    const dockItems = document.querySelectorAll('.dock-item');

    // Mouse tracking
    dockPanel.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.isHovered = true;
      this.updateMagnification();
    });

    dockPanel.addEventListener('mouseleave', () => {
      this.mouseX = Infinity;
      this.isHovered = false;
      this.updateMagnification();
    });

    // Item hover for labels
    dockItems.forEach(item => {
      const label = item.querySelector('.dock-label');
      
      item.addEventListener('mouseenter', () => {
        label.classList.add('visible');
      });

      item.addEventListener('mouseleave', () => {
        label.classList.remove('visible');
      });
    });
  }

  updateMagnification() {
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.x + rect.width / 2;
      const distance = Math.abs(this.mouseX - itemCenterX);
      
      let scale = 1;
      if (this.isHovered && distance < this.options.distance) {
        // Calculate scale based on distance
        const normalizedDistance = distance / this.options.distance;
        const magnificationRatio = this.options.magnification / this.options.baseItemSize;
        scale = 1 + (magnificationRatio - 1) * (1 - normalizedDistance);
      }
      
      // Apply smooth transition
      item.style.transform = `scale(${scale})`;
    });
  }
}

// Initialize dock when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Function to determine active item based on current URL
  function updateActiveStates() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;
    
    // Check each item and update active state
    dockItems.forEach((item, index) => {
      const itemLink = item.href;
      
      // Check if item has a hash
      if (itemLink.includes('#')) {
        const [itemPage, itemHash] = itemLink.split('#');
        const normalizedItemPage = itemPage || 'index.html';
        
        // Active if on the same page AND same hash
        item.isActive = (currentPage === normalizedItemPage || currentPage === '') && 
                       currentHash === `#${itemHash}`;
      } else {
        // For non-hash links, active if on same page AND no hash in URL
        item.isActive = (currentPage === itemLink || (currentPage === '' && itemLink === 'index.html')) && 
                       !currentHash;
      }
    });
    
    // Re-render the dock with updated active states
    if (window.dockInstance) {
      window.dockInstance.render();
      window.dockInstance.attachEventListeners();
    }
  }
  
  const dockItems = [
    {
      label: 'Home',
      href: 'index.html',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>`,
      isActive: true
    },
    {
      label: 'About',
      href: 'index.html#about',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>`,
      isActive: false
    },
    {
      label: 'Certificates',
      href: 'certificates.html',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
      </svg>`,
      isActive: false
    },
    {
      label: 'Projects',
      href: 'projects.html',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>`,
      isActive: false
    },
    {
      label: 'Contact',
      href: 'index.html#connect',
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>`,
      isActive: false
    }
  ];
  
  // Initial active state update
  updateActiveStates();
  
  // Listen for hash changes (when clicking anchor links)
  window.addEventListener('hashchange', updateActiveStates);

  // Create the dock instance and store it globally
  window.dockInstance = new DockNavigation('navigationDock', dockItems, {
    magnification: 70,
    baseItemSize: 50,
    distance: 200
  });
  
  // Update active states after dock is created
  updateActiveStates();
});
