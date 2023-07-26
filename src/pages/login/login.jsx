import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import '../login/signin.css'
const Login=()=>{
  const navigate = useNavigate();
  const handleButtonClick = () => {
    localStorage.setItem("userName","garry");
    localStorage.setItem("userId","1");
    navigate('/main');
  };
    return(<>
    <div class="text-center center-screen">
    <main class="form-signin">
    <form>
    <img class="mb-4" src="./logo.png" alt="" width="90" height="80"></img>
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
  
      <div class="form-floating mb-2">
        <input type="email" class="form-control" id="txtEmail" placeholder="name@example.com"></input>
        <label className="sign-in-label">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="txtPassword" placeholder="Password"></input>
        <label className="sign-in-label">Password</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit" onClick={handleButtonClick}>Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
    </form>
  </main>
  </div>
  </>)
}
export default Login;