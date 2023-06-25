import React from 'react';
import PositionForSchoolContainer from './PositionForSchool/PositionForSchoolContainer';
import PositionForStudentContainer from './PositionForStudent/PositionForStudentContainer';
import PositionForCompanyContainer from './PositionForCompany/PositionForCompanyContainer';
import { selectUserRole } from 'Store/selectors/AuthSelector';
import { useSelector } from 'react-redux';

const PositionPage: React.FC = () => {
    const role = useSelector(selectUserRole);

    return (
        <>
            { role === "SCHOOL" && <PositionForSchoolContainer/> }
            { role === "STUDENT" && <PositionForStudentContainer/> }
            { role === "COMPANY" && <PositionForCompanyContainer/> }
        </>
    )
}

export default PositionPage;