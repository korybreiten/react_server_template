import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Stack, Modal } from 'react-bootstrap';

export default function UpdateProfileForm({ handleUpdateProfile }){
  const [show, setShow] = useState(false);
  const [passState, setPassState]  = useState({
    password: '',
    passwordConf: '',
  });

  function handleClose(){
    setShow(false);
  };

  function handleShow(){
    setShow(true);
  };  

  function handleUpdateChange(e){
    setPassState({
      ...passState,
      [e.target.name]: e.target.value
    });
  };

  function sendUpdate(e){
    e.preventDefault();
    handleUpdateProfile(passState);
    setShow(false);
  };
    
  return (
    <Container id='updateContRight' className="ms-auto">
      <Link className='link' onClick={handleShow}>Update Password</Link>
      <Form  autoComplete="off">
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Update your password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={passState.password}
                  onChange={handleUpdateChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="passwordConf"
                  value={passState.passwordConf}
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