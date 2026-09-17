# Task Manager

A responsive Task Manager built with React and TypeScript. This project was created as a learning project to practice React state management, TypeScript, Redux Toolkit, routing, and browser storage.

## Features

- User Signup
- User Login
- Logout functionality
- Authentication state managed with Redux Toolkit
- User data persistence using localStorage
- Task creation
- Task editing
- Task deletion
- Mark tasks as completed
- Responsive UI
- React Router navigation
- TypeScript type safety
- Component-based architecture

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Redux
- React Router
- Tailwind CSS
- Vite
- localStorage

## Authentication Flow

The application includes a simple frontend authentication flow:

1. User creates an account through Signup.
2. User information is stored in Redux and localStorage.
3. User is redirected to the Login page.
4. User logs in using their email and password.
5. Successful login updates the authentication state.
6. User is redirected to the Task Manager.
7. The user's name is displayed on the Task Manager page.
8. Logging out clears the authentication state and localStorage.

## Data Persistence

The project uses the browser's `localStorage` to persist authentication data.

This means that refreshing the page does not remove the saved user information.

The application stores the authentication state under:

```text
task-manager-auth
```

> **Note:** This project uses `localStorage` for learning purposes. Passwords are stored in the browser and are not securely hashed. This approach should not be used for a production authentication system.

## Project Structure

```text
src/
│
├── components/
│   ├── Form.tsx
│   ├── List.tsx
│   │
│   └── redux/
│       └── authSlice.ts
│
├── pages/
│   ├── Login.tsx
│   ├── Signup.tsx
│   └── TaskPage.tsx
│
├── types/
│   └── task.ts
│
├── App.tsx
├── main.tsx
└── ...
```

## Routes

| Route     | Description          |
|-----------|-----------------------|
| `/signup` | Create a new account  |
| `/login`  | Login to the application |
| `/tasks`  | Task Manager          |

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Qasimali-019/Task-Manager/tree/master
```

### 2. Navigate into the project

```bash
cd task-manager
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will then be available through the local development URL provided by Vite.

## Learning Goals

This project helped me practice:

- React components
- React hooks
- TypeScript types
- Props
- Context API
- Redux Toolkit
- Redux state management
- React Router
- Form handling
- Authentication flow
- localStorage
- Responsive design with Tailwind CSS

## Future Improvements

Some improvements planned for future versions:

- Protected routes
- Better form validation
- Authentication error messages
- Password hashing with a backend
- Backend API
- Database integration
- Persistent tasks per user
- Loading states
- Better authentication architecture

## Disclaimer

This is a learning project and does not implement production-level authentication or security. It should **not** be described as a "secure authentication system" — the current authentication is frontend-only, and passwords are stored in `localStorage` without hashing. This README honestly reflects that it's meant for practicing authentication flow and state management, which is a solid goal for a learning project.
