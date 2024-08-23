import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import LoginForm from '../components/Forms/LoginForm';
import JoinForm from '../components/Forms/JoinForm';

import { Image, Button, Form, Container, Stack, Offcanvas } from 'react-bootstrap';

import '../styles/Navbar.css';
import '../styles/Content.css';

export default function Header({ profileData, handleJoin, handleLogin, handleLogout, handleSearch, handleClearSearch }){
    const [active, setActive] = useState('');
    const [show, setShow] = useState(false);
    const [searchState, setSearchState]  = useState({keyword: ''});
    
    const navigate = useNavigate();

    function handleClose(button){
        setActive(button);
        setShow(false);
    };
    
    function handleShow(){
        setShow(true);
    };  

    function handleSearchChange(e){
        setSearchState({
            ...searchState,
            [e.target.name]: e.target.value
        });
    };

    function sendSearch(e){
        e.preventDefault();
        handleSearch(searchState);
        navigate('/');
    };

    function sendClearSearch(){
        setSearchState({keyword: ''});
        handleClearSearch();
    };

    const handleMediaQueryChange = (matches) => {
        // matches will be true or false based on the value for the media query
    }

    // 320px — 480px: Mobile devices
    // 481px — 768px: iPads, Tablets
    // 769px — 1024px: Small screens, laptops
    // 1025px — 1200px: Desktops, large screens
    // 1201px and more —  Extra large screens, TV

    return (
        <Container id='navCont'>
            <Container id="navUpper">
                <Stack direction="horizontal">
                    <Link id="logo" to={'/'}>React Server Template</Link>

                    <MediaQuery minWidth={701} onChange={handleMediaQueryChange}>
                        {!profileData ? <JoinForm handleJoin={handleJoin} /> : <Container className='ms-auto' /> }
                        {!profileData ? <LoginForm handleLogin={handleLogin} /> : <Link className="link" to={'/'} onClick={ handleLogout }>Logout</Link> }
                        {!profileData ? null : !profileData.avatar ?
                            <Link className="link" to={'/profile'}><Image src={ '/icons/profile.svg' } alt='' id='avatar' /></Link>
                        :
                            <Link className="link" to={'/profile'}><Image src={ '../' + profileData.avatar } alt='' id='avatar' /></Link>
                        }
                    </MediaQuery>
                    
                    <MediaQuery maxWidth={700} onChange={handleMediaQueryChange}>
                    <Container className='ms-auto' />
                        <Container id='hamburger'>

                        <Button  id='hamButton' variant="none" onClick={handleShow}>
                            <Image id='hamIcon' src={ '/icons/list.svg' } alt='' />
                        </Button>

                        <Offcanvas show={show} placement='end' onHide={handleClose}>
                            <Offcanvas.Header id='hamHeader'>
                                {!profileData ? <JoinForm handleJoin={handleJoin} /> : <Container className='ms-auto' /> }
                                {!profileData ? <LoginForm handleLogin={handleLogin} /> : <Link className="link" to={'/'} onClick={ handleLogout }>Logout</Link> }
                                {!profileData ? null : !profileData.avatar ?
                                    <Link className="link" to={'/profile'} onClick={() => handleClose()}><Image src={ '/icons/profile.svg' } alt='' id='avatar' /></Link>
                                :
                                    <Link className="link" to={'/profile'} onClick={() => handleClose()}><Image src={ '../' + profileData.avatar } alt='' id='avatar' /></Link>
                                }
                                <Container className='ms-auto'></Container>
                                <Button variant='none' onClick={handleClose}>
                                    <Image src={ '/icons/close.svg' } alt='' />
                                </Button>
                            </Offcanvas.Header>
                            <Offcanvas.Body id='hamBody'>
                                <Stack>
                                    <Link id="link" to={'/Services'}>
                                        <Button style={{padding: '0 1.5rem 0 1.5rem', fontSize: '1.5rem'}} onClick={() => handleClose('services')} active={active === 'services'}>Services</Button>
                                    </Link>
                                    <Link id="link" to={'/Gallery'}>
                                        <Button style={{padding: '0 1.5rem 0 1.5rem', fontSize: '1.5rem'}} onClick={() => handleClose('gallery')} active={active === 'gallery'}>Gallery</Button>
                                    </Link>
                                    <Link id="link" to={'/About'}>
                                        <Button style={{padding: '0 1.5rem 0 1.5rem', fontSize: '1.5rem'}} onClick={() => handleClose('about')} active={active === 'about'}>About</Button>
                                    </Link>
                                </Stack>
                            </Offcanvas.Body>
                        </Offcanvas>

                        </Container>
                    </MediaQuery>
                </Stack>
            </Container>
            <Container id="navLower">
                <Stack direction='horizontal'>
                    <Stack direction='horizontal'  id='searchCont'>
                        <Form autoComplete="off" onSubmit={sendSearch}>
                            <Form.Group>
                                <Form.Control
                                    id="searchBar"
                                    type="text"
                                    placeholder="Search"
                                    name="keyword"
                                    value={searchState.keyword}
                                    onChange={handleSearchChange}
                                />
                            </Form.Group>
                        </Form>
                        { searchState.keyword !== '' ? <Button id='clearSearch' onClick={ sendClearSearch }>X</Button> : <div id='searchBlank' /> }
                    </Stack>
                    <MediaQuery minWidth={701} onChange={handleMediaQueryChange}>
                        <Stack id='navLinks' direction="horizontal">
                            <Link id="link" to={'/Services'}>
                                <Button style={{padding: '0 1.5rem 0 1.5rem', fontSize: '1.5rem'}} onClick={() => setActive('causes')} active={active === 'causes'}>Services</Button>
                            </Link>
                            <Link id="link" to={'/Gallery'}>
                                <Button style={{padding: '0 1.5rem 0 1.5rem', fontSize: '1.5rem'}} onClick={() => setActive('artists')} active={active === 'artists'}>Gallery</Button>
                            </Link>
                            <Link id="link" to={'/About'}>
                                <Button style={{padding: '0 1.5rem 0 1.5rem', fontSize: '1.5rem'}} onClick={() => setActive('auctions')} active={active === 'auctions'}>About</Button>
                            </Link>
                        </Stack>
                    </MediaQuery>
                </Stack>
            </Container>
        </Container>
    )
}