import Routes from 'Routes';
import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from 'shared/components/NavBar/Navbar';

const MainLayout: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Navbar/>
        <Routes/>
      </Layout>
    </BrowserRouter>
  )
};

export default MainLayout;