import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";

import Students from "./Students";
import StudentForm from "./StudentForm";

import Teachers from "./Teachers";
import TeacherForm from "./TeacherForm";

import Attendance from "./Attendance";
import AttendanceForm from "./AttendanceForm";

import FeeList from "./FeeList";
import FeeForm from "./FeeForm";

import Classes from "./Classes";
import ClassForm from "./ClassForm";

import Notices from "./Notices";
import NoticeForm from "./NoticeForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/students" element={<Students />} />
        <Route path="/studentform" element={<StudentForm />} />
        <Route path="/studentedit/:id" element={<StudentForm />} />

        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teacherform" element={<TeacherForm />} />
        <Route path="/teacheredit/:id" element={<TeacherForm />} />

        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendanceform" element={<AttendanceForm />} />
        <Route path="/attendanceedit/:id" element={<AttendanceForm />} />

        <Route path="/fees" element={<FeeList />} />
        <Route path="/feeform" element={<FeeForm />} />
        <Route path="/feeedit/:id" element={<FeeForm />} />

        <Route path="/classes" element={<Classes />} />
        <Route path="/classform" element={<ClassForm />} />
        <Route path="/classedit/:id" element={<ClassForm />} />

        <Route path="/notices" element={<Notices />} />
        <Route path="/noticeform" element={<NoticeForm />} />
        <Route path="/noticeedit/:id" element={<NoticeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;