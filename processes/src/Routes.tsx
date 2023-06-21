import { withAuthRedirect } from 'HOC/withAuthRedirect';
import { selectIsAuth } from 'Store/selectors/AuthSelector';
import Application from 'pages/Application/Application';
import ApplicationsPage from 'pages/Applications/ApplicationsPage';
import Companies from 'pages/Companies/Companies';
import Company from 'pages/Company/Company';
import LoginPageContainer from 'pages/Login/LoginPageContainer';
import PositionPage from 'pages/Position/PositionPage';
import PositionsPage from 'pages/Positions/PositionsPage';
import Student from 'pages/Student/Student';
import Students from 'pages/Students/Students';
import React, { ReactElement, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Route, Routes } from 'react-router-dom';

const RoutesPage: React.FC = () => {
  const isAuth = useSelector(selectIsAuth)

  return (
    // <Routes>
    //     <Route path="/" element={<>main</>}/>
    //     <Route path="students" element={<Students/>}/>
    //     <Route path="students/:id" element={<Student/>}/>
    //     <Route path="companies" element={<Companies/>}/>
    //     <Route path="companies/:id" element={<Company/>}/>
    //     <Route path="profile" element={<>profile</>}/>
    //     <Route path="applications" element={<ApplicationsPage/>}/>
    //     <Route path="applications/:id" element={<Application/>}/> 
    //     <Route path='positions' element={<PositionsPage/>}></Route>
    //     <Route path='positions/:id' element={<PositionPage/>}></Route> 
    //     <Route path='login' element={<LoginPageContainer/>}></Route>
    //   </Routes>
      <Routes>
          <Route path="/" 
                element={ isAuth ? <>main</> : <Navigate to={'/login'}/> }
          />
          <Route path="students" 
                element={ isAuth ? <Students/> : <Navigate to={'/login'}/> }
          />
          <Route path="students/:id" 
                element={ isAuth ? <Student/> : <Navigate to={'/login'}/> }
          />
          <Route path="companies" 
                element={ isAuth ? <Companies/> : <Navigate to={'/login'}/> }
          />
          <Route path="companies/:id" 
                element={ isAuth ? <Company/> : <Navigate to={'/login'}/> }
          />
          <Route path="profile" 
                element={ isAuth ? <>profile</> : <Navigate to={'/login'}/> }
          />
          <Route path="applications" 
                element={ isAuth ? <ApplicationsPage/> : <Navigate to={'/login'}/> }
          />
          <Route path="applications/:id" 
                element={ isAuth ? <Application/> : <Navigate to={'/login'}/> }
          /> 
          <Route path='positions' 
                element={ isAuth ? <PositionsPage/> : <Navigate to={'/login'}/> }
          />
          <Route path='positions/:id' 
                element={ isAuth ? <PositionPage/> : <Navigate to={'/login'}/> }
          /> 
          <Route path='login'
                element={<LoginPageContainer/>}
          />
      </Routes>
  );
};

export default RoutesPage;