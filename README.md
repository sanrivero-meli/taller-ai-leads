# Mercado Pago Cuenta Landing - Dark Mode Wireframe

A responsive, accessible dark-mode wireframe for the Mercado Pago "Cuenta" landing page built with semantic HTML, clean CSS, and vanilla JavaScript.

## 🚀 Getting Started

### How to Open Locally
1. Double-click `index.html` to open it in your default browser
2. Or serve it with a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have live-server installed)
   npx live-server
   ```
3. Navigate to the opened page in your browser

## 📝 Editing Content

### Where to Edit Copy
- **HTML Content**: All text content is in `index.html`
- **Headings**: Look for `<h1>`, `<h2>`, `<h3>` tags
- **Body Text**: Look for `<p>` tags and button text
- **FAQ Items**: Located in the `<details>` elements in the FAQ section

### Key Sections to Modify
- **Hero Section**: Main headline and subtitle in `.hero` section
- **Feature Cards**: Text in `.feature-card` elements
- **How It Works Steps**: Content in `.step` elements
- **FAQ**: Questions and answers in `.faq-item` details elements

## ⚙️ Customization

### Disabling Micro-interactions
To disable animations and transitions:

1. **Option 1 - CSS**: Add this to the end of `styles.css`:
   ```css
   * {
     animation: none !important;
     transition: none !important;
   }
   ```

2. **Option 2 - JavaScript**: Comment out observer initializations in `script.js`:
   ```javascript
   // initSectionReveal(); // Comment this line
   // initStickyCTA();     // Comment this line
   ```

3. **Option 3 - Boolean Flag**: Add this at the top of `script.js`:
   ```javascript
   const DISABLE_ANIMATIONS = true;
   ```
   Then wrap observer calls in conditionals.

### Design System Tokens
All design tokens are defined as CSS custom properties in `:root`:
- **Colors**: `--bg`, `--surface`, `--elevated`, `--text`, `--muted`, `--line`
- **Spacing**: `--space-xs` through `--space-3xl`
- **Radii**: `--radius-xs`, `--radius`, `--radius-lg`
- **Transitions**: `--transition`, `--transition-slow`

## 🔧 Features

### Responsive Design
- **Mobile-first** approach
- Breakpoints at 480px, 768px, and 1024px
- Fluid typography using `clamp()`
- Safe area insets support for mobile devices

### Accessibility
- **Semantic HTML** structure
- **Skip link** for keyboard navigation
- **ARIA attributes** for dynamic content
- **Focus management** with visible focus indicators
- **Reduced motion** support via `prefers-reduced-motion`

### Interactions
- **Inline CTA choice panel** (no modals)
- **Sticky CTA** appears after scrolling past hero
- **Section reveal animations** on scroll
- **Click-outside-to-close** functionality
- **Mobile app handoff** simulation

### Analytics Logging
All user interactions are logged to console:
- `hero_cta_click`
- `cta_choice_open`
- `cta_choice_click` (with DNI/CUIT type)
- `sticky_cta_click`
- `card_learn_more_click` (with card ID)
- `faq_open` (with FAQ ID)
- `handoff_app_opened`

## 🎨 Design System

### Color Palette (Dark Mode)
- **Background**: `#0b0b0b`
- **Surface**: `#121212`
- **Elevated**: `#181818`
- **Text**: `#f5f5f5`
- **Muted**: `#bdbdbd`
- **Lines**: `#2a2a2a`

### Typography
- **Font Stack**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI)
- **Fluid Sizing**: Responsive typography using clamp()
- **Line Heights**: Optimized for readability (1.1 for headings, 1.6 for body)

## 📱 Browser Support

- **Modern browsers** with ES6+ support
- **Graceful degradation** for older browsers
- **IntersectionObserver** with fallbacks
- **No external dependencies**

## 🔗 Important Notes

- **All links point to `#`** - this is a wireframe/prototype
- **No external assets** - completely self-contained
- **No network calls** - everything works offline
- **Gray placeholders** used instead of images
- **Console logging** for analytics events (check browser DevTools)

## 🐛 Troubleshooting

### Common Issues
1. **Animations not working**: Check if `prefers-reduced-motion` is enabled in your OS
2. **Sticky CTA not appearing**: Ensure you're scrolling past the hero section
3. **Choice panel not opening**: Check browser console for JavaScript errors
4. **Mobile features not showing**: Test on actual mobile device or use browser DevTools mobile simulation

### Browser Console
Open DevTools (F12) to see:
- Analytics event logging
- Any JavaScript errors
- Network requests (should be none)

---

**Built with ❤️ for Mercado Pago** - A dark mode wireframe showcasing modern web development practices.
