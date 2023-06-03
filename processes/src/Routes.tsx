import Companies from 'pages/Companies/Companies';
import Student from 'pages/Student/Student';
import Students from 'pages/Students/Students';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const RoutesPage: React.FC = () => {
  return (
    <Routes>
        <Route
            path="/"
            element={<>main</>}
        />
        <Route
            path="students"
            element={<Students/>}
        />
        <Route
            path="students/:id"
            element={<Student/>}
        />
        <Route
            path="companies"
            element={<Companies/>}
        />
        <Route
            path="companies/:id"
            element={<>company</>}
        />
    </Routes>
  );
};

export default RoutesPage;