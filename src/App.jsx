// import { Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import ForgotPassword from "./components/ForgotPassword";
// import ResetPassword from "./components/ResetPassword";
// import Dashboard from "./components/Dashboard";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-password" element={<ResetPassword />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//     </Routes>
//   );
// }

// export default App;
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "./auth";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [user, setUser] = useState(getUser());
  const guard = (el) => (user ? el : <Navigate to="/login" replace />);
  const guest = (el) => (user ? <Navigate to="/dashboard" replace /> : el);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <main className="page">
        <Routes>
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
          <Route path="/login" element={guest(<Login setUser={setUser} />)} />
          <Route path="/signup" element={guest(<Signup />)} />
          <Route path="/forgot-password" element={guest(<ForgotPassword />)} />
          <Route path="/reset-password" element={guest(<ResetPassword />)} />
          <Route path="/dashboard" element={guard(<Dashboard user={user} />)} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
