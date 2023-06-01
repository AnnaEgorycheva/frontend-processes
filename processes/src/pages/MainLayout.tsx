import Routes from 'Routes';
import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          {/* вставить header с навигацией*/}
          <Routes/>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
};

export default MainLayout;