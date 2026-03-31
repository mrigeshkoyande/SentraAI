# SentraAI — Intelligent Visitor Security System

> Enterprise-grade visitor management and access control with AI-powered analytics, real-time alerts, and a fully isolated role-based portal architecture.

---

## 🎯 Overview

SentraAI is a full-stack application that streamlines visitor tracking, security approvals, and administrative operations for residential complexes, corporate offices, and secure facilities. It uses a **Route-Based Separated Architecture** — each user role (Admin, Guard, Resident) has its own dedicated URL, login page, and dashboard interface with zero shared UI between them.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18.2 |
| Build Tool | Vite 4.3 |
| Routing | React Router DOM 6 |
| Icons | Lucide React |
| HTTP Client | Axios 1.4 |
| Styling | Vanilla CSS3 |
| Backend | Node.js + Express.js 4.18 |
| Environment | dotenv 16 |

---

## 📁 Project Structure

```
SentraAI/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx/.css      # Shared top header bar
│   │   │   ├── Sidebar.jsx/.css     # Role-aware collapsible sidebar
│   │   │   ├── GuardMobileNav.jsx/.css # Mobile navigation for Guard role
│   │   │   ├── VisitorPass.jsx/.css # Visitor pass with QR code generator
│   │   │   └── ContactGuard.jsx/.css # Contact guard communication modal (Resident)
│   │   ├── pages/
│   │   │   ├── RoleGateway.jsx/.css # Landing page — portal selector (/)
│   │   │   ├── admin/
│   │   │   │   ├── AdminLogin.jsx/.css   # Admin login (/admin/login)
│   │   │   │   └── AdminLayout.jsx       # Admin layout shell
│   │   │   ├── guard/
│   │   │   │   ├── GuardLogin.jsx/.css   # Guard login (/guard/login)
│   │   │   │   └── GuardLayout.jsx       # Guard layout shell
│   │   │   ├── resident/
│   │   │   │   ├── ResidentLogin.jsx/.css # Resident login (/resident/login)
│   │   │   │   ├── ResidentLayout.jsx    # Resident layout shell
│   │   │   │   └── ResidentDashboard.jsx # Resident-specific dashboard
│   │   │   ├── Dashboard.jsx/.css   # Main dashboard page (shared across roles)
│   │   │   ├── VisitorEntry.jsx/.css # Visitor registration
│   │   │   ├── Approval.jsx/.css    # Approval workflow
│   │   │   ├── Alerts.jsx/.css      # Alert management
│   │   │   ├── Logs.jsx/.css        # Activity logs (Admin & Guard)
│   │   │   ├── Analytics.jsx/.css   # Analytics dashboard (Admin only)
│   │   │   ├── Admin.jsx/.css       # Admin panel (Admin only)
│   │   │   ├── Settings.jsx/.css    # Settings page
│   │   │   └── About.jsx/.css       # About page
│   │   ├── data/
│   │   │   └── mockData.js          # Mock data generators
│   │   ├── hooks/
│   │   │   ├── useTheme.js          # Theme management hook
│   │   │   └── usePolling.js        # Polling hook for real-time updates
│   │   ├── App.jsx                  # Root router
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global design system tokens
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── index.js                     # Express server + all API routes
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14+
- **npm** v6+ or **yarn** v1.22+
- A modern browser (Chrome, Firefox, Safari, Edge)

### Installation

**1. Clone the repository**
```bash
git clone <repository-url>
cd SentraAI
```

**2. Install backend dependencies**
```bash
cd server
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
