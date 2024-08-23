import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Stack, Modal } from 'react-bootstrap';

export default function UpdateProfileForm({ handleUpdateProfile }){
  const [show, setShow] = useState(false);
  const [nameState, setNameState]  = useState({
    firstName: '',
    lastName: '',
  });

  function handleClose(){
    setShow(false);
  };

  function handleShow(){
    setShow(true);
  };  

  function handleUpdateChange(e){
    setNameState({
      ...nameState,
      [e.target.name]: e.target.value
    });
  };

  function sendUpdate(e){
    e.preventDefault();
    handleUpdateProfile(nameState);
    setShow(false);
  };
    
  return (
    <Container id='updateContRight' className="ms-auto">
      <Link className='link' onClick={handleShow}>Update Name</Link>
      <Form  autoComplete="off">
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Update your name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack>
              <Form.Group>
                <Form.Control                 
                  type="username"
                  placeholder="First Name"
                  name="firstName"
                  value={nameState.firstName}
                  onChange={handleUpdateChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Control                 
                  type="username"
                  placeholder="Last Name"
                  name="lastName"
                  value={nameState.lastName}
                  onChange={handleUpdateChange}
                  required
                />
              </Form.Group>
            </Stack>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={sendUpdate}>
              Update
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </Container>        
  );   
}