# 📚 Reusable Components Documentation

## 🎯 Overview

This document describes the reusable component system implemented for the BookBug application. All components follow the 60/30/10 color ratio, flat design principles, and maintain consistency across the entire website.

---

## 🧩 Component Library

### 1. **BookCard Component**

**Location:** `src/components/BookCard.jsx`

**Purpose:** Displays book information in a consistent, modern card layout

**Usage:**
```jsx
import BookCard from '../../components/BookCard';

// Basic usage
<BookCard book={bookObject} />

// With custom action button
<BookCard 
  book={bookObject}
  actionButton={
    <Link to={`/update-book/${book._id}`}>
      <Button variant="outline" size="sm" fullWidth>
        Update Book
      </Button>
    </Link>
  }
/>
```

**Props:**
- `book` (required): Object containing:
  - `_id`: String - Book ID
  - `name`: String - Book title
  - `author`: String - Author name
  - `category`: String - Book category
  - `image`: String - Image URL
  - `quantity`: Number (optional) - Stock quantity
  - `rating`: Number (optional) - Rating 1-5
- `actionButton` (optional): React node - Custom action button

**Features:**
- ✅ Consistent image sizing with `object-contain`
- ✅ Hover animation (lift + image zoom)
- ✅ Visual star rating display
- ✅ Color-coded stock badge
- ✅ Min-height for title consistency
- ✅ Responsive on all devices

**Design Specs:**
- Image height: 224px (h-56)
- Padding: 20px (p-5)
- Border radius: 12px (rounded-xl)
- Shadow: md → xl on hover
- Spacing: 16px between elements (space-y-4)

---

### 2. **Button Component**

**Location:** `src/components/Button.jsx`

**Purpose:** Unified button component for consistent styling across the app

**Usage:**
```jsx
import Button from '../../components/Button';

// Primary button
<Button variant="primary">Click Me</Button>

// Outline button
<Button variant="outline" size="sm">Small Outline</Button>

// Full width button
<Button variant="primary" fullWidth>Submit</Button>

// Loading state
<Button variant="primary" loading>Processing...</Button>

// Submit button in form
<Button type="submit" variant="primary" fullWidth>
  Register
</Button>
```

**Props:**
- `children` (required): Button content
- `variant`: String - "primary" | "secondary" | "accent" | "outline" | "ghost" | "error"
  - Default: "primary"
- `size`: String - "sm" | "md" | "lg"
  - Default: "md"
- `fullWidth`: Boolean - Makes button 100% width
  - Default: false
- `disabled`: Boolean - Disables button
  - Default: false
- `loading`: Boolean - Shows loading spinner
  - Default: false
- `onClick`: Function - Click handler
- `type`: String - "button" | "submit" | "reset"
  - Default: "button"
- `className`: String - Additional custom classes

**Variants:**

**Primary** (30% - Main Actions)
```jsx
<Button variant="primary">Primary Action</Button>
```
- Color: Indigo-500/400
- Use for: Main CTAs, form submissions, important actions

**Secondary**
```jsx
<Button variant="secondary">Secondary Action</Button>
```
- Use for: Supporting actions

**Accent** (10% - Highlights)
```jsx
<Button variant="accent">Special Offer</Button>
```
- Color: Amber-500/400
- Use for: Promotional actions, special features

**Outline**
```jsx
<Button variant="outline">Outline Action</Button>
```
- Use for: Secondary actions, cancel buttons

**Ghost**
```jsx
<Button variant="ghost">Ghost Action</Button>
```
- Use for: Table actions, subtle interactions

**Error**
```jsx
<Button variant="error">Delete</Button>
```
- Use for: Destructive actions, logout

**Features:**
- ✅ Automatic loading state with spinner
- ✅ Consistent hover effects (scale + shadow)
- ✅ Disabled state handling
- ✅ Fully accessible
- ✅ Theme-aware colors

---

## 📁 Component Structure

```
src/
├── components/
│   ├── BookCard.jsx         # Reusable book display card
│   ├── Button.jsx           # Unified button component
│   ├── BorrowModal.jsx      # Uses Button component
│   ├── ThemeToggle.jsx      # Theme switcher
│   ├── Title.jsx            # Heading component
│   └── ...
├── features/
│   ├── auth/
│   │   ├── Login.jsx        # Uses Button component
│   │   └── Register.jsx     # Uses Button component
│   ├── pages/
│   │   ├── AllBooks.jsx     # Uses BookCard & Button
│   │   ├── Home.jsx         # Uses BookCard
│   │   ├── CategoryBooks.jsx # Uses BookCard
│   │   ├── BookDetails.jsx  # Uses Button
│   │   ├── BorrowedBooks.jsx # Uses Button
│   │   ├── AddBook.jsx      # Uses Button
│   │   └── UpdateBook.jsx   # Uses Button
│   └── shared/
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       └── ...
```

---

## 🎨 Design System Consistency

### Color Usage (60/30/10 Ratio)

**60% - Backgrounds**
```jsx
bg-base-100  // Card backgrounds
bg-base-200  // Page backgrounds, sections
bg-base-300  // Borders, dividers
```

**30% - Interactive Elements**
```jsx
btn-primary        // Main action buttons
text-primary       // Primary text, links
badge-primary      // Category badges
```

**10% - Accents**
```jsx
btn-accent         // Special buttons
text-accent        // Star ratings, highlights
badge-accent       // Important markers
```

