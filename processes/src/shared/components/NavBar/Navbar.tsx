import React, { useEffect, useState } from 'react';
import { Header } from 'antd/es/layout/layout';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Col, Row, Tabs } from 'antd';
import { ArrowLeftOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';

interface IProps {
  userName?: string;
}

const Navbar: React.FC<IProps> = () => {
  const location = useLocation();
  
  return (
    <Header style={{ padding: 0 }} >
        <Row wrap={false} align="middle">
            <Col flex='none'>
                <Title level={4} style={{ marginLeft: 20, marginTop: 0, marginBottom: 0 }}>
                    <Link to='/' style={{ color: 'white', fontWeight: 'bold' }}>
                        HITS
                    </Link>
                </Title> 
            </Col>
            <Col flex='auto'>
                <LeftMenu/>
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
            </Col>
            <Col flex='none'>
                <RightMenu/>
            </Col>
        </Row>
    </Header>
  );
};

export default Navbar;