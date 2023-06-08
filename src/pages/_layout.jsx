import React from 'react';
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <div>
      {/* Shared layout content */}
      <header>
        {/* Header content */}
        
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