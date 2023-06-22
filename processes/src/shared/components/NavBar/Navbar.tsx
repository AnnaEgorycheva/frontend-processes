import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Col, Menu, MenuProps, Row} from 'antd';
import { ArrowLeftOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectUserRole } from 'Store/selectors/AuthSelector';
import { LeftMenuItems } from './MenuItems';

const Navbar: React.FC = () => {
    const location = useLocation()
    const isAuth = useSelector(selectIsAuth)
    const userRole = useSelector(selectUserRole)
    const RightMenuItems = {
        isAuthItems: [
            {
                label: (
                    <Avatar size="large" 
                            style={{fontSize: '24px', borderColor: '#ffffff', background: '#001529', cursor: 'pointer' }} 
                            icon={<BellOutlined />} onClick={()=>{}}
                    />
                ),
                key: 'notifications',
            },
            {
                label: (
                    <Avatar size="large" 
                            style={{ borderColor: '#ffffff', background: '#001529', marginRight: 20, cursor: 'pointer' }} 
                            icon={<UserOutlined />} onClick={()=>{} }
                    />
                ),
                key: 'userMenu',
                children: [
                    {
                        label: (
                            <Link to='profile'>
                                Профиль
                            </Link>
                        ),
                        key: 'profile',
                    },
                    {
                        label: (
                            <Link to='/'>
                                Выйти
                            </Link>
                        ),
                        key: 'logout',
                    },
                ],
              },
    
        ] as MenuProps['items'],
        notIsAuthItems: [
            {
                label: (
                    <Link to='login'>
                        Вход
                    </Link>
                ),
                key: 'login',
            } 
        ] as MenuProps['items']
    }

    let rightMenuItems: MenuProps['items'] = [], leftMenuItems: MenuProps['items'] = []
    if (isAuth) {
        switch (userRole) {
            case 'STUDENT': leftMenuItems = LeftMenuItems.isAuthItems.studentsItems; break
            case 'SCHOOL': leftMenuItems = LeftMenuItems.isAuthItems.schoolItems; break
            case 'COMPANY': leftMenuItems = LeftMenuItems.isAuthItems.companyItems; break
        }
    } else {
        leftMenuItems = LeftMenuItems.notIsAuthItems
    }
    rightMenuItems = isAuth ?  RightMenuItems.isAuthItems : RightMenuItems.notIsAuthItems

    return (
        <Header style={{ padding: 0 }} >
            <Row wrap={false} align="middle" style={{ justifyContent: "space-between" }}>
                <Title level={4} style={{ marginInline: 20, marginTop: 0, marginBottom: 0, float: "left" }}>
                    <Link to='/' style={{ color: 'white', fontWeight: 'bold' }}>
                        HITS
                    </Link>
                </Title>
                <Col flex='auto'>
                    {
                        leftMenuItems?.length !== 0 && <Menu  mode="horizontal" theme="dark" items={leftMenuItems} />
                    }
                </Col>
                <Col flex='auto'>
                    <Menu  mode="horizontal" theme='dark' items={rightMenuItems} style={{ justifyContent: "flex-end" }}/>
                </Col>
            </Row>
        </Header>
    );
};

export default Navbar;

                    {/* {location.pathname.split('/').length === 2 ? 
                    <>
                        <Link to='students' style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Студенты</Link>
                        <Link to='companies' style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Компании</Link>
                        <Link to='positions' style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Позиции</Link>
                        <Link to='applications' style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Заявки</Link>
                    </>
                    : null}
                    {location.pathname.split('/').length === 3 
                        ? 
                            <Link to={location.pathname.split('/')[1]} style={{marginLeft: 20, color: 'white', fontWeight: 'bold' }}>
                                <ArrowLeftOutlined/> Назад
                                </Link> 
                        : null
                    }  */}