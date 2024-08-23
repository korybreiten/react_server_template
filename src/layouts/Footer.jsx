import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Container, Stack } from 'react-bootstrap';
import '../styles/Footer.css';

export default function Footer(){

    return (
        <Container>
            <Stack>
            <Container id='footerSpacing'></Container>
            <Container id='footerCont'>
                <Stack direction="horizontal">
                    <Image id='footerLogoIcon' src='/icons/favicon.ico' />
                    <Link id="footerLogo" to={'/'}>React Server Template</Link>
                </Stack>
            </Container>
            </Stack>
        </Container>
    )
}