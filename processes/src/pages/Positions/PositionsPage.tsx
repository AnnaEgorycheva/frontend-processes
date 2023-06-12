import React from 'react';
import PositionsListForSchoolAndStudentContainer from './PositionsForSchoolAndStudent/PositionsListForSchoolAndStudentContainer';
import { user } from './user';
import PositionsForCompanyContainer from './PositionsForCompany/PositionsForCompanyContainer';

const PositionsPage: React.FC = () => {
  return (
    <>
      {
        user.role === 'company'
        ? <PositionsForCompanyContainer/>
        : <PositionsListForSchoolAndStudentContainer/>
      }
    </>
  )
}

export default PositionsPage;