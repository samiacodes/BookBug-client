# BookBug - Library Management System

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.9-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0.43-5A0EF8?style=flat&logo=daisyui&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-11.9.1-FFCA28?style=flat&logo=firebase&logoColor=black)

A modern, responsive library management web application built with React, Firebase, and Tailwind CSS. BookBug provides a seamless experience for browsing books, managing borrowing, and sharing community reviews.

## Features

### Authentication
- Email/password and social login (Google, GitHub) via Firebase
- Protected routes for authenticated users
- Secure password validation and token management

### Book Management
- Browse books by category (Sci-Fi, Thriller, History, Drama)
- View detailed book information with cover images
- Real-time stock availability tracking
- Borrow and return books
- Add and update books (authenticated users only)

### Community Features
- User reviews and blog posts
- Create, edit, and delete reviews (authenticated users)
- View all community reviews and ratings
- Interactive star rating system

### Design
- 60/30/10 color ratio for professional aesthetics
- Dark/Light mode toggle with localStorage persistence
- Fully responsive design (mobile-first approach)
- Smooth animations with Framer Motion
- Consistent 8px grid spacing system

### Technical Features
- Hot Module Replacement (HMR) for fast development
- RESTful API integration
- Toast notifications for user feedback
- Comprehensive error handling and validation

### Advanced Voice Search

BookBug features an enhanced voice search system that allows users to:
- Search for books by speaking their names or keywords
- Navigate to different pages using voice commands
- Receive real-time feedback and responses
- Get dynamic guidance through rotating hints
- Experience direct navigation to book details for exact matches

#### Voice Commands
Users can speak any of these commands:
- Navigation: "Go to home", "All books", "Add book", "Profile", "Login", "Register"
- Search: "Search for [book name]", "Find [keyword]", or simply say a book name
- Help: "Help" or "What can I say"

When a user says an exact book name, they are immediately navigated to the book's detail page. For partial matches or general searches, they are taken to the search results page.

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm
- Git
- Firebase account

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/bookbug-client.git
   cd bookbug-client
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

### Backend Setup

The backend server is required for full functionality. Refer to the BookBug-Server repository for setup instructions.

## Usage

### Build for Production
```bash
npm run build
```

### Run Linting
```bash
npm run lint
```

## Project Structure

```
BookBug-Client/
├── src/
│   ├── components/      # Reusable components
│   ├── contexts/        # React Context (AuthContext)
│   ├── features/        # Feature-based modules
│   ├── firebase/        # Firebase configuration
│   ├── routes/          # Route definitions
│   └── index.css        # Global styles and theme
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Available Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| / | Home page with featured books | No |
| /login | User login | No |
| /register | User registration | No |
| /all-books | Browse all books | No |
| /add-book | Add new books | Yes |
| /book/:id | Book details | No |
| /borrowed-books | User's borrowed books | Yes |
| /category/:name | Books by category | No |

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style, maintains the 60/30/10 color ratio, and includes proper documentation.

## License

This project is licensed under the MIT License.

## Author

**Samia Islam Lamia**
- GitHub: [@samiacodes](https://github.com/samiacodes)

## Acknowledgments

- React - UI library
- Vite - Build tool
- Tailwind CSS - Utility-first CSS framework
- DaisyUI - Component library
- Firebase - Backend services
- Framer Motion - Animation library