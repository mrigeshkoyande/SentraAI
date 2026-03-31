# SentraAI - Visitor Management & Access Control System

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A comprehensive, enterprise-grade **visitor management and access control system** with AI-powered analytics, real-time alerts, and role-based access management. SentraAI streamlines visitor tracking, security approvals, and administrative operations for residential complexes, corporate offices, and secure facilities.

---

## 🎯 Overview

SentraAI is a full-stack application designed to:
- **Manage visitor entries** with detailed logging
- **Control access** through an approval-based system
- **Send alerts** for unauthorized or suspicious activities
- **Provide analytics** with AI-powered insights
- **Support multiple roles** (Admin, Guard, Resident)
- **Maintain security logs** for audit and compliance

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI framework
- **Vite 4.3** - Build tool & dev server
- **Lucide React** - Icon library
- **React Router DOM 6.30** - Client-side routing
- **Axios 1.4** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18** - Web framework
- **CORS 2.8** - Cross-origin resource handling
- **Dotenv 16** - Environment variables
- **Axios 1.4** - HTTP client

---

## 📁 Project Structure

```
SentraAI/
├── client/                          # React Frontend Application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Header.jsx/.css      # Navigation header
│   │   │   └── Sidebar.jsx/.css     # Sidebar navigation
│   │   ├── pages/                   # Page components
│   │   │   ├── Login.jsx/.css       # Authentication page
│   │   │   ├── Dashboard.jsx/.css   # Main dashboard
│   │   │   ├── Admin.jsx/.css       # Admin panel
│   │   │   ├── VisitorEntry.jsx/.css # Visitor registration
│   │   │   ├── Approval.jsx/.css    # Approval workflow
│   │   │   ├── Alerts.jsx/.css      # Alert management
│   │   │   └── Logs.jsx/.css        # Activity logs
│   │   ├── data/
│   │   │   └── mockData.js          # Mock data for development
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   └── package.json                 # Frontend dependencies
│
├── server/                          # Express.js Backend
│   ├── index.js                     # Main server file with API routes
│   └── package.json                 # Backend dependencies
│
└── README.md                        # Project documentation
```

---

## ✨ Features

### 🚪 Visitor Management
- Register and log visitor entries
- Capture visitor information (name, contact, purpose)
- Track entry and exit times
- Generate visitor reports

### 🔐 Access Control
- Role-based access management (Admin, Guard, Resident)
- Approval workflow for visitor entry
- Blacklist management for restricted individuals
- Entry/exit gate control integration

### 🚨 Alerts & Notifications
- Real-time alert system
- Suspicious activity detection
- Unauthorized access warnings
- Email/SMS notification support

### 📊 Analytics & Reporting
- AI-powered analytics dashboard
- Visitor statistics and trends
- Peak hour analysis
- Security incident reports
- Activity logging and audit trails

### 👥 User Management
- Admin dashboard for system management
- Guard interface for visitor verification
- Resident portal for approvals
- User role and permission management

### 📝 Comprehensive Logging
- All activities are logged
- Audit trail for compliance
- Searchable activity logs
- Export reports functionality

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v14 or higher
- **npm** v6+ or **yarn** v1.22+
- **Git** for version control
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd SentraAI
   ```

2. **Setup Backend Server**
   ```bash
   cd server
   npm install
   ```

3. **Setup Frontend Client**
   ```bash
   cd client
   npm install
   ```

### Environment Configuration

Create a `.env` file in the `server/` directory:
```env
PORT=5001
NODE_ENV=development
# Add additional environment variables as needed
```

---

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm start
```
Server runs on: `http://localhost:5001`

**Terminal 2 - Start Frontend Development Server:**
```bash
cd client
npm run dev
```
Client runs on: `http://localhost:5173`

### Development Features
- **Hot Module Replacement (HMR)** - Instant code refresh
- **API Health Check** - Health endpoint: `/api/health`
- **Mock Data** - Pre-configured demo data for testing

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
npm run preview  # Preview production build locally
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Visitors
- `GET /api/visitors` - Get all visitors
- `POST /api/visitors` - Create new visitor entry
- `PUT /api/visitors/:id` - Update visitor details
- `DELETE /api/visitors/:id` - Delete visitor record

### Approvals
- `GET /api/approvals` - Get pending approvals
- `POST /api/approvals/:id/approve` - Approve visitor access
- `POST /api/approvals/:id/reject` - Reject visitor access

### Alerts
- `GET /api/alerts` - Get all alerts
- `POST /api/alerts` - Create new alert
- `PUT /api/alerts/:id` - Update alert status

### Logs
- `GET /api/logs` - Get activity logs
- `GET /api/logs/:userId` - Get user-specific logs

### System
- `GET /api/health` - Server health check

---

## 👥 User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access, user management, settings |
| **Guard** | Verify visitors, create entries, approve/reject access |
| **Resident** | Approve visitor requests, view alerts |

---

## 🔧 Development Guidelines

### Code Structure
- Components in separate files with `.jsx` extension
- Styles in corresponding `.css` files
- Mock data in `src/data/mockData.js`
- API calls use Axios with centralized configuration

### Naming Conventions
- Components: PascalCase (e.g., `Header.jsx`)
- Functions: camelCase (e.g., `handleSubmit()`)
- CSS Classes: kebab-case (e.g., `.header-container`)
- Files: Match component names

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to repository
git push origin feature/your-feature-name
```

---

## 📦 Building for Production

```bash
# Build frontend
cd client
npm run build

# Output will be in client/dist/

# Build backend is ready as-is (Node.js)
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env or use different port
PORT=5002 npm start
```

### CORS Issues
Ensure backend CORS is configured correctly in `server/index.js`

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentation

- API Documentation: See API Endpoints section above
- Component Documentation: Comments in respective component files
- Setup Guide: See Getting Started section

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author & Support

**Project:** SentraAI v1.0.0  
**Created:** 2024-2026

For issues, suggestions, or support:
- Open an issue on GitHub
- Contact the development team

---

## 🔮 Future Enhancements

- [ ] Real-time notifications using WebSockets
- [ ] Machine learning for visitor pattern analysis
- [ ] Integration with CCTV systems
- [ ] Mobile app (React Native)
- [ ] Advanced reporting dashboard
- [ ] Multi-property support
- [ ] Integration with door lock systems
- [ ] Facial recognition capabilities

---

**Last Updated:** March 31, 2026
