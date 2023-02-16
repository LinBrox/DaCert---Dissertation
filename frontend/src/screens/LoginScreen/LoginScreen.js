import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import MainScreen from '../../components/MainScreen'
import './LoginScreen.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'
import Web3 from 'web3'

const LoginScreen = ({}) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const [account, setAccount] = useState()

  let navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate('/certs')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault(e)
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
      const accounts = await web3.eth.requestAccounts()

      setAccount(accounts[0])
    }
    load()
    dispatch(login(email, password))
  }

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New User ? <Link to="/register"> Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default LoginScreen
