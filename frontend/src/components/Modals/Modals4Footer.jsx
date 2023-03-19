import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

export function Aims() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Aims
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-primary">Aims</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            DaCert is a website that utilizes Blockchain technology to create
            and issue certificates for students, which are then stored onto the
            Blockchain. The aim of the website is to provide a tamper-proof and
            transparent certification system for students and employers alike.
            By leveraging the inherent security and immutability of Blockchain
            technology, DaCert can create digital certificates that cannot be
            modified, forged, or duplicated.
          </p>
          <p className="text-muted">
            The benefits of using Blockchain technology for certification are
            numerous. Firstly, the decentralized nature of Blockchain means that
            there is no need for a central authority to issue certificates,
            reducing the risk of fraud and corruption. Additionally, the
            transparency of Blockchain technology means that anyone can verify
            the authenticity of a certificate, providing employers with
            confidence in the qualifications of their potential employees.
            Furthermore, the tamper-proof nature of Blockchain technology means
            that certificates cannot be modified or deleted once they are stored
            on the Blockchain, providing long-term security and reliability.
          </p>
          <p className="text-muted">
            In addition to the benefits for employers, Blockchain-based
            certification also provides benefits for students. Certificates
            issued through DaCert can be easily accessed and shared, allowing
            students to showcase their qualifications to potential employers and
            educational institutions. Additionally, the use of Blockchain
            technology means that certificates can be issued quickly and
            efficiently, reducing the time and administrative burden of
            traditional certification methods.
          </p>
          <p className="text-muted">
            Overall, DaCert is an innovative website that utilizes the power of
            Blockchain technology to provide secure and transparent
            certification for students and employers alike. By leveraging the
            benefits of Blockchain, DaCert is helping to create a more
            efficient, reliable, and trustworthy certification system for the
            digital age.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export function Vision() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Vision
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Vision</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading the Vision Footer</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export function Testimonials() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Testimonials
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Testimonials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                "I was blown away by how easy it was to get my digital
                certificate through DaCert. The entire process was seamless and
                I love the peace of mind knowing that my certification is
                securely stored on the Blockchain."
              </p>
              <footer className="blockquote-footer">Sarah R.</footer>
            </blockquote>
          </div>
          <div>
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                "As an employer, I appreciate the transparency that DaCert
                provides. Being able to easily verify the qualifications of
                potential hires is a game-changer, and it gives me confidence
                that I'm making informed hiring decisions."
              </p>
              <footer className="blockquote-footer">John L.</footer>
            </blockquote>
          </div>
          <div>
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                "DaCert has revolutionized the certification process. No more
                waiting weeks for paper certificates to arrive in the mail with
                DaCert, I was able to access my digital certificate instantly,
                and I can easily share it with anyone who needs to see it."
              </p>
              <footer className="blockquote-footer">David M.</footer>
            </blockquote>
          </div>
          <div>
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                "I was skeptical about using a Blockchain-based certification
                system at first, but DaCert won me over with their user-friendly
                platform and rock-solid security measures. I'm confident that my
                certification is safe and trustworthy thanks to DaCert."
              </p>
              <footer className="blockquote-footer">Emily S.</footer>
            </blockquote>
          </div>
          <div>
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                "DaCert is a game-changer for the education industry. By using
                Blockchain technology to issue and verify certifications,
                they're helping to create a more transparent and efficient
                system that benefits both students and employers."
              </p>
              <footer className="blockquote-footer">Alex K.</footer>
            </blockquote>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export function Want_To_Register() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sign Up?{' '}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Want To Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Link to="/register">You want to register click here</Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export function Promo() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        REACT
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-primary">REACT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            React is a popular and powerful JavaScript library used for building
            user interfaces. It allows developers to create complex applications
            with reusable components, making development more efficient and
            scalable. There are several reasons why React is considered one of
            the best front-end frameworks available today.
          </p>
          <p className="text-muted">
            One of the main advantages of React is its simplicity. The library
            follows a component-based architecture, which means that UI elements
            are divided into smaller, reusable components. This makes it easy to
            maintain and update code, as changes made to one component can be
            applied across the entire application.
          </p>
          <p className="text-muted">
            Another key benefit of React is its performance. React is built to
            be fast and efficient, with virtual DOM (Document Object Model)
            rendering that minimizes the need for actual DOM manipulation. This
            leads to faster load times and a smoother user experience, even on
            larger and more complex applications.
          </p>
          <p className="text-muted">
            React is also highly customizable, with a large ecosystem of
            third-party libraries and tools available to developers. This allows
            developers to extend the functionality of React and build more
            complex applications with ease. Additionally, React is compatible
            with a wide range of back-end technologies, making it a flexible
            choice for web development.
          </p>
          <p>
            Finally, React is backed by Facebook, one of the largest and most
            innovative tech companies in the world. This means that the library
            is constantly evolving and improving, with frequent updates and
            releases to keep up with the latest web development trends.
          </p>
          <p>
            In conclusion, React is a powerful and versatile front-end framework
            that offers a range of benefits to developers. Its simplicity,
            performance, flexibility, and strong support from Facebook make it a
            top choice for building complex and scalable web applications.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export function MERN() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div id="my-modal">
      <Button variant="primary" onClick={handleShow}>
        Coding A MERN Full Stack
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-primary">MERN Full Stack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            The MERN stack is a powerful combination of technologies that has
            gained popularity in recent years due to its ability to create fast,
            efficient, and scalable web applications. MERN stands for MongoDB,
            Express.js, React, and Node.js, which are all open-source
            technologies that work seamlessly together to provide a robust
            development environment.
          </p>
          <p className="text-muted">
            One of the main benefits of using the MERN stack is its versatility.
            The stack is highly customizable, and developers can easily add or
            remove components as needed to suit the specific requirements of
            their project. Additionally, each technology in the stack has a
            large and active community, which means that developers can easily
            find support and resources when needed.
          </p>
          <p className="text-muted">
            Another advantage of the MERN stack is its performance. MongoDB, the
            database used in the stack, is a highly scalable and fast NoSQL
            database, which makes it ideal for handling large amounts of data.
            Meanwhile, Node.js, which is used on the server side, is known for
            its ability to handle high levels of concurrency and provide fast
            response times. Finally, React, which is used on the client side, is
            known for its fast rendering speeds and efficient memory management.
          </p>
          <p className="text-muted">
            Furthermore, the MERN stack is an ideal choice for building
            real-time web applications, such as chat applications or multiplayer
            games. This is because the stack provides a seamless connection
            between the client and server sides, making it easy to send and
            receive real-time data.
          </p>
          <p>
            In summary, the MERN stack is the best choice for web application
            development because of its versatility, performance, scalability,
            and real-time capabilities. By using the MERN stack, developers can
            build fast, efficient, and scalable web applications that are
            capable of handling large amounts of data and real-time
            communication.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
