import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import ProfileAvatarForm from '../Forms/ProfileAvatarForm';
import UpdateEmailForm from '../Forms/UpdateEmailForm';
import UpdatePassForm from '../Forms/UpdatePassForm';
import UpdateNameForm from '../Forms/UpdateNameForm';
import { Button, Container, Stack, Modal } from 'react-bootstrap';

export default function ProfileDisplay({ profileData, handleGetProfile, handleUpdateProfile, handleDeleteProfile }) {
  const [show, setShow] = useState(false);
  

  const navigate = useNavigate();

  function handleCancel(){
    setShow(false);
  };

  function handleShow(){
    setShow(true);
  };

  function sendDelete(e){
    e.preventDefault();
    handleDeleteProfile();
    setShow(false);
    navigate('/');
  };

  const handleMediaQueryChange = (matches) => {
    // matches will be true or false based on the value for the media query
  }

  return (
    <Container id='content'>
    <Container id='profileDisplayCont'>
      <MediaQuery minWidth={701} onChange={handleMediaQueryChange}>
      <Stack direction='horizontal'>
        <Stack id='profileDisplayStack1Left'>
          <ProfileAvatarForm profileData={profileData} handleGetProfile={handleGetProfile} />
        </Stack>
        <Stack id='profileDisplayStack1Right'>
          { profileData ? <h3>User Profile</h3> : <h3>Sign in to see profile</h3> }
          <Stack direction='horizontal'>
            <Container id='updateContLeft'>
              { profileData ? <h5>{profileData.firstName + ' ' + profileData.lastName}</h5> : null }
            </Container>
            <UpdateNameForm handleUpdateProfile={handleUpdateProfile}/>
          </Stack>
          <Stack direction='horizontal'>
            <Container id='updateContLeft'>
              { profileData ? <h5>{profileData.email}</h5> : null }
            </Container>
            <UpdateEmailForm handleUpdateProfile={handleUpdateProfile}/>
          </Stack>
          <Stack direction='horizontal'>
            <Link className='link' id='updateContLeft' onClick={handleShow}>Delete Account</Link>
            <Modal show={show} onHide={handleCancel} >
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h3>Are you sure you want to delete your account?</h3>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='danger' onClick={sendDelete}>
                  DELETE
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
            <UpdatePassForm handleUpdateProfile={handleUpdateProfile}/>
          </Stack>
        </Stack>
      </Stack>
    </MediaQuery>
      <MediaQuery maxWidth={700} onChange={handleMediaQueryChange}>

      <Stack>
        <Stack id='profileDisplayStack1Left'>
          <ProfileAvatarForm profileData={profileData} handleGetProfile={handleGetProfile} />
        </Stack>
        <Stack id='profileDisplayStack1Right'>
          { profileData ? <h3>User Profile</h3> : <h3>Sign in to see profile</h3> }
          <Stack direction='horizontal'>
            <Container id='updateContLeft'>
              { profileData ? <h5>{profileData.firstName + ' ' + profileData.lastName}</h5> : null }
            </Container>
            <UpdateNameForm handleUpdateProfile={handleUpdateProfile}/>
          </Stack>
          <Stack direction='horizontal'>
            <Container id='updateContLeft'>
              { profileData ? <h5>{profileData.email}</h5> : null }
            </Container>
            <UpdateEmailForm handleUpdateProfile={handleUpdateProfile}/>
          </Stack>
          <Stack direction='horizontal'>
            <Link className='link' id='updateContLeft' onClick={handleShow}>Delete Account</Link>
            <Modal show={show} onHide={handleCancel} >
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h3>Are you sure you want to delete your account?</h3>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='danger' onClick={sendDelete}>
                  DELETE
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
            <UpdatePassForm handleUpdateProfile={handleUpdateProfile}/>
          </Stack>
        </Stack>
      </Stack>

      </MediaQuery>
    </Container>
    </Container>
  );
}
