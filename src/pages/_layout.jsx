import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
const Layout = () => {
  return (
    <div>
      <Header />
      <main class="flex-shrink-0 main-content">
        <div class="">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;