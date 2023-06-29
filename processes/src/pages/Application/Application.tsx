import React from 'react';
import { useLocation } from 'react-router-dom';
import ApplicationForCompany from './components/ApplicationForCompany';
import ApplicationForStudent from './components/ApplicationForStudent';

const user = {
    role: 'company',
};

const Application: React.FC = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    return (
         <>{user.role === 'COMPANY' ? <ApplicationForCompany id={location.pathname.split('/')[2]}/> : <ApplicationForStudent id={location.pathname.split('/')[2]}/>}</>
    )
};

export default Application;