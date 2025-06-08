// Enhanced Theme Management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = this.themeToggle.querySelector('.theme-icon');
    
    this.init();
  }
  
  init() {
    this.applyTheme();
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Add smooth transition for theme changes
    document.documentElement.style.setProperty('--transition-theme', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)');
  }
  
  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.updateThemeIcon();
    
    // Add theme transition class
    document.body.classList.add('theme-transitioning');
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 300);
  }
  
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme();
    
    // Add visual feedback
    this.themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.themeToggle.style.transform = 'scale(1)';
    }, 150);
  }
  
  updateThemeIcon() {
    this.themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
  }
}

// Enhanced Navigation Management
class NavigationManager {
  constructor() {
    this.tabItems = document.querySelectorAll('.tab-item');
    this.contentSections = document.querySelectorAll('.content-section');
    this.topicTitle = document.getElementById('topic-title');
    this.topicDescription = document.getElementById('topic-description');
    this.topicBadge = document.getElementById('topic-badge');
    
    this.topicData = {
      database: {
        title: 'Database Architecture',
        description: 'Comprehensive guide to database design patterns, optimization strategies, and architectural best practices for scalable systems',
        badge: 'Database'
      },
      crypto: {
        title: 'Cryptography & Security',
        description: 'Advanced cryptographic protocols, encryption algorithms, digital signatures, and security implementation patterns',
        badge: 'Cryptography'
      },
      authentication: {
        title: 'Authentication Systems',
        description: 'Modern authentication mechanisms, identity management, OAuth protocols, and secure user verification systems',
        badge: 'Auth'
      },
      transport: {
        title: 'Transport Layer Protocols',
        description: 'Network communication protocols, API design patterns, message queuing, and distributed system communication',
        badge: 'Transport'
      },
      system: {
        title: 'System Architecture',
        description: 'Scalable system design, microservices architecture, load balancing, and infrastructure optimization strategies',
        badge: 'System'
      }
    };
    
    this.init();
  }
  
  init() {
    this.tabItems.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const topic = e.currentTarget.dataset.topic;
        this.switchToTopic(topic);
      });
      
      // Add hover effects
      tab.addEventListener('mouseenter', () => {
        if (!tab.classList.contains('active')) {
          tab.style.transform = 'translateY(-2px)';
        }
      });
      
      tab.addEventListener('mouseleave', () => {
        if (!tab.classList.contains('active')) {
          tab.style.transform = 'translateY(0)';
        }
      });
    });
  }
  
  switchToTopic(topic) {
    // Update tab active states with animation
    this.tabItems.forEach(tab => {
      tab.classList.remove('active');
      tab.style.transform = 'translateY(0)';
      
      if (tab.dataset.topic === topic) {
        tab.classList.add('active');
        
        // Add selection animation
        tab.style.transform = 'translateY(-2px)';
        setTimeout(() => {
          tab.style.transform = 'translateY(0)';
        }, 200);
      }
    });
    
    // Update content sections with smooth transition
    this.contentSections.forEach(section => {
      section.classList.remove('active');
      
      if (section.id === `${topic}-content`) {
        // Add slight delay for smoother transition
        setTimeout(() => {
          section.classList.add('active');
        }, 100);
      }
    });
    
    // Update topic information with animation
    this.updateTopicInfo(topic);
    
    // Add page transition effect
    this.addPageTransition();
  }
  
  updateTopicInfo(topic) {
    const topicInfo = this.topicData[topic];
    if (topicInfo) {
      // Fade out current content
      const elements = [this.topicTitle, this.topicDescription, this.topicBadge];
      elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
      });
      
      // Update content after fade out
      setTimeout(() => {
        this.topicTitle.textContent = topicInfo.title;
        this.topicDescription.textContent = topicInfo.description;
        this.topicBadge.textContent = topicInfo.badge;
        
        // Fade in new content
        elements.forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }, 200);
    }
  }
  
  addPageTransition() {
    const contentArea = document.querySelector('.content-area');
    contentArea.style.transform = 'translateX(-10px)';
    contentArea.style.opacity = '0.9';
    
    setTimeout(() => {
      contentArea.style.transform = 'translateX(0)';
      contentArea.style.opacity = '1';
    }, 150);
  }
}

