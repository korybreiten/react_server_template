import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Content from '../layouts/Content';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import ProfileDisplay from '../components/Displays/ProfileDisplay';
import ServicesDisplay from '../components/Displays/ServicesDisplay';
import GalleryDisplay from '../components/Displays/GalleryDisplay';
import AboutDisplay from '../components/Displays/AboutDisplay';
import searchService from '../utils/searchService';
import userService from '../utils/userService';

import { Container, Stack, ThemeProvider } from 'react-bootstrap';


function App() {
  const [profileData, setProfileData] = useState();
  
  const [searchError, setSearchError ] = useState('');

  const [results, setResults] = useState([]);

  async function handleJoin(joinState){
    try {
      await userService.join(joinState);
      handleGetProfile();
    } catch (err) {
      console.log(err.message);
    };
  };

  async function handleLogin(logState){
    try {
      await userService.login(logState);
      handleGetProfile();
    } catch (err) {
      console.log(err.message);
    };
  };

  function handleLogout(){
    userService.logout();
    setProfileData();
    setResults([]);
  };

  async function handleGetProfile(){
    try {
      const user = await userService.getOne(userService.getToken());
      setProfileData(user);
    } catch (err) {
      console.log(err.message);
    };
  };

  async function handleUpdateProfile(formData){
    try {
      await userService.update(formData);
      handleGetProfile();
    } catch (err) {
      console.log(err.message);
    };
  };

  async function handleDeleteProfile(){
    try {
      await userService.deleteProfile();
      handleLogout();
    } catch (err) {
      console.log(err.message);
    };
  };

  async function handleSearch(formData) {
    try {
      if (formData.keyword === '') {
        setResults([]);
      } else {
        const data = await searchService.search(formData);
        setResults(data);
      }
    } catch (err) {
      console.log(err.message);
      setSearchError(err.message);
    };
  };

  function handleClearSearch() {
    setResults([]);
  };

  useEffect(() => {
    handleGetProfile();
  }, [])

  return (
    <Container>
      <Router>
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
          <Stack>
            <Navbar profileData={profileData} handleJoin={handleJoin} handleLogin={handleLogin} handleLogout={handleLogout} handleSearch={handleSearch} handleClearSearch={handleClearSearch} />
            <Routes>
              <Route path='/' element={ <Content results={results} searchError={searchError} /> } />
              <Route path='/profile' element={ <ProfileDisplay profileData={profileData} handleGetProfile={handleGetProfile} handleUpdateProfile={handleUpdateProfile} handleDeleteProfile={handleDeleteProfile} /> } />
              <Route path='/services' element={ <ServicesDisplay />} />
              <Route path='/gallery' element={ <GalleryDisplay />} />
              <Route path='/about' element={ <AboutDisplay />} />
            </Routes>
            <Footer />
          </Stack>
        </ThemeProvider>
      </Router>
    </Container>
  );
};

export default App;