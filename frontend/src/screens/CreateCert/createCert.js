import React, { useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createCertAction } from '../../actions/certActions'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import { useLocation } from 'react-router-dom';

let contract

const CreateCert = () => {
  //VARIABLES
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [expDate, setExpDate] = useState('')
  const [hash, setHash] = useState('')
  const [_id, set_ID] = useState('')
  const [logo, setLogo] = useState(
    'https://icon-library.com/images/super-man-icon/super-man-icon-10.jpg',
  )
  const [logoMessage, setLogoMessage] = useState(null)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const certCreate = useSelector((state) => state.certCreate)
  const { loading, error } = certCreate

  //Users Session
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  //FUNCTIONS
  const resetHandler = () => {
    setName('')
    setTitle('')
    setDate('')
    setHash('')
  }

  const postDetails = (logos) => {
    setLogoMessage(null)
    if (!logos) {
      return setLogoMessage('Please Select an Image')
    }
    setLogoMessage(null)

    if (logos.type === 'image/jpeg' || logos.type === 'image/png') {
      const data = new FormData()
      data.append('file', logos)
      data.append('upload_preset', 'BCertPICLIB')
      data.append('cloud_name', 'Linton Fox')
      fetch('https://api.cloudinary.com/v1_1/linbrox/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setLogo(data.url.toString())
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      return setLogoMessage('Please Select an Image')
    }
  }

  const addtoBlockchain = (e) => {
    // CSet Variables for the Smart Contract i.e ABI, The smart contract address
    const Address = '0x091d7Dd5737f34990B417D048B6f7075FfbBA146'
    const ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"_certificateId","type":"bytes32"}],"name":"certificateGenerated","type":"event"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"certificates","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"date","type":"uint256"},{"internalType":"uint256","name":"expDate","type":"uint256"},{"internalType":"bytes32","name":"byte_id","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_title","type":"string"},{"internalType":"uint256","name":"_date","type":"uint256"},{"internalType":"uint256","name":"_expDate","type":"uint256"}],"name":"generateCertificate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes","name":"_id","type":"bytes"}],"name":"getData","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}]
    //code to connect the smart contract privider sets the connect - Signer signs messages and sends transactions wallet is signer - contract is the defintion of what contract to use (ABI + ADDRESS + SIGNER)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    contract = new ethers.Contract(Address, ABI, signer)
    contract.on('certificateGenerated', (certificateId) => {
      console.log('Certificate generated: ', certificateId)
      set_ID(certificateId)
    })

    //the data needed to complete the block on the blockchain
    const _name = name
    const _title = title
    const _date = date
    const _expDate = expDate
    const certData = contract
      .generateCertificate(_name, _title, _date, _expDate)
      .then((transaction) => {
        console.log('Transaction successful: ', transaction)
      })
      .catch((error) => {
        console.error('Transaction error: ', error)
      })
    return certData
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const hash = _id
    dispatch(createCertAction(name, title, date, hash, logo))
    if (!name || !title || !date || !hash || !logo) return

    // resetHandler()
    // navigate('/certs')
    // navigate(0)
  }

  return (
    <MainScreen title="Create a new Cert">
      <Card>
        <Card.Header>Create a new Cert</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="name">
              <Form.Label>Name of recipient</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter the Name of the recipient"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Name of Course</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the name of the course"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="name"
                value={date}
                placeholder="The Date the recipient earned the Cert"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="ExpiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="name"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
            </Form.Group>
            {logoMessage && (
              <ErrorMessage variant="danger">{logoMessage}</ErrorMessage>
            )}
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Logo</Form.Label>
              <Form.Control
                type="file"
                size="lg"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </Form.Group>
            <Button
              className="btn btn-primary btn-lg btn-block"
              onClick={addtoBlockchain}
            >
              Push To BlockChain
            </Button>
            <Button
              className="btn btn-primary btn-lg btn-block"
              type="submit"
              variant="primary"
            >
              Save Certificate
            </Button>
            {loading && <Loading size={50} />}
            <Button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={resetHandler}
              variant="danger"
            >
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Created on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  )
}

export default CreateCert