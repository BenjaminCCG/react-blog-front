import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '@/views/Home';
import About from '@/views/About';
import Life from '@/views/Life';
import Message from '@/views/Message';
import Article from '@/views/Article';
export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/life',
      element: <Life />
    },
    {
      path: '/message',
      element: <Message />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/article',
      element: <Article />
    }
  ]);
}
