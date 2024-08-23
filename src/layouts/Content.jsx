import React from 'react';
import SearchResults from '../components/Displays/SearchDisplay';
import { Container, Stack } from 'react-bootstrap';
import '../styles/Content.css';

export default function Content({ results, searchError, sendGetUser }){

  return (
    <Container id="content">
      <Stack>
        <SearchResults results={results} searchError={searchError} sendGetUser={sendGetUser} />
      </Stack>
    </Container>
  )
}