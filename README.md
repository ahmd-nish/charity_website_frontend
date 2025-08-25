# 🏥 Charity Platform - Frontend

A comprehensive charity platform frontend built with React.js and Material-UI, connecting donors with individuals in need across Sri Lanka.

## 🌟 Features

### 👥 **Multi-Role System**
- **Donors**: Browse requests, make donations, track donation history
- **Needy Individuals**: Create charity requests, manage applications, communicate with donors
- **Administrators**: Manage users, approve requests, monitor platform analytics

### 🔐 **Authentication & Security**
- JWT-based authentication with automatic token refresh
- Role-based access control and route protection
- Secure password validation and user registration

### 💰 **Donation Management**
- Browse and filter charity requests by category and urgency
- Integrated payment processing (ready for Stripe/PayPal)
- Real-time donation tracking and receipt generation

### 📱 **Modern UI/UX**
- Responsive design with Material-UI components
- Intuitive navigation and user-friendly interfaces
- Real-time notifications and status updates

## 🛠️ **Technology Stack**

- **Frontend Framework**: React.js 18.3.1
- **UI Library**: Material-UI (MUI) 5.16.7
- **State Management**: Redux Toolkit 2.2.7
- **Routing**: React Router DOM 6.26.0
- **HTTP Client**: Axios 1.7.3
- **Form Handling**: Formik 2.4.6 with Yup validation
- **Authentication**: Firebase 10.12.5 (optional)
- **Development**: Create React App 5.0.1

## 🚀 **Quick Start**

### Prerequisites
- Node.js 16.0.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmd-nish/charity_website_frontend.git
   cd charity_website_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   REACT_APP_API_URL=http://localhost:8080/api
   REACT_APP_SOCKET_URL=http://localhost:8080
   REACT_APP_NAME=Charity Platform
   REACT_APP_VERSION=1.0.0
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```
   
   The application will be available at `http://localhost:3000`

## 📁 **Project Structure**

```
src/
├── components/          # Reusable UI components
│   ├── APITester/      # Development testing tools
│   ├── ProtectedRoute/ # Route protection
│   └── Sidebar/        # Navigation sidebar
├── containers/          # Container components
├── hooks/              # Custom React hooks
├── layouts/            # Layout components
│   └── Header/         # Main application header
├── pages/              # Page components
│   ├── AdminDashboard/ # Admin management interface
│   ├── DonorDashboard/ # Donor interface
│   ├── NeedyDashboard/ # Needy user interface
│   ├── Login/          # Authentication pages
│   └── Register/       # User registration
├── redux/              # State management
├── services/           # API integration
│   ├── api.js         # Axios configuration
│   └── apiService.js  # API methods
├── styles/             # Global styles
└── utils/              # Utility functions
```

## 🔧 **Available Scripts**

- `npm start` - Start development server
- `npm run build` - Build production bundle
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

## 🌐 **API Integration**

The frontend connects to the charity platform backend API:

- **Base URL**: Configured via `REACT_APP_API_URL`
- **Authentication**: JWT tokens with automatic refresh
- **Error Handling**: Centralized error management with user feedback

### Key API Services
- **Authentication API**: User login, registration, profile management
- **Requests API**: Charity request CRUD operations
- **Donations API**: Donation processing and history
- **Admin API**: User management and platform analytics

## 🧪 **Testing & Development**

### Development Tools
- **API Tester**: `/api-test` - Test backend connectivity
- **Quick Login**: `/quick-login` - Instant login with test users
- **Component Testing**: Built-in React Testing Library

### Test Users (Development)
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@charity.com | Admin123 |
| Donor | donor@charity.com | Donor123 |
| Needy | needy1@charity.com | Needy123 |

## 🚀 **Deployment**

### Production Build
```bash
npm run build
```

### Environment Variables (Production)
```env
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_NAME=Charity Platform
GENERATE_SOURCEMAP=false
```

### Deployment Options
- **Netlify**: Direct GitHub integration
- **Vercel**: Optimized for React applications
- **AWS S3 + CloudFront**: Scalable static hosting
- **Traditional Hosting**: Upload build folder contents

## 📱 **Browser Support**

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m '[ADD] - amazing new feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Format
```
[TYPE] - Brief description

TYPE: ADD, FIX, ENHANCE, REMOVE, REFACTOR, DOCS, TEST
Example: [ADD] - user authentication with JWT tokens
```

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 **Team**

- **Developer**: [Your Name]
- **Project**: Charity Platform Sri Lanka
- **Version**: 1.0.0

## 📞 **Support**

For support and questions:
- Create an issue in this repository
- Contact: [your-email@domain.com]

## 🔗 **Related Repositories**

- **Backend API**: [charity-platform-backend]
- **Mobile App**: [charity-platform-mobile] (coming soon)
- **Admin Panel**: [charity-platform-admin] (coming soon)

---

**Made with ❤️ for the Sri Lankan community**
