// Mercado Pago Cuenta Landing - JavaScript
// Vanilla JS with analytics logging and accessibility features

(function() {
  'use strict';

  // Analytics logging function
  function logAnalytics(event, data = {}) {
    console.log(`Analytics: ${event}`, data);
  }

  // Mobile detection
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Utility function to handle clicks outside element
  function handleClickOutside(element, callback) {
    function handleClick(event) {
      if (!element.contains(event.target)) {
        callback();
        document.removeEventListener('click', handleClick);
      }
    }
    // Add listener on next tick to avoid immediate trigger
    setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, 0);
  }

  // CTA Choice Panel functionality
  function initCTAChoicePanel() {
    const mainCTA = document.getElementById('main-cta');
    const choicePanel = document.getElementById('cta-choice-panel');
    const choiceButtons = choicePanel.querySelectorAll('.choice-btn');

    if (!mainCTA || !choicePanel) return;

    mainCTA.addEventListener('click', function() {
      const isExpanded = mainCTA.getAttribute('aria-expanded') === 'true';
      
      if (!isExpanded) {
        // Open panel
        mainCTA.setAttribute('aria-expanded', 'true');
        choicePanel.setAttribute('aria-hidden', 'false');
        logAnalytics('cta_choice_open');
        
        // Handle click outside to close
        handleClickOutside(choicePanel, function() {
          mainCTA.setAttribute('aria-expanded', 'false');
          choicePanel.setAttribute('aria-hidden', 'true');
        });
      } else {
        // Close panel
        mainCTA.setAttribute('aria-expanded', 'false');
        choicePanel.setAttribute('aria-hidden', 'true');
      }
      
      logAnalytics('hero_cta_click');
    });

    // Handle choice button clicks
    choiceButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const type = this.getAttribute('data-type');
        logAnalytics('cta_choice_click', { type });
        
        // Close panel after selection
        mainCTA.setAttribute('aria-expanded', 'false');
        choicePanel.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // Sticky CTA functionality
  function initStickyCTA() {
    const hero = document.querySelector('.hero');
    const stickyCTA = document.getElementById('sticky-cta');
    const stickyCTABtn = document.querySelector('.sticky-cta-btn');

    if (!hero || !stickyCTA) return;

    // Check if IntersectionObserver is available
    if (!window.IntersectionObserver) {
      // Fallback: always show sticky CTA
      stickyCTA.setAttribute('aria-hidden', 'false');
      return;
    }

    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(entry => {
          // Show sticky CTA when hero is 50% out of view
          if (entry.intersectionRatio < 0.5) {
            stickyCTA.setAttribute('aria-hidden', 'false');
          } else {
            stickyCTA.setAttribute('aria-hidden', 'true');
          }
        });
      },
      {
        threshold: [0.5]
      }
    );

    observer.observe(hero);

    // Handle sticky CTA click
    if (stickyCTABtn) {
      stickyCTABtn.addEventListener('click', function(e) {
        e.preventDefault();
        logAnalytics('sticky_cta_click');
        // Scroll to hero section
        hero.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  // Section reveal functionality
  function initSectionReveal() {
    const revealSections = document.querySelectorAll('.reveal-section');

    if (!revealSections.length) return;

    // Check if IntersectionObserver is available and motion is not reduced
    if (!window.IntersectionObserver || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Fallback: show all sections immediately
      revealSections.forEach(section => {
        section.classList.add('reveal-in');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealSections.forEach(section => {
      observer.observe(section);
    });
  }

  // Mobile app handoff functionality
  function initMobileAppHandoff() {
    const appCTA = document.getElementById('app-cta');
    
    if (!appCTA) return;

    // Show mobile CTA only on mobile devices
    if (isMobile()) {
      appCTA.style.display = 'inline-flex';
    } else {
      appCTA.style.display = 'none';
    }

    appCTA.addEventListener('click', function(e) {
      e.preventDefault();
      logAnalytics('handoff_app_opened');
      
      // Simulate deep link (in real app, this would open the actual app)
      // For demo purposes, we'll just log it
      console.log('Opening Mercado Pago app...');
    });
  }

  // Learn more links functionality
  function initLearnMoreLinks() {
    const learnMoreLinks = document.querySelectorAll('.learn-more');
    
    learnMoreLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const cardId = this.getAttribute('data-card');
        logAnalytics('card_learn_more_click', { card_id: cardId });
      });
    });
  }

  // FAQ functionality with analytics
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const summary = item.querySelector('summary');
      if (summary) {
        summary.addEventListener('click', function() {
          const faqId = item.getAttribute('data-faq');
          // Use setTimeout to check if the details element will be open after click
          setTimeout(() => {
            if (item.open) {
              logAnalytics('faq_open', { faq_id: faqId });
            }
          }, 0);
        });
      }
    });
  }

  // Keyboard navigation enhancements
  function initKeyboardNavigation() {
    // Enhance focus visibility for interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, details summary, [tabindex]:not([tabindex="-1"])'
    );
    
    interactiveElements.forEach(element => {
      element.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          // Add visual feedback for keyboard activation
          this.style.transform = 'scale(0.98)';
          setTimeout(() => {
            this.style.transform = '';
          }, 150);
        }
      });
    });
  }

  // Initialize all functionality when DOM is ready
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    try {
      initCTAChoicePanel();
      initStickyCTA();
      initSectionReveal();
      initMobileAppHandoff();
      initLearnMoreLinks();
      initFAQ();
      initKeyboardNavigation();
      
      console.log('Mercado Pago Cuenta landing initialized successfully');
    } catch (error) {
      console.error('Error initializing Mercado Pago Cuenta landing:', error);
    }
  }

  // Start initialization
  init();

  // Expose analytics function globally for testing
  window.mpAnalytics = logAnalytics;

})();
