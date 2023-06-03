import React, { useEffect, useState } from 'react';
import { Header } from 'antd/es/layout/layout';
import { Link, useLocation } from 'react-router-dom';
import { Col, Row, Tabs } from 'antd';

interface IProps {
  userName?: string;
}

const MainHeader: React.FC<IProps> = () => {
  const location = useLocation();
  console.log(location.pathname.split('/'));
  
  return (
    <Header style={{ padding: 0 }}>
        <Row wrap={false}>
            <Col flex='auto'>
                <Link to='students' style={{marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Студенты</Link>
                <Link to='companies' style={{marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Компании</Link>
                <Link to='companies' style={{marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Позиции</Link>
                <Link to='companies' style={{marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Мои заявки</Link>
                <Link to={location.pathname.split('/')[1]} style={{marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Назад</Link>        
            </Col>
            <Col flex='none'>
                <div style={{ color: 'white', marginRight: 20 }}>user</div>
            </Col>
        </Row>
    </Header>
  );
};

export default MainHeader;