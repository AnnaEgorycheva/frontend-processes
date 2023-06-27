import { selectIsAuth } from 'Store/selectors/AuthSelector';
import Application from 'pages/Application/Application';
import ApplicationsPage from 'pages/Applications/ApplicationsPage';
import Companies from 'pages/Companies/Companies';
import Company from 'pages/Company/Company';
import LoginPageContainer from 'pages/Login/LoginPageContainer';
import MainPageRedirect from 'pages/Main/MainPageRedirect';
import PositionPage from 'pages/Position/PositionPage';
import PositionsPage from 'pages/Positions/PositionsPage';
import PracticePeriodPageContainer from 'pages/PracticePeriod/PracticePeriodPageContainer';
import PracticePeriodsPage from 'pages/PracticePeriods/PracticePeriodsPage';
import PracticeProfilePageContainer from 'pages/PracticeProfile/PracticeProfilePageContainer';
import PracticeProfilesPage from 'pages/PracticeProfiles/PracticeProfilesPage';
import Profile from 'pages/Profile/Profile';
import Student from 'pages/Student/Student';
import Students from 'pages/Students/Students';
import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate, Route, Routes } from 'react-router-dom';

const RoutesPage: React.FC = () => {
  const isAuth = useSelector(selectIsAuth)

  return (
      <Routes>
          <Route path="/" 
                element={ isAuth ? <MainPageRedirect/> : <Navigate to={'/login'}/> }
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
                element={ isAuth ? <Profile/> : <Navigate to={'/login'}/> }
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
          <Route path='practicePeriods' 
                element={ isAuth ? <PracticePeriodsPage/> : <Navigate to={'/login'}/> }
          />
          <Route path='practicePeriods/:id' 
                element={ isAuth ? <PracticePeriodPageContainer/> : <Navigate to={'/login'}/> }
          />
          <Route path='practiceProfiles' 
                element={ isAuth ? <PracticeProfilesPage/> : <Navigate to={'/login'}/> }
          />
          <Route path='practiceProfiles/:id' 
                element={ isAuth ? <PracticeProfilePageContainer/> : <Navigate to={'/login'}/> }
          />   
          <Route path='login'
                element={<LoginPageContainer/>}
          />
      </Routes>
  );
};

export default RoutesPage;