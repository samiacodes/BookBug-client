# BookBug Design System Guide

## 🎨 Color Palette (60/30/10 Ratio)

### Color Distribution Philosophy
Our design follows the professional **60/30/10 color rule**:
- **60% - Primary (Dominant)**: Backgrounds, base surfaces
- **30% - Secondary (Supporting)**: Main interactive elements, buttons, links
- **10% - Accent (Highlights)**: Call-to-action elements, highlights, badges

---

## 📊 Color Values

### Light Theme
```css
/* 60% - Backgrounds & Surfaces */
--background-primary: #FFFFFF (white)
--background-secondary: #F9FAFB (slate-50)
--background-tertiary: #F1F5F9 (slate-100)

/* 30% - Main Brand & Interactive */
--color-primary: #6366F1 (indigo-500)
--color-secondary: #4F46E5 (indigo-600)

/* 10% - Accent & Highlights */
--color-accent: #F59E0B (amber-500)

/* Text */
--text-primary: #0F172A (slate-900)
--text-secondary: rgba(15, 23, 42, 0.6)
```

### Dark Theme
```css
/* 60% - Backgrounds & Surfaces */
--background-primary: #0F172A (slate-900)
--background-secondary: #1E293B (slate-800)
--background-tertiary: #334155 (slate-700)

/* 30% - Main Brand & Interactive */
--color-primary: #818CF8 (indigo-400)
--color-secondary: #6366F1 (indigo-500)

/* 10% - Accent & Highlights */
--color-accent: #FBBF24 (amber-400)

/* Text */
--text-primary: #F8FAFC (slate-50)
--text-secondary: rgba(248, 250, 252, 0.6)
```

---

## 🎯 Design Tokens

### Border Radius
```css
--radius-sm: 0.5rem    /* 8px - Small elements */
--radius-md: 0.75rem   /* 12px - Default */
--radius-lg: 1rem      /* 16px - Cards, modals */
--radius-xl: 1.5rem    /* 24px - Hero sections */
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
```

### Spacing Scale
```
2xs: 0.25rem (4px)
xs:  0.5rem  (8px)
sm:  0.75rem (12px)
md:  1rem    (16px)
lg:  1.5rem  (24px)
xl:  2rem    (32px)
2xl: 3rem    (48px)
```

---

## 🧩 Component Classes

### Cards
```jsx
// Modern card with hover effect
<div className="card-modern">
  {/* Content */}
</div>

// Expands to:
// bg-base-100 rounded-xl shadow-md hover:shadow-xl 
// transition-all duration-300 border border-base-300
```

### Buttons
```jsx
// Primary action (30% - Secondary color)
<button className="btn btn-primary">Primary Action</button>

// Secondary action
<button className="btn btn-secondary">Secondary</button>

// Accent highlight (10% - Accent color)
<button className="btn btn-accent">Special Offer</button>

// Outline variant
<button className="btn btn-outline">Outline</button>

// Ghost variant
<button className="btn btn-ghost">Ghost</button>
```

### Forms
```jsx
// Modern input with focus states
<input className="input input-bordered rounded-lg 
                  focus:border-primary focus:ring-2 
                  focus:ring-primary/20 transition-all duration-200" />

// Select dropdown
<select className="select select-bordered rounded-lg 
                   focus:border-primary focus:ring-2 
                   focus:ring-primary/20 transition-all duration-200">
  <option>Choose</option>
</select>

// Textarea
<textarea className="textarea textarea-bordered rounded-lg 
                     focus:border-primary focus:ring-2 
                     focus:ring-primary/20 transition-all duration-200">
</textarea>
```

---

## 🌓 Theme Toggle Implementation

The theme system is fully functional with:
- Default: Light mode
- Persistent: Saves preference in localStorage
- Smooth transitions: 200ms ease

### Usage
```jsx
import ThemeToggle from './components/ThemeToggle';

// Add anywhere in your layout
<ThemeToggle />
```