---

## 🔘 Button Usage Guidelines

### When to Use Each Variant

**Primary** - Main Actions
- Form submissions (Login, Register, Add Book)
- Primary CTAs (Borrow Book, Confirm)
- Important actions that advance user workflow

**Outline** - Secondary Actions
- Update/Edit actions
- Alternative choices
- Non-primary form actions

**Ghost** - Subtle Actions
- Table row actions
- Inline actions
- Non-intrusive interactions

**Accent** - Special Actions
- Promotional features
- Limited-time offers
- Call-out actions

**Error** - Destructive Actions
- Delete operations
- Logout
- Irreversible actions

---

## 📱 Responsive Behavior

### BookCard
- **Mobile (< 640px)**: 1 column
- **Tablet (640-1024px)**: 2 columns
- **Desktop (> 1024px)**: 3-4 columns
- **Image**: Always centered, no distortion

### Button
- **Small screens**: Full width when `fullWidth={true}`
- **Large screens**: Auto width unless specified
- **Touch targets**: Minimum 44x44px for accessibility

---

## ✨ Component Features

### BookCard Features
✅ Consistent card dimensions across the site
✅ Hover animations (lift card, zoom image)
✅ Visual star ratings
✅ Stock availability badges
✅ Truncated long titles (2 lines max)
✅ Object-contain for images (no distortion)
✅ Customizable action buttons
✅ PropTypes validation

### Button Features
✅ Loading states with spinner
✅ Disabled state handling
✅ Consistent hover effects
✅ Theme-aware colors
✅ Size variants (sm, md, lg)
✅ Full width option
✅ Type-safe with PropTypes
✅ Accessible markup

---

## 🔄 Migration Guide

### Before (Inconsistent)
```jsx
// Old way - different everywhere
<button className="btn btn-sm bg-green-600 text-white w-full mt-2">
  Details
</button>

<button className="btn bg-blue-600 text-white">
  {loading ? "Borrowing..." : "Confirm Borrow"}
</button>

<div className="bg-white shadow-md p-4 rounded hover:shadow-xl">
  <img src={book.image} className="w-full h-52 object-cover rounded" />
  <h3>{book.title}</h3>
</div>
```

### After (Consistent)
```jsx
// New way - reusable components
<Button variant="primary" size="sm" fullWidth>
  View Details
</Button>

<Button variant="primary" loading={loading}>
  Confirm Borrow
</Button>

<BookCard book={book} />
```

---

## 🎯 Benefits

### Code Quality
- ✅ **DRY Principle**: No code duplication
- ✅ **Maintainability**: Single source of truth
- ✅ **Consistency**: Same look everywhere
- ✅ **Type Safety**: PropTypes validation

### Development Speed
- ✅ **Faster Development**: Reuse instead of recreate
- ✅ **Less Bugs**: Tested components
- ✅ **Easy Updates**: Change once, apply everywhere

### User Experience
- ✅ **Consistency**: Predictable interface
- ✅ **Professional**: Polished appearance
- ✅ **Accessibility**: Built-in ARIA attributes
- ✅ **Performance**: Optimized components

---

## 📝 Best Practices

### 1. Always Use Reusable Components
```jsx
// ❌ DON'T: Create custom buttons
<button className="btn btn-primary w-full">Submit</button>

// ✅ DO: Use Button component
<Button variant="primary" fullWidth>Submit</Button>
```

### 2. Use BookCard for All Book Displays
```jsx
// ❌ DON'T: Create custom card markup
<div className="card">
  <img src={book.image} />
  <h3>{book.name}</h3>
</div>

// ✅ DO: Use BookCard component
<BookCard book={book} />
```

### 3. Customize Only When Necessary
```jsx
// ✅ Good: Use actionButton prop for custom actions
<BookCard 
  book={book}
  actionButton={<CustomButton />}
/>
```

### 4. Follow Variant Guidelines
```jsx
// ✅ Good: Semantic variant usage
<Button variant="primary">Save</Button>      // Main action
<Button variant="outline">Cancel</Button>    // Secondary
<Button variant="error">Delete</Button>      // Destructive
```

---

## 🚀 Quick Reference

### Import Statements
```jsx
import BookCard from '../../components/BookCard';
import Button from '../../components/Button';
```

### Common Patterns
```jsx
// Book list display
{books.map(book => (
  <BookCard key={book._id} book={book} />
))}

// Form submission
<Button type="submit" variant="primary" fullWidth>
  Submit Form
</Button>

// Loading state
<Button variant="primary" loading={isLoading}>
  Save Changes
</Button>

// Custom action in BookCard
<BookCard 
  book={book}
  actionButton={
    <Link to={`/update/${book._id}`}>
      <Button variant="outline" size="sm" fullWidth>
        Edit
      </Button>
    </Link>
  }
/>
```

---

## 📊 Component Adoption

### Pages Using BookCard
- ✅ Home
- ✅ All Books
- ✅ Category Books

### Pages Using Button
- ✅ Login
- ✅ Register
- ✅ All Books
- ✅ Add Book
- ✅ Update Book
- ✅ Book Details
- ✅ Borrowed Books
- ✅ Borrow Modal

---

**Last Updated:** Current Implementation
**Maintained By:** BookBug Development Team
**Status:** ✅ Production Ready
