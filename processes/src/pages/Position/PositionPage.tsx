import { user } from 'pages/Positions/user';
import React from 'react';
import { useLocation } from 'react-router-dom';
import PositionForSchoolContainer from './PositionForSchool/PositionForSchoolContainer';
import PositionForStudentContainer from './PositionForStudent/PositionForStudentContainer';
import PositionForCompanyContainer from './PositionForCompany/PositionForCompanyContainer';

const PositionPage: React.FC = () => {
    const location = useLocation();
    const positionId = location.pathname.split('/')[2];

    return (
        <>
        { user.role === "school" && <PositionForSchoolContainer/> }
        { user.role === "student" && <PositionForStudentContainer/> }
        { user.role === "company" && <PositionForCompanyContainer/> }
        </>
    )
}

export default PositionPage;