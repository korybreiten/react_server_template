import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Container, Stack, Modal } from 'react-bootstrap';

export default function JoinForm({ handleJoin }){
  const [show, setShow] = useState(false);
  const [joinState, setJoinState]  = useState({
    email: '',
    password: '',
    passwordConf: ''
  });

  const navigate = useNavigate();

  function handleClose(){
    setShow(false);
  };

  function handleShow(){
    setShow(true);
  };  

  function handleJoinChange(e){
    setJoinState({
      ...joinState,
      [e.target.name]: e.target.value
    });
  };

  function sendJoin(e){
    e.preventDefault();
    handleJoin(joinState);
    setShow(false);
    navigate('/profile');
  };
    
  return (
    <Container id='joinCont' className="ms-auto">
      <Link className='link' onClick={handleShow}>Join</Link>
      <Form  autoComplete="off">
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Join React_Server_Template!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack>
            <Form.Group>
                <Form.Control                 
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={joinState.email}
                  onChange={handleJoinChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={joinState.password}
                  onChange={handleJoinChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="passwordConf"
                  value={joinState.passwordConf}
                  onChange={handleJoinChange}
                  required
                />
              </Form.Group>
            </Stack>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={sendJoin}>
              Join
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