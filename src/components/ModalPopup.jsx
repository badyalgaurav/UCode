import React, { useEffect, useState, useRef } from "react";
import { Modal, Button } from 'react-bootstrap'
const ModalPopup=(props)=>{
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

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
        <input type="text" className="form-control mt-2" placeholder="Program Name"></input>
        <label>program video</label>

        <input type="file" className="form-control mt-2" placeholder="your video"></input>

        <label htmlFor="selectClass">Class</label>
        <select name="form-control" className="mt-2" id="selectClass" style={{width:"100%"}}>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
        </select>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalPopup;