import React, { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Header = () => {
  const [menu, setMenu] = useState('');
  const navigate = useNavigate();

  const handleLogout=()=>{
    sessionStorage.clear();
    navigate('/login');
  }


  return (
    <>
 <header>
 
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" onClick={()=>window.location.reload()}><img src="./code_2.png"></img></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
        {sessionStorage.getItem("accountId") =="S" ? (
        <li class="nav-item">
        <Link class="nav-link" aria-current="page" to="/StudentTasksList">Assignment list</Link>
        </li>
      ) : (
        <li class="nav-item">
          <Link class="nav-link" aria-current="page" to="/FacultyTasksList">My Task list</Link>
          </li>
      )}
          
         
        </ul>
        <div class="row d-flex  align-items-center">
          <div className="col"> <label class="text-info">{sessionStorage.getItem("userName")}!</label></div>
          <div className="col"><button class="btn btn-outline-success" onClick={handleLogout}>Logout</button></div>
        </div>
      </div>
    </div>
  </nav>
</header>
  </>
  );
};

export default Header;
