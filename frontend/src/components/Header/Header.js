import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
import "./Header.css"
const Header = ({ setSearch }) => {
  let navigate = useNavigate()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = async() => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/"> DaCert</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        {userInfo ? (
          <Nav className="m-auto">
            <Form inline>
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
        ) : null}
          {userInfo ? (
            <Nav>
              <Nav.Link>
                <Link to="/certs">My Certificates</Link>
              </Nav.Link>
              <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile"> My Profile </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  {' '}
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
