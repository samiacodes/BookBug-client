# 📚 BookBug - Modern Library Management System

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.9-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0.43-5A0EF8?style=flat&logo=daisyui&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-11.9.1-FFCA28?style=flat&logo=firebase&logoColor=black)

A modern, responsive library management web application built with React, Firebase, and a sleek UI powered by Tailwind CSS and DaisyUI. BookBug offers a seamless reading experience with features like book browsing, borrowing, user reviews, and more.

## ✨ Features

### 🔐 Authentication
- Email/password authentication with Firebase
- Social login (Google, GitHub)
- Protected routes for authenticated users
- Persistent authentication state with token management
- Secure password validation (8+ chars, uppercase, lowercase, special character)

### 📖 Book Management
- Browse books by category (Sci-Fi, Thriller, History, Drama)
- View detailed book information with cover images
- Real-time stock availability tracking
- Borrow and return books functionality
- Add new books to the library (authenticated users)
- Update book details and quantity

### 💬 Community Features
- User reviews and blog posts
- Dynamic content creation and viewing
- Authenticated users can create/edit reviews
- Visitors can view all reviews
- Responsive review cards with modern design

### 🎨 Modern UI/UX
- **60/30/10 Color Ratio Design**: Professional color distribution
  - Background: 60% (Slate tones)
  - Primary: 30% (Indigo)
  - Accent: 10% (Amber)
- Dark/Light mode toggle with localStorage persistence
- Smooth animations with Framer Motion
- Lottie animations for enhanced user experience
- Fully responsive design (mobile-first approach)
- Consistent 8px grid spacing system
- Inter font for body text, Playfair Display for headings

### 🛠️ Technical Features
- Server-side rendering ready
- Hot Module Replacement (HMR) for fast development
- RESTful API integration
- Protected routes with authentication middleware
- Toast notifications for user feedback
- Error handling and validation

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**
- A **Firebase account** (for authentication and database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bookbug-client.git
   cd bookbug-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

### Backend Setup

The backend server is required for full functionality. See the [BookBug-Server](https://github.com/yourusername/bookbug-server) repository for setup instructions.

## 📦 Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The optimized production build will be generated in the `dist` folder.

## 🧪 Linting

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## 📂 Project Structure

```
BookBug-Client/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, Lottie animations
│   ├── components/      # Reusable components
│   │   ├── BookCard.jsx
│   │   ├── Button.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── Footer.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── ...
│   ├── contexts/        # React Context (AuthContext)
│   ├── features/        # Feature-based modules
│   │   ├── auth/        # Login, Register
│   │   ├── pages/       # Page components
│   │   └── shared/      # Shared feature components
│   ├── firebase/        # Firebase configuration
│   ├── routes/          # Route definitions
│   ├── index.css        # Global styles and theme
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint configuration
└── README.md            # Project documentation
```

## 🎨 Design System

### Color Palette

**Light Mode:**
- Background: White, Slate-50, Slate-100
- Primary: Indigo-500
- Accent: Amber-500
- Text: Slate-900

**Dark Mode:**
- Background: Slate-900, Slate-800, Slate-700
- Primary: Indigo-400
- Accent: Amber-400
- Text: Slate-50

### Typography
- **Body**: Inter (300, 400, 500, 600, 700, 800)
- **Headings**: Playfair Display (700, 800, 900)

### Spacing
- 8px grid system: 4, 8, 12, 16, 24, 32px

## 🛣️ Available Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/` | Home page with featured books and categories | No |
| `/login` | User login | No |
| `/register` | User registration | No |
| `/all-books` | Browse all books | No |
| `/add-book` | Add new books | Yes |
| `/book/:id` | Book details | No |
| `/borrowed-books` | User's borrowed books | Yes |
| `/category/:name` | Books by category | No |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and design system
- Use the 60/30/10 color ratio (Background, Primary, Accent)
- Maintain component reusability and modularity
- Write clean, self-documenting code
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**MD Parvez Sarkar**
- GitHub: [@MDParvezsarkar](https://github.com/MDParvezsarkar)

## 🙏 Acknowledgments

- [React](https://react.dev/) - The library for web and native user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Tailwind CSS component library
- [Firebase](https://firebase.google.com/) - Backend-as-a-Service platform
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library
- [Lottie](https://lottiefiles.com/) - Lightweight, scalable animations

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Happy Reading! 📚✨**
