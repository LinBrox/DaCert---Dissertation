import React, { useState } from 'react'
import { Aims, Testimonials, Vision } from '../Modals/Modals4Footer'
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from './FooterStyles'


const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <Aims>Aim</Aims>
            <Vision>Vision</Vision>
            <Testimonials>Testimonials</Testimonials>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#">Want To Register As A Admin?</FooterLink>
            <FooterLink href="#">Promotion of Business </FooterLink>
            <FooterLink href="#">Coding a MERN FUll Stack</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">Linton Bryan-Fox</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="https://www.facebook.com/linton.bryanfox.9">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: '10px' }}>Facebook</span>
              </i>
            </FooterLink>
            <FooterLink href="https://www.instagram.com/lintonfox/?hl=en">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: '10px' }}>Instagram</span>
              </i>
            </FooterLink>
            <FooterLink href="https://twitter.com/Linton1992">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: '10px' }}>Twitter</span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  )
}
export default Footer
