import Application from 'pages/Application/Application';
import Companies from 'pages/Companies/Companies';
import Company from 'pages/Company/Company';
import PositionPage from 'pages/Position/PositionPage';
import PositionsPage from 'pages/Positions/PositionsPage';
import Student from 'pages/Student/Student';
import Students from 'pages/Students/Students';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const RoutesPage: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<>main</>}/>
        <Route path="students" element={<Students/>}/>
        <Route path="students/:id" element={<Student/>}/>
        <Route path="companies" element={<Companies/>}/>
        <Route path="companies/:id" element={<Company/>}/>
        <Route path="profile" element={<>profile</>}/>
        <Route path="applications" element={<>applications</>}/>
        <Route path="applications/:id" element={<Application/>}/> 
        <Route path='positions' element={<PositionsPage/>}></Route>
        <Route path='positions/:id' element={<PositionPage/>}></Route>
    </Routes>
  );
};

export default RoutesPage;