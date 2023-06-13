import React from 'react';
import { user } from '../Positions/user';
import ApplicationsForStudentContainer from './ApplicationsForStudent/ApplicationsForStudentContainer';
import ApplicationsForCompanyContainer from './ApplicationsForCompany/ApplicationsForCompanyContainer';

const ApplicationsPage: React.FC = () => {
  return (
    <>
      {
        user.role === 'company'
        ? <ApplicationsForCompanyContainer/>
        : <ApplicationsForStudentContainer/>
      }
    </>
  )
}

export default ApplicationsPage;