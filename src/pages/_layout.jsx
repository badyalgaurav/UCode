import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {


  return (
    <div>
      {/* Shared layout content */}
      <header>
        {/* Header content */}
        <div class="topnav">
          <a class="logo" href="#">Logo</a>
          <div class="menu-options">
            <h1>HELLO</h1>
          </div>
        </div>
      </header>

      <main>
        {/* Render the child components (pages) */}
        <Outlet />
      </main>

      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default Layout;