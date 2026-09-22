import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TaskPage from "./pages/TaskPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AuthTest from "./components/AuthTest";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminUsers from "./components/Admin/AdminUser";
import AdminTasks from "./components/Admin/AdminTasks";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/auth-test" element={<AuthTest />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        <Route path="/tasks"
          element={
            <ProtectedRoute requiredRole="user">

              <TaskPage />
            </ProtectedRoute>
          }
        />


        <Route path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminDashboard />

              </AdminLayout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/tasks"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminTasks />
              </AdminLayout>
            </ProtectedRoute>
          }
        />



      </Routes>
    </BrowserRouter>
  )
}

export default App;

