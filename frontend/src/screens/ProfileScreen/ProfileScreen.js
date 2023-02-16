import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Card, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { updateProfile } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'
import './ProfileScreen.css'
import Web3 from 'web3'

const ProfileScreen = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pic, setPic] = useState('')
  const [walletID, setWalletID] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [picMessage, setPicMessage] = useState()
  const [web3, setWeb3] = useState(null)
  const [connected, setConnected] = useState(false)
  const [accounts, setAccounts] = useState([])

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading, error, success } = userUpdate

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      setName(userInfo.name)
      setEmail(userInfo.email)
      setPic(userInfo.pic)
      setWalletID(userInfo.walletID)
    }
  }, [navigate, userInfo])

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

  const submitHandler = (e) => {
    e.preventDefault()

    if (password === confirmPassword)
      dispatch(updateProfile({ name, email, password, pic, walletID }))
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
    <MainScreen title="Edit Profile">
      <Row className="profileContainer">
        <Col md={8}>
          <Card style={{ width: '60rem' }}>
            <Card.Header>
              Make sure to change all details & not leave fields blank
            </Card.Header>
            <Card.Body display="flex">
              <Form className="settings" onSubmit={submitHandler}>
                {loading && <Loading />}
                {success && (
                  <ErrorMessage variant="success">
                    Updated Successfully
                  </ErrorMessage>
                )}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group controlId="name">
                  <Form.Label>Name: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address: </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password: </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="walletID">
                  <Form.Label>Wallet ID Connected to Account </Form.Label>
                  <Form.Control
                    type="text"
                    value={accounts[0]}
                    placeholder={walletID}
                    onChange={(e) => setWalletID(e.target.value)}
                  />
                </Form.Group>
                {''}
                {picMessage && (
                  <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                <Form.Group>
                  <Form.Label>Change Profile Picture: </Form.Label>
                  <Form.Control
                    onChange={(e) => postDetails(e.target.files[0])}
                    id="custom-file"
                    type="file"
                    label="Upload Profile Picture"
                    custom
                  />
                </Form.Group>
                <Button varient="primary" onClick={connectMetaMask}>
                  Click Here to sync Wallet
                </Button>
                <Button type="submit" varient="primary">
                  Update
                </Button>
              </Form>
            </Card.Body>
            <Col
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={pic} alt={name} className="profilePic" />
            </Col>
          </Card>
        </Col>
      </Row>
    </MainScreen>
  )
}

export default ProfileScreen
