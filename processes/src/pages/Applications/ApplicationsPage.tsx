import React from 'react';
import ApplicationsForStudentContainer from './ApplicationsForStudent/ApplicationsForStudentContainer';
import ApplicationsForCompanyContainer from './ApplicationsForCompany/ApplicationsForCompanyContainer';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'Store/selectors/AuthSelector';

const ApplicationsPage: React.FC = () => {
  const userRole = useSelector(selectUserRole)
  return (
    <>
      {
        userRole === 'COMPANY'
        ? <ApplicationsForCompanyContainer/>
        : <ApplicationsForStudentContainer/>
      }
    </>
  )
}

export default ApplicationsPage;