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
            element={<>students</>}
        />
        <Route
            path="students/:id"
            element={<>student1</>}
        />
        <Route
            path="companies"
            element={<>companies</>}
        />
    </Routes>
  );
};

export default RoutesPage;