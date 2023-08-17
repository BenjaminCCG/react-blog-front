import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'virtual:windi.css';
import 'amfe-flexible';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#97dffd'
      }
    }}
  >
    <BrowserRouter basename={import.meta.env.VITE_PUBLIC_PATH as string}>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
