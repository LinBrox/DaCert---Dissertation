import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Row } from 'react-bootstrap'
import './LandingPage.css'

const LandingPage = () => {
  let navigate = useNavigate()

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')

    if (userInfo) {
      navigate('/certs')
    }
  }, [navigate])

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div style={{ backgroundColor: '#191970' }}>
              <h1> Welcome to DaCert </h1>
              <p className="subtitle">
                {' '}
                Do you want to get your academic documents? or simply want to
                verify someone else's?
              </p>
              <p className="subtitle">
                {' '}
                Login/Register to be able to see your own certificates{' '}
              </p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="success"
                  // padding-right="10"
                >
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  padding-right="10"
                  size="lg"
                  className="landingbutton"
                  variant="info"
                >
                  Register
                </Button>
              </a>
              <a href="/verifyCert">
                <Button
                  padding-right="10"
                  size="lg"
                  className="landingbutton"
                  variant="danger"
                >
                  Verify a Cert
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
