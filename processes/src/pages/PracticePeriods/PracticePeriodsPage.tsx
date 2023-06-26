import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'Store/selectors/AuthSelector';
import PracticePeriodsListContainer from './PracticePeriodsListContainer';

const PracticePeriodsPage: React.FC = () => {
  const userRole = useSelector(selectUserRole)
  return (
    <>
      <PracticePeriodsListContainer/>
    </>
  )
}

export default PracticePeriodsPage;