// Enhanced Iframe Management
class IframeManager {
  constructor() {
    this.iframes = document.querySelectorAll('iframe');
    this.loadingStates = new Map();
    this.init();
  }
  
  init() {
    this.iframes.forEach((iframe, index) => {
      const wrapper = iframe.closest('.iframe-wrapper');
      const loadingElement = wrapper.querySelector('.iframe-loading');
      
      this.loadingStates.set(iframe, {
        wrapper,
        loadingElement,
        loaded: false
      });
      
      iframe.addEventListener('load', () => {
        this.handleIframeLoad(iframe);
      });
      
      iframe.addEventListener('error', () => {
        this.handleIframeError(iframe);
      });
      
      // Add timeout for loading state
      setTimeout(() => {
        if (!this.loadingStates.get(iframe).loaded) {
          this.handleIframeLoad(iframe);
        }
      }, 10000); // 10 second timeout
    });
  }
  
  handleIframeLoad(iframe) {
    const state = this.loadingStates.get(iframe);
    if (state && !state.loaded) {
      state.loaded = true;
      
      // Smooth fade out of loading state
      state.loadingElement.style.opacity = '0';
      state.loadingElement.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        state.wrapper.classList.add('loaded');
        state.loadingElement.style.display = 'none';
      }, 300);
      
      // Add loaded animation to iframe
      iframe.style.opacity = '0';
      iframe.style.transform = 'scale(0.98)';
      
