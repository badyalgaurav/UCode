import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";

import "./App.css"; 

// import VideoPlayer from "./components/VideoPlayerWindow";
import VideoPlayer1 from "./components/VideoPlayer1";
import Main from "./pages/main";
import EditorOnly from "./pages/editorOnly";
import Login from "./pages/login/login";
import TaskUploaderForm from "./pages/TaskManagement/taskUploaderForm";
import FacultyTasksList from "./pages/TaskManagement/FacultyTasksList";
import StudentTasksList from "./pages/TaskManagement/StudentTasksList";
import Layout from './pages/_layout';

function Root() {
  const navigate = useNavigate();
  //const [changeState, setChangeState] = useState();

  useEffect(() => {
              if(!sessionStorage.getItem("userId")){
              navigate('/login', { replace: true });
            }
         
  }, []);


  return (
    <div>
      <Routes>
      <Route path="/VideoPlayer1" element={<VideoPlayer1/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Layout/>}>
        <Route path="/main" element={<Main/>} />
        <Route path="/TaskUploaderForm" element={<TaskUploaderForm/>} />
        <Route path="/FacultyTasksList" element={<FacultyTasksList/>} />
        <Route path="/StudentTasksList" element={<StudentTasksList/>} />
        <Route path="/EditorOnly" element={<EditorOnly/>} />
        </Route>
      </Routes>
    </div>);

};

const App = () => {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
};

export default App;
