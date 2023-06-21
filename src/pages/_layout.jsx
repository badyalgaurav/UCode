import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
const Layout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>

      <main class="flex-shrink-0">
        <div class="container-fluid">
          <Outlet />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;