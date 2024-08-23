import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Stack, Modal } from 'react-bootstrap';

export default function UpdateEmailForm({ handleUpdateProfile }){
  const [show, setShow] = useState(false);
  const [emailState, setEmailState]  = useState({
    email: ''
  });

  function handleClose(){
    setShow(false);
  };

  function handleShow(){
    setShow(true);
  };  

  function handleUpdateChange(e){
    setEmailState({
      ...emailState,
      [e.target.name]: e.target.value
    });
  };

  function sendUpdate(e){
    e.preventDefault();
    handleUpdateProfile(emailState);
    setShow(false);
  };
    
  return (
    <Container id='updateContRight' className="ms-auto">
      <Link className='link' onClick={handleShow}>Update Email</Link>
      <Form  autoComplete="off">
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Update your email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack>
              <Form.Group>
                <Form.Control                 
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={emailState.email}
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