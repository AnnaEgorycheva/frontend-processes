import React from 'react';
import PositionsListForSchoolAndStudentContainer from './PositionsForSchoolAndStudent/PositionsListForSchoolAndStudentContainer';
import PositionsForCompanyContainer from './PositionsForCompany/PositionsForCompanyContainer';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'Store/selectors/AuthSelector';

const PositionsPage: React.FC = () => {
  const userRole = useSelector(selectUserRole)
  return (
    <>
      {
        userRole === 'COMPANY'
        ? <PositionsForCompanyContainer/>
        : <PositionsListForSchoolAndStudentContainer/>
      }
    </>
  )
}

export default PositionsPage;