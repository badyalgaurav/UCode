import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const FacultyTasksList=()=>{
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const handleMainPageNavigate=()=>{
    const params = {
        itemId: 86,
        otherParam: 'anything you want here',
      };
      navigate('/main', { state: { id: 7, color: 'green' } });
      console.log('Navigating to Main with params:', params);
    //   navigate('/main', params);
}
  return (
    <>
    <p>Faculty task list</p>
    <button onClick={handleMainPageNavigate}>Click to go main page</button>
    </>
  );
};
export default FacultyTasksList;