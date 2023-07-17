import React, { useEffect, useState, useRef } from "react";
import '../login/signin.css'
const Login=()=>{
    return(<>
    <div class="text-center">
    <main class="form-signin">
    <form>
    <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"></img>
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
  
      <div class="form-floating mb-2">
        <input type="email" class="form-control" id="txtEmail" placeholder="name@example.com"></input>
        <label>Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="txtPassword" placeholder="Password"></input>
        <label>Password</label>
      </div>
  
     
      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
    </form>
  </main>
  </div>
  </>)
}
export default Login;