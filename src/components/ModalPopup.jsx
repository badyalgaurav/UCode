import React, { useEffect, useState, useRef } from "react";
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios';
import pythonapi from "../components/common"
const ModalPopup=(props)=>{
  const [classData, setClassData] = useState([]);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

  useEffect(() => {
    // Fetch data from the server using Axios
    axios.get(`${pythonapi}user_content_management/class_list`)
      .then(response => {
        setClassData(response.data.data); // Assuming the response is an array of objects
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <>
      {/* <Button variant="primary" onClick={props.handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"black"}}>Save info</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:"black"}}>
        <form action="">
        <label>Program</label>
        <input type="text" id="taskName" className="form-control mt-2" placeholder="Program Name"></input>
        
        <label>program video</label>

        <input type="file" id="videoFileInput" className="form-control mt-2" placeholder="your video"></input>

        <label htmlFor="selectClass">Class</label>
        <select className="mt-2"  id="selectClass" style={{width:"100%"}}>
        <option value="">Select an option</option>
        {classData.map(item => (
          <option key={item._id} value={item._id}>
            {item.class+"_"+item.section} {/* Assuming 'name' is a property in the data objects */}
          </option>
        ))}
      </select>
      <label>Description</label>
        <textarea id="description" className="form-control mt-2" rows={5} placeholder="Description"></textarea>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalPopup;