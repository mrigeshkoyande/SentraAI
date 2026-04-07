# SentraAI — Intelligent Visitor Security System

> **Enterprise-grade visitor management and access control platform** with AI-powered analytics, real-time alerts, and a fully isolated role-based portal architecture designed for residential complexes, corporate offices, and secure facilities.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)
![Node](https://img.shields.io/badge/node-v14+-brightgreen.svg?style=flat-square)
![React](https://img.shields.io/badge/react-18.2-61DAFB.svg?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Role-Based Access Control](#role-based-access-control)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

SentraAI is a comprehensive **full-stack visitor management system** that revolutionizes how organizations handle visitor tracking, security approvals, and administrative operations. The platform employs a **Route-Based Separated Architecture** where each user role (Admin, Guard, Resident) operates within its own dedicated portal with isolated URLs, authentication flows, and user interfaces—ensuring zero cross-role UI contamination and maximum security boundaries.

### Problem Statement
Traditional visitor management relies on manual logbooks, delayed approvals, and minimal audit trails. SentraAI eliminates these inefficiencies with:
- ✅ Real-time visitor validation and approval workflows
- ✅ Automated alert systems for suspicious activities
- ✅ Comprehensive audit logs and analytics dashboards
- ✅ Multi-channel notifications (email, SMS, in-app)
- ✅ Mobile-first design for on-the-go guards

---

## ⭐ Key Features

### For Administrators
- **Dashboard Analytics** - Real-time metrics on visitors, approvals, and security events
- **User Management** - Create and manage Guard and Resident accounts
- **System Configuration** - Customize approval workflows and notification settings
- **Audit Logs** - Complete activity history with timestamps and user attribution
- **Alert Management** - Configure and monitor security alerts system-wide
- **Photo Gallery** - Visitor photo database with AI-powered tagging (future)

### For Guards
- **Visitor Check-In** - Rapid visitor registration and ID verification
- **Mobile Navigation** - Fully responsive mobile-first interface
- **QR Code Generation** - Generate and scan visitor passes for touchless entry
- **Real-Time Alerts** - Instant notifications of flagged visitors or security events
- **Approval Inbox** - Pending approvals with context and quick actions
- **Contact Residents** - Direct communication modal for immediate verification

### For Residents
- **Approval Dashboard** - Manage visitor approvals from home
- **Visitor History** - View all historical visits and approved guests
- **Settings Control** - Manage notification preferences and security settings
- **Guest Passes** - Generate pre-approved passes for frequent visitors
- **Activity Feed** - Real-time notifications of visitor arrivals

---

## 🛠️ Tech Stack

### Frontend
| Component | Technology | Version |
|---|---|---|
| Framework | React | 18.2 |
| Build Tool | Vite | 4.3 |
| Routing | React Router DOM | 6.30 |
| UI Icons | Lucide React | 1.7 |
| HTTP Client | Axios | 1.4 |
| Authentication | Firebase SDK | 12.11 |
| Database Client | Supabase Client | 2.101 |
| Styling | Vanilla CSS3 | Native |

### Backend
| Component | Technology | Version |
|---|---|---|
| Runtime | Node.js | 14+ |
| Framework | Express.js | 4.18 |
| Authentication | Firebase Admin | 13.7 |
| JWT Token | jsonwebtoken | 9.0 |
| Database | Supabase (PostgreSQL) | 2.101 |
| File Upload | Multer | 2.1 |
| CORS | express-cors | 2.8 |
| Environment | dotenv | 16.0 |

### Database
- **Type**: PostgreSQL (via Supabase)
- **ORM**: Raw SQL queries
- **Real-time**: Supabase real-time subscriptions
- **Storage**: Supabase Storage for photo upload

### Authentication & Authorization
- **Firebase Authentication** (Google OAuth, Email/Password)
- **JWT Tokens** for API security
- **Role-Based Access Control (RBAC)** - Admin, Guard, Resident roles

---

## 🏗️ Architecture

### Route-Based Separated Portal Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SentraAI Platform                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  /admin/*          │  /guard/*          │  /resident/*      │
│  ┌──────────────┐  │  ┌──────────────┐  │  ┌──────────────┐ │
│  │   Admin      │  │  │    Guard     │  │  │  Resident    │ │
│  │  Portal      │  │  │   Portal     │  │  │   Portal     │ │
│  │              │  │  │              │  │  │              │ │
│  │ • Dashboard  │  │  │ • Check-In   │  │  │ • Approvals  │ │
│  │ • Analytics  │  │  │ • QR Codes   │  │  │ • History    │ │
│  │ • Users      │  │  │ • Alerts     │  │  │ • Settings   │ │
│  │ • Logs       │  │  │ • Mobile Nav │  │  │ • Passes     │ │
│  └──────────────┘  │  └──────────────┘  │  └──────────────┘ │
│                    │                    │                    │
├─────────────────────────────────────────────────────────────┤
│              Role Gateway (/)                                │
│         [Login Portal Selector]                              │
├─────────────────────────────────────────────────────────────┤
│                  Shared Backend API                          │
│         (Express.js - /api/*)                                │
├─────────────────────────────────────────────────────────────┤
│            Supabase PostgreSQL Database                      │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow
```
Visitor Arrival
    ↓
Guard Check-in (VisitorEntry)
    ↓
System sends notifications to Resident
    ↓
Resident approves/denies (ResidentApproval)
    ↓
Guard scans approval (QR Pass)
    ↓
Audit log recorded
```

---

## 📁 Project Structure

```
SentraAI/
├── 📄 README.md                     # Project documentation
├── 📄 CONTRIBUTING.md               # Contribution guidelines
├── 📄 LICENSE                       # MIT License
├── 📄 CHANGELOG.md                  # Version history
│
├── 📁 client/                       # React Frontend (Vite)
│   ├── 📁 src/
│   │   ├── 📁 components/           # Reusable React components
│   │   │   ├── Header.jsx/.css      # Navigation header
│   │   │   ├── Sidebar.jsx/.css     # Role-aware navigation sidebar
│   │   │   ├── GuardMobileNav.jsx/.css # Mobile navigation (Guard)
│   │   │   ├── VisitorPass.jsx/.css # QR code visitor pass
│   │   │   ├── ContactGuard.jsx/.css # Resident-to-Guard messaging
│   │   │   ├── NotificationPanel.jsx/.css # Real-time alerts
│   │   │   └── ProtectedRoute.jsx   # Route protection wrapper
│   │   │
│   │   ├── 📁 pages/                # Page-level components
│   │   │   ├── RoleGateway.jsx/.css # Landing page / role selector
│   │   │   ├── Dashboard.jsx/.css   # Main dashboard (role-shared)
│   │   │   ├── VisitorEntry.jsx/.css # Visitor check-in form
│   │   │   ├── Approval.jsx/.css    # Approval workflow
│   │   │   ├── Alerts.jsx/.css      # Alert management
│   │   │   ├── Logs.jsx/.css        # Activity audit logs
│   │   │   ├── Analytics.jsx/.css   # Analytics dashboard (Admin)
│   │   │   ├── Admin.jsx/.css       # Admin panel (Admin)
│   │   │   ├── Settings.jsx/.css    # User settings
│   │   │   ├── About.jsx/.css       # About page
│   │   │   │
│   │   │   ├── 📁 admin/
│   │   │   │   ├── AdminLogin.jsx/.css    # Admin login (/admin/login)
│   │   │   │   └── AdminLayout.jsx        # Admin portal shell
│   │   │   │
│   │   │   ├── 📁 guard/
│   │   │   │   ├── GuardLogin.jsx/.css    # Guard login (/guard/login)
│   │   │   │   └── GuardLayout.jsx        # Guard portal shell
│   │   │   │
│   │   │   └── 📁 resident/
│   │   │       ├── ResidentLogin.jsx/.css # Resident login (/resident/login)
│   │   │       ├── ResidentLayout.jsx     # Resident portal shell
│   │   │       ├── ResidentDashboard.jsx  # Resident dashboard
│   │   │       └── ResidentApproval.jsx   # Approval management
│   │   │
│   │   ├── 📁 config/               # External service configs
│   │   │   ├── firebaseConfig.js    # Firebase initialization
│   │   │   └── supabaseClient.js    # Supabase database client
│   │   │
│   │   ├── 📁 context/              # React Context
│   │   │   └── AuthContext.jsx      # Global auth state & methods
│   │   │
│   │   ├── 📁 hooks/                # Custom React Hooks
│   │   │   ├── useApi.js            # API request wrapper
│   │   │   ├── useNotifications.js  # Notification management
│   │   │   ├── usePolling.js        # Real-time data polling
│   │   │   └── useTheme.js          # Theme switching
│   │   │
│   │   ├── 📁 data/                 # Mock/Static data
│   │   │   └── mockData.js          # Test data generators
│   │   │
│   │   ├── App.jsx                  # Root router configuration
│   │   ├── main.jsx                 # React entry point
│   │   ├── App.css                  # Global app styles
│   │   └── index.css                # Design system tokens
│   │
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   ├── package.json                 # Dependencies
│   └── package-lock.json            # Lock file
│
├── 📁 server/                       # Node.js/Express Backend
│   ├── index.js                     # Server entry point & routing
│   │
│   ├── 📁 middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   │
│   ├── 📁 routes/
│   │   ├── auth.js                  # Auth endpoints (/api/auth/*)
│   │   ├── admin.js                 # Admin endpoints (/api/admin/*)
│   │   ├── visitors.js              # Visitor endpoints (/api/visitors/*)
│   │   ├── approvals.js             # Approval endpoints (/api/approvals/*)
│   │   ├── alerts.js                # Alert endpoints (/api/alerts/*)
│   │   ├── notifications.js         # Notification endpoints
│   │   ├── otps.js                  # OTP endpoints (/api/otps/*)
│   │   └── photos.js                # Photo upload endpoints
│   │
│   ├── 📁 services/
│   │   ├── notificationService.js   # Email/SMS notifications
│   │   ├── authService.js           # Authentication logic
│   │   └── emailService.js          # Email sending service
│   │
│   ├── package.json                 # Dependencies
│   ├── package-lock.json            # Lock file
│   └── .env.example                 # Environment template
│
├── 📁 supabase/                     # Database migrations
│   ├── schema.sql                   # Main database schema
│   ├── seed.sql                     # Sample data
│   └── migration_add_visitor_id.sql # Version-controlled migrations
│
└── .gitignore                       # Git ignore rules
```

---

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** - v14 or higher ([Download](https://nodejs.org/))
- **npm** or **Yarn** - v6+ / v1.22+ (comes with Node.js)
- **Git** - For version control ([Download](https://git-scm.com/))
- **A Code Editor** - VS Code recommended ([Download](https://code.visualstudio.com/))
- **Modern Browser** - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Optional
- **Postman** - For API testing ([Download](https://www.postman.com/))
- **PostgreSQL Client** - For database management

---

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/SentraAI.git
cd SentraAI
```

### Step 2: Backend Setup

```bash
cd server
npm install
```

### Step 3: Frontend Setup

```bash
cd ../client
npm install
```

**3. Install frontend dependencies**
```bash
cd client
npm install
```

**4. Configure environment**

Create a `.env` file in the `server/` directory:
```env
PORT=5001
NODE_ENV=development
```

### Running the Application

**Terminal 1 — Backend:**
```bash
cd server
npm start
# Runs on http://localhost:5001
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# Runs on http://localhost:3000
```

---

## 🌐 Route Architecture

SentraAI uses a **Route-Based Separated Architecture**. Each role has strict domain isolation — they share zero login UI and zero layout UI.

### Role Portals

| Role | Login URL | Dashboard URL | Accent Color | Theme |
|---|---|---|---|---|
| **Admin** | `/admin/login` | `/admin/dashboard` | Purple `#8b5cf6` | Command Center |
| **Guard** | `/guard/login` | `/guard/dashboard` | Cyan `#22d3ee` | Guard Station |
| **Resident** | `/resident/login` | `/resident/dashboard` | Green `#34d399` | Resident Portal |

### Landing Page

Visiting `/` shows the **Role Gateway** — a portal selection page with three role cards. Clicking a card navigates to that role's login page.

### Full Route Map

```
/                          Role Gateway (portal selector)

/admin/login               Admin Login
/admin/dashboard           Admin Dashboard
/admin/visitors            Visitor Entry (Admin)
/admin/approval            Approvals (Admin)
/admin/logs                Visitor Logs (Admin)
/admin/alerts              Alerts (Admin)
/admin/analytics           Analytics (Admin)
/admin/admin-panel         Admin Panel
/admin/settings            Settings (Admin)
/admin/about               About (Admin)

/guard/login               Guard Login
/guard/dashboard           Guard Dashboard
/guard/visitors            Visitor Entry (Guard)
/guard/approval            Approvals (Guard)
/guard/logs                Visitor Logs (Guard)
/guard/alerts              Alerts (Guard)
/guard/settings            Settings (Guard)
/guard/about               About (Guard)

/resident/login            Resident Login
/resident/dashboard        Resident Dashboard
/resident/approval         Approvals (Resident)
/resident/alerts           Alerts (Resident)
/resident/settings         Settings (Resident)
/resident/about            About (Resident)

/*                         → Redirects to /
```

> **Access Control:** Visiting a protected route without logging in automatically redirects to that role's login page. After login, revisiting a login page redirects to the dashboard.

---

## 👥 User Roles & Permissions

| Feature | Admin | Guard | Resident |
|---|---|---|---|
| Dashboard | ✅ | ✅ | ✅ |
| Visitor Entry | ✅ | ✅ | ❌ |
| Approvals | ✅ | ✅ | ✅ |
| Visitor Logs | ✅ | ✅ | ❌ |
| Alerts | ✅ | ✅ | ✅ |
| Analytics | ✅ | ❌ | ❌ |
| Admin Panel | ✅ | ❌ | ❌ |
| Settings | ✅ | ✅ | ✅ |
| About | ✅ | ✅ | ✅ |

---

## ✨ Features

### 🚪 Visitor Management
- Register and log visitor entries
- Capture visitor info: name, contact, purpose, unit
- Track entry and exit times
- Visitor pass generation with QR codes
- OTP-based resident notifications

### 🔐 Access Control
- Role-based isolated portals (Admin / Guard / Resident)
- Approval workflow for visitor entry
- Blacklist management for restricted individuals
- Entry approval and denial with reason
- Resident contact guard functionality

### 🚨 Alerts & Notifications
- Real-time alert feed with severity levels (critical / high / medium / low)
- Suspicious activity detection
- Emergency alert trigger
- Resolved/unread alert tracking

### 🤖 AI Simulation
- Face verification with match confidence scoring
- AI-powered trust score calculation per visitor
- Anomaly detection (face mismatch, suspicious timing, blacklist)
- Risk distribution analytics

### 📊 Analytics Dashboard
- Today's visitor count and trends
- Active alerts and pending approvals
- Risk level distribution (Low / Medium / High)
- Hourly traffic chart
- Recent activity feed
- Advanced analytics insights (Admin only)

### 📝 Logging
- Full entry/exit history
- Searchable activity log
- Filterable by status, risk level, and date

### ⚙️ Settings & Customization
- Role-specific settings and preferences
- Theme customization
- Application configuration

### ℹ️ About & Documentation
- Application information and version
- Feature documentation
- System guidelines

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Login (accepts any credentials in demo mode) |

### Visitors
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/visitors` | Get all visitors (supports `?status`, `?risk`, `?search`, `?page`, `?limit`) |
| `POST` | `/api/visitors` | Register new visitor (triggers AI verification) |
| `PUT` | `/api/visitors/:id/approve` | Approve a visitor |
| `PUT` | `/api/visitors/:id/deny` | Deny a visitor |
| `PUT` | `/api/visitors/:id/exit` | Record visitor exit |

### OTP
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/otp/send` | Send OTP to resident |
| `POST` | `/api/otp/verify` | Verify OTP (always succeeds in demo) |

### Alerts
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/alerts` | Get all alerts (supports `?severity`, `?resolved`) |
| `PUT` | `/api/alerts/:id/resolve` | Mark alert as resolved |
| `PUT` | `/api/alerts/:id/read` | Mark alert as read |
| `POST` | `/api/alerts/emergency` | Trigger an emergency alert |

### Notifications
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/notifications/send` | Send notification to resident |
| `GET` | `/api/notifications/:userId` | Fetch user notifications |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/users` | Get all users (Admin only) |
| `POST` | `/api/admin/users` | Create user account (Admin only) |
| `DELETE` | `/api/admin/users/:id` | Delete user (Admin only) |
| `GET` | `/api/admin/analytics` | Get system-wide analytics |

---

## 🗄️ Database Schema

### Tables Overview

```sql
-- Users Table
users (
  id: UUID PRIMARY KEY,
  email: STRING UNIQUE NOT NULL,
  role: 'admin' | 'guard' | 'resident',
  created_at: TIMESTAMP
)

-- Visitors Table
visitors (
  id: UUID PRIMARY KEY,
  name: STRING NOT NULL,
  email: STRING,
  phone: STRING,
  purpose: STRING,
  unit_number: STRING,
  status: 'pending' | 'approved' | 'denied' | 'completed',
  risk_level: 'low' | 'medium' | 'high' | 'critical',
  entry_time: TIMESTAMP,
  exit_time: TIMESTAMP,
  photo_url: STRING,
  created_by: UUID FOREIGN KEY -> users,
  approved_by: UUID FOREIGN KEY -> users
)

-- Approvals Table
approvals (
  id: UUID PRIMARY KEY,
  visitor_id: UUID FOREIGN KEY -> visitors,
  resident_id: UUID FOREIGN KEY -> users,
  status: 'pending' | 'approved' | 'denied',
  response_time: TIMESTAMP,
  reason: STRING
)

-- Alerts Table
alerts (
  id: UUID PRIMARY KEY,
  visitor_id: UUID FOREIGN KEY -> visitors,
  severity: 'low' | 'medium' | 'high' | 'critical',
  message: STRING,
  type: STRING,
  is_resolved: BOOLEAN,
  is_read: BOOLEAN,
  created_at: TIMESTAMP
)

-- Notifications Table
notifications (
  id: UUID PRIMARY KEY,
  user_id: UUID FOREIGN KEY -> users,
  title: STRING,
  message: STRING,
  type: STRING,
  is_read: BOOLEAN,
  created_at: TIMESTAMP
)
```

For complete schema documentation, see [supabase/schema.sql](supabase/schema.sql).

---

## 🔒 Environment Variables

Create a `.env` file in the `server/` directory with the following:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_firebase_app_id

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email Service (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@sentraai.com

# OTP Configuration
OTP_EXPIRY_MINUTES=10
OTP_MAX_ATTEMPTS=3

# CORS Configuration
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Notification Service
NOTIFICATION_API_KEY=your_notification_service_key
```

### Getting Your Credentials

#### Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email and Google OAuth)
4. Copy credentials from Project Settings

#### Supabase
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project
3. Run migrations from [supabase/schema.sql](supabase/schema.sql)
4. Copy API keys from project settings

---

## 🚀 Running the Application

### Development Mode (Recommended)

**Terminal 1 — Backend Server:**
```bash
cd server
npm install
npm start
```
Backend runs on `http://localhost:5001`

**Terminal 2 — Frontend Server:**
```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` (Vite default)

### Production Build

**Frontend:**
```bash
cd client
npm run build
# Creates optimized build in client/dist/
```

**Backend:**
Backend is production-ready as-is. Deploy with:
```bash
NODE_ENV=production npm start
```

---

## 🧪 Testing

### Manual Testing via Postman

1. Open [Postman](https://www.postman.com/download/)
2. Import API endpoints from the API Endpoints section
3. Set `Bearer <your_jwt_token>` in Authorization header
4. Test endpoints step-by-step

### Automated Testing (Future)
```bash
npm run test          # Run unit tests
npm run test:e2e      # Run end-to-end tests
npm run coverage      # Generate coverage report
```

---

## 🔑 Key Features Explained

### Route-Based Separated Architecture
Each role operates in **complete isolation** with zero UI overlap:
- Separate login pages
- Separate layouts
- Separate route guards
- Different navigation structures
- Role-specific styling

### Real-Time Updates
- Supabase subscriptions for live data
- WebSocket-ready infrastructure
- Polling fallback mechanism

### Role-Based Access Control (RBAC)
- `ProtectedRoute.jsx` wrapper for client-side protection
- JWT-based server-side authorization
- Three predefined roles: Admin, Guard, Resident
- Extensible to additional roles

### Mobile-Responsive Design
- Guard role optimized for mobile
- Dedicated `GuardMobileNav` component
- Touch-friendly interfaces
- One-handed operation support

---

## 📊 Database Setup

### Option 1: Using Supabase SQL Editor

1. Create a new Supabase project
2. Go to SQL Editor → click "New Query"
3. Copy the contents of [supabase/schema.sql](supabase/schema.sql)
4. Paste into the query editor and execute
5. Seed example data:
   - Copy [supabase/seed.sql](supabase/seed.sql) contents
   - Execute in SQL Editor

### Option 2: Using Migrations

```bash
# Apply migrations automatically (if configured)
npm run migrate

# Rollback last migration
npm run migrate:rollback
```

---

## 🌟 Success Indicators

After setup completion, verify:

- ✅ Frontend loads on `localhost:5173`
- ✅ Backend responds on `localhost:5001/api/health`
- ✅ All three role portals are accessible (`/admin`, `/guard`, `/resident`)
- ✅ Login redirects work correctly
- ✅ Database queries return data
- ✅ No console errors in browser DevTools

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5001 (Windows)
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Or run on different port
PORT=5002 npm start
```

### CORS Errors
Ensure `CORS_ORIGIN` in `.env` includes your frontend URL:
```env
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### Database Connection Issues
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- Check Supabase project is active
- Run migrations to ensure tables exist

### Firebase Authentication Failures
- Verify `FIREBASE_PROJECT_ID` matches your Firebase console
- Ensure email/password authentication is enabled in Firebase Console
- Check that the user account is created in Firebase

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

---

## 📚 Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [CHANGELOG.md](CHANGELOG.md) - Version history and updates
- [LICENSE](LICENSE) - MIT License details

---

## 🧑‍💼 Team & Contributors

- **Project Lead**: Mrigesh Koyande
- **Contributors**: [See contribution graph on GitHub]

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 🚀 Roadmap

### Phase 1 (Current)
- ✅ Multi-role portal system
- ✅ Visitor management and approvals
- ✅ Basic analytics dashboard
- ✅ Alert system

### Phase 2 (Planned)
- 🔄 AI-powered face verification
- 🔄 Advanced anomaly detection
- 🔄 SMS notifications
- 🔄 Mobile app (React Native)

### Phase 3 (Future)
- 📅 Machine learning risk predictions
- 📅 Integration with building access systems
- 📅 Multi-facility management
- 📅 Premium analytics and reporting

---

## 📞 Support & Contact

For issues, questions, or feature requests:
1. **GitHub Issues**: [Create an issue](https://github.com/yourusername/SentraAI/issues/new)
2. **Email**: support@sentraai.com
3. **Discord**: [Join our community server](https://discord.gg/sentraai)

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- React and Vite for frontend excellence
- Express.js for robust backend framework
- Supabase for PostgreSQL hosting
- Firebase for authentication services
- All open-source contributors

---

**Last Updated**: November 2024  
**Version**: 1.0.0  
**Status**: Active Development 🚀

### Admin
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard` | Get dashboard stats |
| `GET` | `/api/admin/users` | List all users |
| `POST` | `/api/admin/users` | Create a new user |
| `DELETE` | `/api/admin/users/:id` | Delete a user |
| `GET` | `/api/admin/blacklist` | Get blacklist entries |
| `POST` | `/api/admin/blacklist` | Add to blacklist |
| `DELETE` | `/api/admin/blacklist/:id` | Remove from blacklist |

### AI Simulation
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ai/verify-face` | Simulate face verification |
| `POST` | `/api/ai/trust-score` | Calculate visitor trust score |
| `POST` | `/api/ai/anomaly-detect` | Run anomaly detection |

### System
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check |

---

## 🎨 Design System

SentraAI uses a unified dark-mode design system defined in `index.css`:

- **Background**: Deep navy `#06060f` with glassmorphism cards
- **Typography**: Inter (UI) + JetBrains Mono (data)
- **Animations**: Smooth micro-animations, floating orbs, scan lines
- **Role Accents**: Purple (Admin) · Cyan (Guard) · Green (Resident)

---

## 🔧 Development

### Demo Credentials

Use the "Quick Demo Access" button on any login page — no credentials required.

| Role | Email | Password |
|---|---|---|
| Admin | `admin@sentraai.com` | any |
| Guard | `guard@sentraai.com` | any |
| Resident | `resident@sentraai.com` | any |

### Production Build

```bash
cd client
npm run build       # Output → client/dist/
npm run preview     # Preview locally
```

### Troubleshooting

**Port in use:**
```bash
# Change in server/.env
PORT=5002
```

**CORS issues:** Ensure backend is running before the frontend.

**Dependency issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🔮 Future Enhancements

- [ ] Real-time notifications via WebSockets
- [ ] JWT-based authentication with session persistence
- [ ] Integration with CCTV / live camera feeds
- [ ] Mobile app (React Native)
- [ ] Multi-property / multi-site support
- [ ] Facial recognition with live camera capture
- [ ] Door lock system integration
- [ ] Export reports (PDF / CSV)

---

## 🤝 Contributing

```bash
git checkout -b feature/your-feature-name
git commit -m "feat: add amazing feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

MIT — see `LICENSE` for details.

---

## 👨‍💻 Project Info

**Version:** 1.0.0  
**Created:** 2024–2026  
**Stack:** React + Vite + Express.js
