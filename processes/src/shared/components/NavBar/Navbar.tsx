import React, { useEffect, useState } from 'react';
import { Header } from 'antd/es/layout/layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  Col, MenuProps, Row} from 'antd';
import Title from 'antd/es/typography/Title';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectUserRole } from 'Store/selectors/AuthSelector';
import { logout } from 'Store/reducers/AuthReducer';
import { useAppDispatch } from 'HOOKS/hooks';

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch()
    const isAuth = useSelector(selectIsAuth)
    const userRole = useSelector(selectUserRole)
    const logoutBtnClick = () => {
        dispatch(logout())
    }

    const location = useLocation()
    const [current, setCurrent] = useState(location.pathname.split('/')[1])
    const onClick: MenuProps['onClick'] = (e) => {
        if(e.key !== 'notifications')
            setCurrent(e.key);
    };

    useEffect(() => {
        let loc = location.pathname.split('/')[1]
        if(loc === 'companies' || loc === 'students' || loc === 'positions' )
            setCurrent(loc);
      }, [location]);

    return (
        <Header style={{ padding: 0 }} >
            <Row wrap={false} align="middle" style={{ justifyContent: "space-between" }}>
                <Title level={4} 
                        style={{ marginInline: 20, marginTop: 0, marginBottom: 0, float: "left", color: 'white'}}>
                    HITS
                </Title>
                <Col flex='auto'>
                    <LeftMenu onClick={onClick} keys={[current]} isAuth={isAuth} userRole={userRole}/>
                </Col>
                <Col flex='auto'>
                    <RightMenu onClick={onClick} keys={[current]} isAuth={isAuth} logout={logoutBtnClick}/>
                </Col>
            </Row>
        </Header>
    );
};

export default Navbar;