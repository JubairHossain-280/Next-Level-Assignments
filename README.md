# DevPulse 🚼

> **Internal Tech Issue & Feature Tracker** — A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

---

## 🌐 Live URL

```
https://your-deployment-url.com
```

---

## ✨ Features

- **User Authentication** — Secure registration and login with JWT-based sessions
- **Role-Based Access Control** — Two roles (`contributor`, `maintainer`) with enforced permission boundaries
- **Issue Management** — Create, view, update, and delete bug reports or feature requests
- **Workflow Status Tracking** — Track issues through `open → in_progress → resolved` lifecycle
- **Filtering & Sorting** — Query issues by type, status, and creation date
- **System Metrics** — Internal metrics endpoint accessible to maintainers only

---

## 🛠️ Tech Stack

| Technology              | Purpose                                                |
| ----------------------- | ------------------------------------------------------ |
| **Node.js** (LTS 24.x+) | Server runtime                                         |
| **TypeScript**          | Type-safe application code                             |
| **Express.js**          | HTTP framework with modular router architecture        |
| **PostgreSQL**          | Relational database                                    |
| **pg** (native driver)  | Raw SQL via `pool.query()` — no ORMs or query builders |
| **bcrypt**              | Password hashing (salt rounds: 8–12)                   |
| **jsonwebtoken**        | JWT generation and verification                        |

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js LTS (v24.x or higher)
- PostgreSQL (NeonDB, Supabase, or ElephantSQL for PostgreSQL)

### 1. Clone the Repository

```
git clone https://github.com/JubairHossain-280/Next-Level-Assignments.git

cd Next-Level-Assignments

git checkout assignment-2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```env
CONNECTION_STRING=your_db_connection_string
PORT=3000
SECRET_KEY=your_secret_key
TOKEN_EXPIRES_IN=your_token_expire
```

### 5. Start the Server

```bash
# Development Server
npm run dev

# Production Server
npm run build
npm start
```

The server will be running at `http://localhost:3000`.

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint           | Access | Description                          |
| ------ | ------------------ | ------ | ------------------------------------ |
| `POST` | `/api/auth/signup` | Public | Register a new user account          |
| `POST` | `/api/auth/login`  | Public | Authenticate and receive a JWT token |

### Issues

| Method   | Endpoint          | Access          | Description                            |
| -------- | ----------------- | --------------- | -------------------------------------- |
| `POST`   | `/api/issues`     | Authenticated   | Create a new issue                     |
| `GET`    | `/api/issues`     | Public          | Retrieve all issues (supports filters) |
| `GET`    | `/api/issues/:id` | Public          | Retrieve a single issue by ID          |
| `PATCH`  | `/api/issues/:id` | Authenticated   | Update an issue                        |
| `DELETE` | `/api/issues/:id` | Maintainer only | Permanently delete an issue            |

### Query Parameters (GET `/api/issues`)

| Parameter | Values                            | Default  | Description                 |
| --------- | --------------------------------- | -------- | --------------------------- |
| `sort`    | `newest`, `oldest`                | `newest` | Sort order by creation date |
| `type`    | `bug`, `feature_request`          | —        | Filter by issue type        |
| `status`  | `open`, `in_progress`, `resolved` | —        | Filter by workflow status   |

**Example:**

```
GET /api/issues?sort=oldest&type=bug&status=open
```

### Authentication Header

Protected endpoints require the JWT token in the `Authorization` header:

```
Authorization: <JWT_TOKEN>
```

---

## 🗄️ Database Schema

### `users`

| Column       | Type           | Constraints                                                 |
| ------------ | -------------- | ----------------------------------------------------------- |
| `id`         | `SERIAL`       | Primary Key, Auto-increment                                 |
| `name`       | `VARCHAR(255)` | NOT NULL                                                    |
| `email`      | `VARCHAR(255)` | NOT NULL, UNIQUE                                            |
| `password`   | `VARCHAR(255)` | NOT NULL — bcrypt hashed, never returned                    |
| `role`       | `VARCHAR(20)`  | DEFAULT `contributor` — one of: `contributor`, `maintainer` |
| `created_at` | `TIMESTAMP`    | Auto-generated on insert                                    |
| `updated_at` | `TIMESTAMP`    | Auto-refreshed on update                                    |

### `issues`

| Column        | Type           | Constraints                                                |
| ------------- | -------------- | ---------------------------------------------------------- |
| `id`          | `SERIAL`       | Primary Key, Auto-increment                                |
| `title`       | `VARCHAR(150)` | NOT NULL, max 150 characters                               |
| `description` | `TEXT`         | NOT NULL, min 20 characters                                |
| `type`        | `VARCHAR(20)`  | NOT NULL — one of: `bug`, `feature_request`                |
| `status`      | `VARCHAR(20)`  | DEFAULT `open` — one of: `open`, `in_progress`, `resolved` |
| `reporter_id` | `INTEGER`      | NOT NULL — references `users.id` (validated in app logic)  |
| `created_at`  | `TIMESTAMP`    | Auto-generated on insert                                   |
| `updated_at`  | `TIMESTAMP`    | Auto-refreshed on update                                   |

---

## 👥 User Roles & Permissions

| Permission                      | Contributor | Maintainer |
| ------------------------------- | :---------: | :--------: |
| Register & log in               |     ✅      |     ✅     |
| Create issues                   |     ✅      |     ✅     |
| View all issues                 |     ✅      |     ✅     |
| Update own issues (when `open`) |     ✅      |     ✅     |
| Update any issue                |     ❌      |     ✅     |
| Change issue status             |     ❌      |     ✅     |
| Delete any issue                |     ❌      |     ✅     |
| Access system metrics           |     ❌      |     ✅     |

---

## 🔐 Security Notes

- Passwords are hashed using **bcrypt** before storage and never returned in any API response.
- All protected endpoints validate the JWT signature and expiry before processing.
- Role verification is enforced server-side before any privileged operation.
- The JWT payload includes `id`, `name`, and `role` for downstream authorization checks.

---

## 📁 Project Structure

```
NEXT-LEVEL-ASSIGNMENTS/
├── @types/           # Global type declaration
├── node_modules/
├── src/
│   ├── config/       # dotenv configuration
│   ├── db/           # Database connection pool
│   ├── middleware/   # Auth & role verification
│   ├── modules/      # Features in modular pattern
│   │   ├── auth/     # Auth Feature
│   │   └── issues/   # Issues Feature
│   ├── types/        # Common types
│   ├── utils/        # Reusable helpers
│   ├── app.ts        # Application
│   └── server.ts     # Running local server
├── .env              # Environment variables
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json     # TypeScript configuration
```
