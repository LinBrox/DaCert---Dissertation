import { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import MainScreen from '../../components/MainScreen'
import Web3 from 'web3'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

const RegisterScreen = () => {
  const [web3, setWeb3] = useState(null)
  const [connected, setConnected] = useState(false)
  const [accounts, setAccounts] = useState([])

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [walletID, setWalletID] = useState('')
  const [pic, setPic] = useState(
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  )
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [picMessage, setPicMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  let navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate('/certs')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password, pic, walletID))
    }
  }

  const postDetails = (pics) => {
    setPicMessage(null)
    if (!pics) {
      return setPicMessage('Please Select an Image')
    }
    setPicMessage(null)

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'BCertPICLIB')
      data.append('cloud_name', 'Linton Fox')
      fetch('https://api.cloudinary.com/v1_1/linbrox/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setPic(data.url.toString())
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      return setPicMessage('Please Select an Image')
    }
  }
  const connectMetaMask = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider)
      await window.ethereum.enable()
      const accounts = await web3.eth.getAccounts()
      setWeb3(web3)
      setConnected(true)
      setAccounts(accounts)
      setWalletID(accounts[0]) // <-- set the walletID to the first account retrieved from MetaMask
    } catch (error) {
      console.error(error)
    }
    console.log(accounts[0])
  }

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>
              Name{' '}
              {name ? (
                <FaThumbsUp style={{ color: 'green', marginLeft: 10 }} />
              ) : (
                <FaThumbsDown style={{ color: 'red', marginLeft: 10 }} />
              )}
            </Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              Email Address{' '}
              {email ? (
                <FaThumbsUp style={{ color: 'green', marginLeft: 10 }} />
              ) : (
                <FaThumbsDown style={{ color: 'red', marginLeft: 10 }} />
              )}
            </Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password{' '}
              {password ? (
                <FaThumbsUp style={{ color: 'green', marginLeft: 10 }} />
              ) : (
                <FaThumbsDown style={{ color: 'red', marginLeft: 10 }} />
              )}</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password{' '}
              {confirmPassword ? (
                <FaThumbsUp style={{ color: 'green', marginLeft: 10 }} />
              ) : (
                <FaThumbsDown style={{ color: 'red', marginLeft: 10 }} />
              )}</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              size="lg"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </Form.Group>
          <div style={{ display: 'flex' }}>
            <Form.Group controlId="walletID">
              <Button
                onClick={connectMetaMask}
                style={{ marginLeft: 10, marginBottom: 6 }}
                size="lg"
              >
                Click Here to sync Wallet{' '}
              </Button>
              {walletID ? (
                <FaThumbsUp style={{ color: 'green', marginLeft: 10 }} />
              ) : (
                <FaThumbsDown style={{ color: 'red', marginLeft: 10 }} />
              )}
            </Form.Group>
          </div>
          <Button
            variant="primary"
            type="submit"
            size="lg"
            style={{ marginLeft: 10, marginBottom: 6 }}
          >
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default RegisterScreen
