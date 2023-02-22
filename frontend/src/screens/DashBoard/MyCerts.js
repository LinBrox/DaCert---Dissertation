import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCertAction, listCerts } from '../../actions/certActions'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import CertsLIST from '../../components/Certificate/CertsLIST'
import getCertData from '../../components/Admin/displayCertData'

const MyCerts = ({ search }) => {
  let navigate = useNavigate()



  const dispatch = useDispatch()
  const [_id, set_ID] = useState('')

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

  //these two lines imports the users's session over
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const isAdmin = userInfo && userInfo.isAdmin
  console.log(userInfo.isAdmin)
  console.log(userInfo)

  //Delete Handler - needs work re-renders the page twice
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      dispatch(deleteCertAction(id))
    }
  }

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
            <Link to="/createcert">
              <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                Create a new Certificate
              </Button>
            </Link>
            <Button
              onClick={() => getCertData(_id)}
              style={{ marginLeft: 10, marginBottom: 6 }}
              size="lg"
            >
              Get a Certificate Based on ID
            </Button>
            <div>
                <input
                  type="text"
                  placeholder="Enter certificate ID"
                  value={_id}
                  onChange={(e) => set_ID(e.target.value)}
                  style={{ marginRight: 10 }}
                />
              </div>
          </>
        ) : null}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}

        {loadingDelete && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {console.log(certs.size)}
        {certs
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
                          <Link to={`/certs/${certs._id}`}>
                            <Button className="ml-4">Edit</Button>
                          </Link>
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
