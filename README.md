# Task Manager

A responsive Task Manager application built with **React, TypeScript, Redux Toolkit, React Context, React Router, and Tailwind CSS**.

The application supports user authentication, task management, task filtering, priorities, due dates, and a separate admin dashboard for monitoring users and tasks.

## Features

### Authentication

* User signup
* User login
* Admin login using the same login page
* Role-based authentication
* Protected routes
* Logout functionality
* Forgot password / password reset
* Authentication state stored in Local Storage

### User Dashboard

Users can:

* Create tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed
* Set task priority
* Set task due dates
* Search tasks
* Filter tasks by status
* Filter tasks by priority
* View their own tasks
* See task statistics

Task information includes:

```text
Task
├── ID
├── Name
├── Completion status
├── User email
├── Priority
├── Due date
└── Created date
```

### Admin Dashboard

Admins have a separate dashboard where they can:

* View total users
* View total tasks
* View completed tasks
* View pending tasks
* View high-priority tasks
* View overdue tasks
* View recent task activity
* View registered users
* View all tasks

### Admin Task Management

The admin task page supports:

* Search tasks
* Filter tasks by user
* Filter tasks by status
* View task priority
* View task due date
* View task status

### Routing

The application uses React Router with protected routes.

Main routes include:

```text
/signup
/login
/forgot-password
/tasks

/admin
/admin/users
/admin/tasks
```

A custom 404 page is also included for invalid routes.

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Redux Toolkit
* React Context API
* Lucide React

### State Management

The project uses two approaches:

**Redux Toolkit**

Used for authentication and user management.

```text
Users
Authentication
Login
Logout
Signup
Password Reset
Roles
```

**React Context API**

Used for task management.

```text
Tasks
Add Task
Edit Task
Delete Task
Complete Task
```

## Data Storage

This project does not use a backend or database.

Data is stored locally in the browser using `localStorage`.

Two main local storage entries are used:

```text
task-manager-auth
task-manager-tasks
```

### Authentication Storage

`task-manager-auth` stores:

```text
users
user
isLoggedIn
```

### Task Storage

`task-manager-tasks` stores the task list.

Each task contains information about the user who created it through:

```text
userEmail
```

This allows the application to display each user's own tasks while allowing the admin dashboard to view all tasks.

## Password Reset

The application includes a simple frontend password reset flow.

The user can:

1. Open **Forgot Password**
2. Enter their registered email
3. Enter a new password
4. Confirm the new password
5. Reset the password
6. Return to the login page

> **Note:** This is a frontend/localStorage implementation for learning purposes. It is not a production-secure password recovery system. A production application should use a backend, email verification, reset tokens, expiration, and secure password hashing.

## Project Structure

```text
src/
│
├── components/
│   ├── redux/
│   │   └── authSlice.ts
│   │
│   ├── Admin/
│   │   ├── AdminCards.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLayout.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminTable.tsx
│   │   ├── AdminTasks.tsx
│   │   └── AdminUsers.tsx
│   │
│   ├── Form.tsx
│   ├── List.tsx
│   └── ...
│
├── Context/
│   └── TaskContext.tsx
│
├── pages/
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── ForgotPassword.tsx
│   ├── TaskPage.tsx
│   └── NotFound.tsx
│
├── routes/
│   └── ProtectedRoute.tsx
│
├── types/
│   └── task.ts
│
├── App.tsx
└── main.tsx
```

## User Roles

There are two roles in the application:

```text
user
admin
```

### User

A normal user can:

* Manage their own tasks
* View their task statistics
* Update task information
* Complete tasks
* Delete tasks

### Admin

An admin can:

* Access the admin dashboard
* View users
* View all tasks
* Monitor task statistics
* Filter and search tasks

## Admin Account

For development/testing, an admin account can be created through the Redux `createAdmin` action.

Default development credentials:

```text
Email: admin@gmail.com
Password: admin1234
```

> These credentials are for local development only and should not be used in a production application.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Qasimali-019/Task-Manager
```

### 2. Navigate into the project

```bash
cd Task-Manager
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will then be available through the local Vite development URL.

## Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Current Architecture

```text
                    React Application
                           │
             ┌─────────────┴─────────────┐
             │                           │
       Redux Toolkit                Task Context
             │                           │
       Authentication                Task State
             │                           │
       ┌─────┴─────┐              ┌─────┴─────┐
       │           │              │           │
      Users      Login          Tasks      Filters
       │           │              │           │
       └───────────┴──────────────┴───────────┘
                           │
                       LocalStorage
                    ┌──────┴──────┐
                    │             │
             task-manager-auth   task-manager-tasks
```

## Future Improvements

Possible future improvements include:

* Backend API
* Database persistence
* Secure authentication
* Password hashing
* Email-based password recovery
* JWT authentication
* Refresh tokens
* User profile management
* Advanced admin permissions
* Task activity history
* Notifications
* Task pagination
* Production deployment

## Purpose

This project was created as a learning project to practice:

* React
* TypeScript
* Redux Toolkit
* Context API
* React Router
* Authentication flows
* Protected routes
* Role-based access
* Local Storage
* Component-based architecture
* Responsive UI development

## License

This project is for learning and educational purposes.
