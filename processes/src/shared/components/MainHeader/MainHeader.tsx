import React, { useEffect, useState } from 'react';
import { Header } from 'antd/es/layout/layout';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Col, Row, Tabs } from 'antd';
import { ArrowLeftOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';

interface IProps {
  userName?: string;
}

const MainHeader: React.FC<IProps> = () => {
  const location = useLocation();
  
  return (
    <Header style={{ padding: 0 }}>
        <Row wrap={false}>
            <Col flex='auto'>
                {location.pathname.split('/').length === 2 ? 
                  <>
                    <Link to='students' style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Студенты</Link>
                    <Link to='companies' style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Компании</Link>
                    <Link to='companies' style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Позиции</Link>
                    <Link to='applications' style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Заявки</Link>
                  </>
                : null}
                {location.pathname.split('/').length === 3 ? <Link to={location.pathname.split('/')[1]} style={{marginLeft: 20, color: 'white', fontWeight: 'bold' }}><ArrowLeftOutlined/> Назад</Link> : null}       
            </Col>
            <Col flex='none'>
                <Avatar size="large" style={{ background: '#001529', cursor: 'pointer' }} icon={<BellOutlined />} onClick={()=>{}}/>
                <Link to='profile'>
                    <Avatar size="large" style={{ borderColor: '#ffffff', background: '#001529', marginInline: 20, cursor: 'pointer' }} icon={<UserOutlined />} onClick={()=>{}}/>
                </Link>
            </Col>
        </Row>
    </Header>
  );
};

export default MainHeader;