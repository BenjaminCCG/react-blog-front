import React from 'react';
import MyRoutes from '@/router';
import { useVcosole } from '@hooks/useVconsole';
import Layout from './layout';

// 这个是全局的页面 还可以做一些其他的操作

export default function App() {
  useVcosole();
  return (
    <Layout>
      <MyRoutes />
    </Layout>
  );
}
