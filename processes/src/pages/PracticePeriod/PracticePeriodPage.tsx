import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'Store/selectors/AuthSelector';

const PracticePeriodPage: React.FC = () => {
  const userRole = useSelector(selectUserRole)
  return (
    <>
      
    </>
  )
}

export default PracticePeriodPage;