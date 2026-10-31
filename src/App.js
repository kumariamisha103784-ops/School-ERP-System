import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./Nav";
import Home from "./Home";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import Students from "./Students";
import Teachers from "./Teachers";
import Attendance from "./Attendance";
import Fees from "./Fees";
import Classes from "./Classes";
import Notices from "./Notices";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/notices" element={<Notices />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;