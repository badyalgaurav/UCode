import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import pythonapi from "../../components/common"
import '../login/signin.css'

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const handleButtonClick = async () => {
    debugger;

    const email = document.getElementById("txtEmail").value;
    const password = document.getElementById("txtPassword").value;
    try{
      const response = await axios.get(`${pythonapi}user_content_management/login`, {
        params: {
          // Pass the parameters as an object
          email: email,
          password: password,
        },
      });
      debugger;
    if(response.status ==200){
      localStorage.setItem("userName", response.data.data.userName);
      localStorage.setItem("userId",   response.data.data._id);
      
      if(response.data.data.accountId=="S"){
      localStorage.setItem("classId",   response.data.data.classId);
      navigate('/StudentTasksList');
      }
      else{
        navigate('/FacultyTasksList');
      }
    }
    else{
      alert("email or password doesn't exist")
    }
    }
    catch(error){
      console.log(error);
    }
    
  
  };
  return (<>
    <div class="text-center center-screen">
      <div class="form-signin">
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
          <button class="w-100 btn btn-lg btn-primary" type="button" onClick={handleButtonClick}>Sign in</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2023</p>
        </form>
      </div>
    </div>
  </>)
}
export default Login;