### Manual Theme Change
```javascript
// Set theme programmatically
document.documentElement.setAttribute('data-theme', 'dark');
localStorage.setItem('theme', 'dark');
```

---

## 📐 Layout Guidelines

### Container Widths
```jsx
// Standard content container
<div className="max-w-7xl mx-auto px-4 lg:px-6">

// Narrow content (forms, articles)
<div className="max-w-2xl mx-auto px-4">

// Wide content (tables, grids)
<div className="max-w-screen-2xl mx-auto px-4">
```

### Grid Systems
```jsx
// Responsive book grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Category grid
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

// Form grid
<div className="grid grid-cols-2 gap-4">
```

---

## ✨ Animation & Transitions

### Hover Effects
```jsx
// Card hover
<div className="hover:-translate-y-1 transition-all duration-300">

// Scale hover
<div className="hover:scale-105 transition-transform duration-300">

// Shadow hover
<div className="hover:shadow-xl transition-shadow duration-300">
```

### Page Transitions (Framer Motion)
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>
```

---

## 🎨 Typography

### Font Stack
```css
/* Body Text */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Headings/Logo */
font-family: 'Playfair Display', serif;
```

### Text Styles
```jsx
// Headings
<h1 className="text-4xl font-bold text-base-content">
<h2 className="text-2xl font-bold text-base-content">
<h3 className="text-xl font-semibold text-base-content">

// Body text
<p className="text-base text-base-content">

// Muted text
<p className="text-base-content/70">

// Small text
<p className="text-sm text-base-content/60">
```

---

## 🚀 Quick Component Examples

### Modern Book Card
```jsx
<div className="card-modern overflow-hidden group hover:-translate-y-1">
  <figure className="overflow-hidden h-56 bg-base-200">
    <img src={book.image} 
         className="w-full h-full object-cover group-hover:scale-110 
                    transition-transform duration-500" />
  </figure>
  <div className="card-body p-5">
    <h3 className="text-xl font-bold">{book.name}</h3>
    <button className="btn btn-primary btn-sm rounded-lg">
      View Details
    </button>
  </div>
</div>
```

### Modal
```jsx
<div className="fixed inset-0 bg-black/60 backdrop-blur-sm 
                flex justify-center items-center z-50">
  <div className="bg-base-100 p-8 rounded-2xl shadow-2xl 
                  max-w-md border border-base-300">
    <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
    {/* Content */}
    <div className="flex gap-3">
      <button className="btn btn-primary rounded-lg">Confirm</button>
      <button className="btn btn-outline rounded-lg">Cancel</button>
    </div>
  </div>
</div>
```

### Alert/Notification
```jsx
<div className="alert alert-success rounded-lg shadow-sm">
  <span>Success message here!</span>
</div>

<div className="alert alert-error rounded-lg shadow-sm">
  <span>Error message here!</span>
</div>
```

---

## 📱 Responsive Design

### Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile-First Approach
```jsx
// Default: Mobile
// md: Tablet
// lg: Desktop

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
```

---

## 🎯 Best Practices

1. **Consistency**: Always use DaisyUI component classes
2. **Semantic Colors**: Use `btn-primary`, `btn-secondary`, `btn-accent` instead of arbitrary colors
3. **Spacing**: Use Tailwind spacing scale (p-4, m-6, gap-8)
4. **Transitions**: Add `transition-all duration-200` for smooth interactions
5. **Accessibility**: Maintain contrast ratios (WCAG AA)
6. **Dark Mode**: Test all components in both themes

---

## 🔧 Customization

To modify the design system, edit:
```
/src/index.css
```

The theme tokens are defined in CSS custom properties and automatically work with DaisyUI components.

---

## 📦 Installed Dependencies

- `tailwindcss` v4.1.9
- `daisyui` v5.0.43
- `react-icons` v5.5.0
- `framer-motion` v12.18.1

---

**Design Philosophy**: Modern, Clean, Professional, Accessible
**Target**: SaaS-level UI/UX
**Completion Time**: ~1-2 hours ✅
