import React, { useEffect, useState, useRef } from "react";
const StudentTasksList=()=>{
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <p>Student task list</p>
    </>
  );
};
export default StudentTasksList;