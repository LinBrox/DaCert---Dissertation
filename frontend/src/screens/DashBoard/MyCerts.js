import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminSearchCertAction,
  deleteCertAction,
  listCerts,
} from '../../actions/certActions'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import CertsLIST from '../../components/Certificate/CertsLIST'
import { allUsers, deleteUserAction } from '../../actions/userActions'
import { Alert } from 'react-bootstrap'

const MyCerts = ({ search }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [_id, set_ID] = useState('')
  const [data, setData] = useState([])

  const certList = useSelector((state) => state.certList)
  const { error, certs, loading } = certList

  const certCreate = useSelector((state) => state.certCreate)
  const { success: successCreate } = certCreate

  const certUpdate = useSelector((state) => state.certUpdate)
  const { success: successUpdate } = certUpdate

  const certDelete = useSelector((state) => state.certDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = certDelete

  const { users } = useSelector((state) => state.adminSearchReducuer)
  const { adminCerts } = useSelector((state) => state.AdminSearchCertReducuer)
  const [selectedUser, setSelectedUser] = useState(null)

  const [deleted, setDeleted] = useState(false)

  //these two lines imports the users's session over
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const isAdmin = userInfo && userInfo.isAdmin

  //Delete Handler - needs work re-renders the page twice
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      dispatch(deleteCertAction(id))
      setDeleted(true)
    }
  }
  //Delete Handler - needs work re-renders the page twice
  const deleteHandlerUser = (_id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUserAction(_id))
      setDeleted(true)
    }
  }

  const handleRowClick = (user) => {
    console.log(`Clicked row with user ID: ${user._id}`)
    setSelectedUser(user)
    dispatch(AdminSearchCertAction(user))
  }

  // Helper function to format a BigNumber as a string with '/' characters
  const formatBigNumber = (bigNumber) => {
    // Convert the BigNumber to a string
    let str = bigNumber.toString()
    // Insert '/' characters after every second digit
    return str.slice(0, 2) + '/' + str.slice(2, 4) + '/' + str.slice(4)
  }

  useEffect(() => {
    dispatch(listCerts())
  }, [dispatch, deleted, successUpdate, successDelete])

  useEffect(
    (_id) => {
      dispatch(allUsers(_id))
    },
    [dispatch, deleted, successUpdate, successDelete],
  )

  useEffect(() => {
    dispatch(listCerts())
    if (!userInfo) {
      navigate('/')
    }
  }, [
    dispatch,
    successCreate,
    successUpdate,
    successDelete,
    navigate,
    userInfo,
  ])

  try {
    return (
      <MainScreen title={`Welcome back ${userInfo.name}...`}>
        {isAdmin ? (
          <>
            <Table striped bordered hover>
              <thead class="thead-dark">
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>walletID</th>
                  <th>Admin</th>
                  <th>New Cert?</th>
                  <th>Delete</th>
                  {/* <th>Edit</th> */}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} onClick={() => handleRowClick(user)}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.walletID}</td>
                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                    <td>
                      <Link
                        to={{
                          pathname: '/createcert',
                          state: { selectedUser: user._id },
                        }}
                      >
                        <Button variant="primary" className="ml-4">
                          Create
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                      data-test-id="DELETE-button"
                        variant="danger"
                        className="ml-4"
                        onClick={() => deleteHandlerUser(user._id)}
                      >
                        Delete
                      </Button>
                    </td>
                    {/* <td>
                      <Button
                        variant="warning"
                        className="ml-4"
                        onClick={() => deleteHandler(user._id)}
                      >
                        Edit
                      </Button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
              padding-right="10"
              size="lg"
              style={{ width: '100%' }}
              variant="success"
              onClick={() =>
                window.open(
                  '/verifyCert',
                  'VerifyCertWindow',
                  'width=800,height=600',
                )
              }
            >
              Verify a Cert
            </Button>
          </>
        ) : null}

        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}

        {loadingDelete && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}

        {selectedUser && (
          <div>
            <h2>Certificates for user: {selectedUser.name}</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : selectedUser.isAdmin ? (
              <p>Admin user selected. Table not shown.</p>
            ) : adminCerts ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Certificate ID</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {adminCerts.map((cert) => (
                    <tr key={cert._id}>
                      <td>{cert._id}</td>
                      <td>{cert.title}</td>
                      <td>{formatBigNumber(cert.date)}</td>
                      <td>{cert.hash}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No certificates found for this user.</p>
            )}
          </div>
        )}
        {/* Mapping for the Admins */}
        {adminCerts
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase()),
          )
          .map((certs) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={certs._id}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header style={{ display: 'flex' }}>
                    <Card.Header style={{ display: 'flex' }}>
                      <span
                        style={{
                          color: 'black',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          alignSelf: 'center',
                          fontSize: 30,
                        }}
                      >
                        This Certificate is for " {certs.title} "
                      </span>
                      {isAdmin ? (
                        <div>
                          {/* commented out this code because it was used for debugging and testing */}
                          {/* <Link to={`/certs/${certs._id}`}>
                            <Button className="ml-4">Edit</Button>
                          </Link> */}
                          <Button
                            variant="danger"
                            className="ml-4"
                            onClick={() => deleteHandler(certs._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      ) : null}
                    </Card.Header>
                  </Accordion.Header>

                  <Accordion.Body>
                    {' '}
                    <Card.Body>
                      <CertsLIST certs={certs} />
                    </Card.Body>
                  </Accordion.Body>
                </Accordion.Item>
              </Card>
            </Accordion>
          ))}

        {/* Mapping for the users */}
        {certs.length === 0
          ? // <Alert variant="danger">You do not have any certificates.</Alert>
            null
          : certs
              .filter((filteredNote) =>
                filteredNote.title.toLowerCase().includes(search.toLowerCase()),
              )
              .map((certs) => (
                <Accordion>
                  <Card style={{ margin: 10 }} key={certs._id}>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header style={{ display: 'flex' }}>
                        <Card.Header style={{ display: 'flex' }}>
                          <span
                            style={{
                              color: 'black',
                              textDecoration: 'none',
                              cursor: 'pointer',
                              alignSelf: 'center',
                              fontSize: 30,
                            }}
                          >
                            This Certificate is for " {certs.title} "
                          </span>
                          {isAdmin ? (
                            <div>
                              <Button
                                variant="danger"
                                className="ml-4"
                                onClick={() => deleteHandler(certs._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          ) : null}
                        </Card.Header>
                      </Accordion.Header>

                      <Accordion.Body>
                        {' '}
                        <Card.Body>
                          <CertsLIST certs={certs} />
                        </Card.Body>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Card>
                </Accordion>
              ))}
      </MainScreen>
    )
  } catch (error) {
    console.error(error)
    return null
  }
}

export default MyCerts
