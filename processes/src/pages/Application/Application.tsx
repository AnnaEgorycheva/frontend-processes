import React from 'react';
import { useLocation } from 'react-router-dom';
import ApplicationForCompany from './components/ApplicationForCompany';
import ApplicationForStudent from './components/ApplicationForStudent';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'Store/selectors/AuthSelector';


const Application: React.FC = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const role = useSelector(selectUserRole);

    return (
         <>{role === 'COMPANY' ? <ApplicationForCompany id={location.pathname.split('/')[2]}/> : <ApplicationForStudent id={location.pathname.split('/')[2]}/>}</>
    )
};

export default Application;