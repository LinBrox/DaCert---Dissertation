import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import MainScreen from "../MainScreen";

const FORM_ENDPOINT = ""; // TODO - fill on the later step

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
        <div className="text-2xl">Thank you!</div>
        <div className="text-md">We'll be in touch soon.</div>
      </>
    );
  }

  return (
    <MainScreen>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Your message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your message"
            name="message"
            required
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Send a message</Button>
        </div>
      </Form>
    </MainScreen>
  );
};

export default ContactForm;
