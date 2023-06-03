import Routes from 'Routes';
import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainHeader from 'shared/components/MainHeader/MainHeader';

const MainLayout: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <MainHeader/>
        <Routes/>
      </Layout>
    </BrowserRouter>
  )
};

export default MainLayout;