import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Card, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCertAction, updateCertAction } from '../../actions/certActions'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import "./SingleCert.css"

function SingleCert() {
  const [name, setName] = useState()
  const [title, setTitle] = useState()
  const [date, setDate] = useState('')
  const [expDate, setExpDate] = useState('')
  const [hash, setHash] = useState()
  const [logo, setLogo] = useState('')
  const [logoMessage, setLogoMessage] = useState()

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const match = useParams()

  const certUpdate = useSelector((state) => state.certUpdate)
  const { loading, error } = certUpdate

  const certDelete = useSelector((state) => state.certDelete)
  const { loading: loadingDelete, error: errorDelete } = certDelete

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCertAction(id))
    }
    navigate('/')
  }

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/certs/${match.id}`)

      setName(data.name)
      setTitle(data.title)
      setDate(data.date)
      setHash(data.hash)
      setLogo(data.logo)
    }
    fetching()
  }, [match.id])

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

  const resetHandler = () => {
    setName('')
    setTitle('')
    setDate('')
    setHash('')
  }

  const updateHandler = (e) => {
    e.preventDefault()
    dispatch(updateCertAction(match.id, name, title, date, hash, logo))
    if (!name || !title || !date || !hash || !logo) return

    resetHandler()
    navigate('/certs')
  }

  return (
    <MainScreen title="Edit a Certificate">
      <Row className="profileContainer">
        <Col md={8}>
          <Card>
            <Card.Header>Edit a Certificate</Card.Header>
            <Card.Body>
              <Form onSubmit={updateHandler}>
                {loadingDelete && <Loading />}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {errorDelete && (
                  <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                )}
                <Form.Group className="settings" controlId="name">
                  <Form.Label className="label">Name of recipient</Form.Label>
                  <Form.Control
                    type="name"
                    value={name}
                    placeholder="Enter the Name of the recipient"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="settings" controlId="title">
                  <Form.Label className="label">Name of Course</Form.Label>
                  <Form.Control
                    type="title"
                    value={title}
                    placeholder="Enter the name of the course"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="settings" controlId="date">
                  <Form.Label className="label">Date</Form.Label>
                  <Form.Control
                    type="string"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="settings" controlId="date">
                  <Form.Label className="label">Expiry Date</Form.Label>
                  <Form.Control
                    type="string"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                  />
                </Form.Group>
                {logoMessage && (
                  <ErrorMessage variant="danger">{logoMessage}</ErrorMessage>
                )}
                <Form.Group className="settings">
                  <Form.Label className="label">Change Logo</Form.Label>
                  <Form.Control
                    onChange={(e) => postDetails(e.target.files[0])}
                    id="custom-file"
                    type="file"
                    label="Change Logo"
                    custom
                  />
                </Form.Group>
                {loading && <Loading size={50} />}
                <Button variant="primary" type="submit">
                  Update Cert
                </Button>
                <Button
                  className="mx-2"
                  variant="danger"
                  onClick={() => deleteHandler(match.id)}
                >
                  Delete Cert
                </Button>
              </Form>
            </Card.Body>

            <Card.Footer className="text-muted">
              Creating on - {new Date().toLocaleDateString()}
            </Card.Footer>
          </Card>
        </Col>
        <Col
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={logo} alt={name} className="logo" />
        </Col>
      </Row>
    </MainScreen>
  )
}

export default SingleCert
