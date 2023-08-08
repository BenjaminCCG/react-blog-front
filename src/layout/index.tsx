import React from 'react';
import HeadNav from './HeadNav';
import Footer from './Footer';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <HeadNav />
      <div className=" flex-auto">{props.children}</div>
      <Footer />
    </div>
  );
}
