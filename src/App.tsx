import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TaskPage from "./pages/TaskPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<TaskPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;

