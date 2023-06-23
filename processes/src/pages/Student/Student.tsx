import { Button, Form, Input, Layout, List, message } from 'antd';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StudentForCompany from './components/StudentForCompany';
import StudentForSchool from './components/StudentForSchool';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'Store/selectors/AuthSelector';

const data = [
    {
        name: 'Иванов Иван Иванович',
        group: '100110',
        id: 1,
    },
    {
        name: 'Петрова Полина Петровна',
        group: '100110',
        id: 33,
    },
    {
        name: 'Петрова Полина',
        group: '100110',
        id: 1888,
    },
    {
        name: 'Иванов Иван Иванович',
        group: '100110',
        id: 17,
    },
    {
        name: 'Петрова Полина Петровна',
        group: '100110',
        id: 188,
    },
    {
        name: 'Петрова Полина',
        group: '100110',
        id: 16,
    },
    {
        name: 'Иванов Иван Иванович',
        group: '100110',
        id: 15,
    },
    {
        name: 'Петрова Полина Петровна',
        group: '100110',
        id: 14,
    },
    {
        name: 'Петрова Полина',
        group: '100110',
        id: 13,
    },
    {
        name: 'Иванов Иван Иванович',
        group: '100110',
        id: 12,
    },
    {
        name: 'Петрова Полина Петровна',
        group: '100110',
        id: 656,
    },
    {
        name: 'Петрова Полина',
        group: '100110',
        id: 454,
    },
    {
        name: 'Иванов Иван Иванович',
        group: '100110',
        id: 35,
    },
    {
        name: 'Петрова Полина Петровна',
        group: '100110',
        id: 5,
    },
    {
        name: 'Петрова Полина',
        group: '100110',
        id: 2,
    },
];

const Student: React.FC = () => {
    const location = useLocation();
    const role = useSelector(selectUserRole);
    return (
        <>{role === 'COMPANY' ? <StudentForCompany id={location.pathname.split('/')[2]}/> : <StudentForSchool id={location.pathname.split('/')[2]}/>}</>
    )
};

export default Student;