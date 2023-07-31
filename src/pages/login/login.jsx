import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { pythonapi } from "../../components/common"
import '../login/signin.css'

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const handleButtonClick = async () => {
    debugger;

    const userName = document.getElementById("txtEmail").value;
    const password = document.getElementById("txtPassword").value;
    const response = await axios.get(`http://127.0.0.1:8000/user_content_management/login`, {
      params: {
        // Pass the parameters as an object
        username: userName,
        password: password,
      },
    });
    debugger;
    if(response.status ==200){
      localStorage.setItem("userName", response.data.data[0].userName);
      localStorage.setItem("userId",   response.data.data[0]._id);
      
      if(response.data.data[0].accuntId=="S"){
      localStorage.setItem("classId",   response.data.data[0].classId);
      }
      navigate('/main');
    }
    else{
      alert("email or password doesn't exist")
    }
  
  };
  return (<>
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
          <p class="mt-5 mb-3 text-muted">&copy; 2023</p>
        </form>
      </main>
    </div>
  </>)
}
export default Login;