      setTimeout(() => {
        iframe.style.opacity = '1';
        iframe.style.transform = 'scale(1)';
      }, 100);
    }
  }
  
  handleIframeError(iframe) {
    const state = this.loadingStates.get(iframe);
    if (state) {
      state.loadingElement.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <div style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.6;">📄</div>
          <h3 style="margin-bottom: 1rem; color: var(--text-primary); font-size: 1.5rem;">Document Unavailable</h3>
          <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.6; max-width: 400px; margin: 0 auto;">
            The documentation could not be loaded. Please check your connection or try refreshing the page.
          </p>
          <button onclick="location.reload()" style="
            margin-top: 1.5rem;
            padding: 0.75rem 1.5rem;
            background: var(--gradient-accent);
            color: white;
            border: none;
            border-radius: var(--border-radius-md);
            cursor: pointer;
            font-weight: 600;
            transition: var(--transition-fast);
          ">
            Retry Loading
          </button>
        </div>
      `;
    }
  }
}

// Enhanced Responsive Management
class ResponsiveManager {
  constructor() {
    this.breakpoints = {
      mobile: 480,
      tablet: 768,
      desktop: 1024,
      large: 1200
    };
    
    this.init();
  }
  
  init() {
    window.addEventListener('resize', () => {
      this.handleResize();
    });
    
    this.handleResize(); // Initial check
  }
  
  handleResize() {
    const width = window.innerWidth;
    
    // Remove all responsive classes
    document.body.classList.remove('mobile-view', 'tablet-view', 'desktop-view', 'large-view');
    
    // Add appropriate class based on screen size
    if (width <= this.breakpoints.mobile) {
      document.body.classList.add('mobile-view');
      this.enableMobileOptimizations();
    } else if (width <= this.breakpoints.tablet) {
      document.body.classList.add('tablet-view');
      this.enableTabletOptimizations();
    } else if (width <= this.breakpoints.desktop) {
      document.body.classList.add('desktop-view');
    } else {
      document.body.classList.add('large-view');
    }
  }
  
  enableMobileOptimizations() {
    // Optimize for mobile performance
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      iframe.loading = 'lazy';
    });
  }
  
  enableTabletOptimizations() {
    // Tablet-specific optimizations
    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) {
      tabsContainer.scrollBehavior = 'smooth';
    }
  }
}

// Enhanced Keyboard Navigation
class KeyboardManager {
  constructor() {
    this.tabItems = document.querySelectorAll('.tab-item');
    this.currentTabIndex = 0;
    this.init();
  }
  
  init() {
    document.addEventListener('keydown', (e) => {
      this.handleKeydown(e);
    });
    
    // Make tabs focusable
    this.tabItems.forEach((tab, index) => {
      tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
      tab.addEventListener('focus', () => {
        this.currentTabIndex = index;
      });
    });
  }
  
  handleKeydown(e) {
    // Tab navigation with arrow keys
    if (document.activeElement.classList.contains('tab-item')) {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.navigateTab(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.navigateTab(1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          document.activeElement.click();
          break;
        case 'Home':
          e.preventDefault();
          this.focusTab(0);
          break;
        case 'End':
          e.preventDefault();
          this.focusTab(this.tabItems.length - 1);
          break;
      }
    }
    
    // Global shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 't':
          e.preventDefault();
          document.getElementById('theme-toggle').click();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          e.preventDefault();
          const index = parseInt(e.key) - 1;
          if (this.tabItems[index]) {
            this.tabItems[index].click();
          }
          break;
      }
    }
  }
  
  navigateTab(direction) {
    const newIndex = (this.currentTabIndex + direction + this.tabItems.length) % this.tabItems.length;
    this.focusTab(newIndex);
  }
  
  focusTab(index) {
    this.tabItems[this.currentTabIndex].setAttribute('tabindex', '-1');
    this.currentTabIndex = index;
    this.tabItems[this.currentTabIndex].setAttribute('tabindex', '0');
    this.tabItems[this.currentTabIndex].focus();
  }
}

// Performance Monitor
class PerformanceManager {
  constructor() {
    this.metrics = {
      loadTime: 0,
      renderTime: 0,
      interactionTime: 0
    };
    
    this.init();
  }
  
  init() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      this.metrics.loadTime = performance.now();
      this.optimizePerformance();
    });
    
    // Monitor interaction performance
    document.addEventListener('click', () => {
      this.metrics.interactionTime = performance.now();
    });
  }
  
  optimizePerformance() {
    // Lazy load non-critical resources
    this.lazyLoadImages();
    this.optimizeAnimations();
  }
  
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  optimizeAnimations() {
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency < 4) {
      document.documentElement.style.setProperty('--transition-fast', 'all 0.1s ease');
      document.documentElement.style.setProperty('--transition-smooth', 'all 0.2s ease');
    }
  }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core managers
  const themeManager = new ThemeManager();
  const navigationManager = new NavigationManager();
  const iframeManager = new IframeManager();
  const responsiveManager = new ResponsiveManager();
  const keyboardManager = new KeyboardManager();
  const performanceManager = new PerformanceManager();
  
  // Add loading completion handler
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add entrance animations
    const elements = document.querySelectorAll('.header, .nav-tabs, .content-area');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
  });
  
  // Add smooth tab switching effects
  document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      const rect = tab.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (rect.width / 2 - size / 2) + 'px';
      ripple.style.top = (rect.height / 2 - size / 2) + 'px';
      
      tab.style.position = 'relative';
      tab.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Global utility functions
window.SolutionArchitectDocs = {
  switchTopic: (topic) => {
    const tab = document.querySelector(`[data-topic="${topic}"]`);
    if (tab) {
      tab.click();
    }
  },
  
  toggleTheme: () => {
    document.getElementById('theme-toggle').click();
  },
  
  getCurrentTopic: () => {
    const activeTab = document.querySelector('.tab-item.active');
    return activeTab ? activeTab.dataset.topic : null;
  },
  
  getMetrics: () => {
    return {
      loadTime: performance.now(),
      memory: performance.memory ? performance.memory.usedJSHeapSize : 'N/A',
      connection: navigator.connection ? navigator.connection.effectiveType : 'N/A'
    };
  }
};
