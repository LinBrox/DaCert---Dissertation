import { Aims, MERN, Promo, Testimonials, Vision, Want_To_Register } from '../Modals/Modals4Footer'
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
            <Want_To_Register>Want to Register</Want_To_Register>
            <Promo>Promotion</Promo>
            <MERN>MERN</MERN>
            
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="/contactUs">Linton Bryan-Fox</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="https://github.com/LinBrox">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: '10px' }}>GitHub</span>
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
