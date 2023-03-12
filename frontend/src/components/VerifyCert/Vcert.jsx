import MainScreen from '../MainScreen'
import GetCertData from '../Admin/displayCertData'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CertsLIST from '../Certificate/CertsLIST'
import VerifyTable from './verifyTable'

const VerifyCert = () => {
  const [_id, set_ID] = useState('')
  const [data, setData] = useState([])
  const [lastSearchedID, setLastSearchedID] = useState('')


  // Helper function to format a BigNumber as a string with '/' characters
  const formatBigNumber = (bigNumber) => {
    // Convert the BigNumber to a string
    let str = bigNumber.toString()
    // Insert '/' characters after every second digit
    return str.slice(0, 2) + '/' + str.slice(2, 4) + '/' + str.slice(4)
  }

  const searchForCertificateByHash = async (lastSearchedID) => {
    try {
      const response = await axios.get(`/api/certs/hash/${lastSearchedID}`)
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {}, [data])

  return (
    <MainScreen>
      <>
        <div className="text-center">
          <h3>Search via a CertificateID</h3>
        </div>
        <Form className="d-flex justify-content-center align-items-center">
          <Form.Control
            type="text"
            id="formControlDefault"
            placeholder="Enter certificate ID"
            value={_id}
            onChange={(e) => set_ID(e.target.value)}
            style={{ marginRight: 10 }}
          />
          <Button
            variant="primary"
            onClick={() => {
              GetCertData(_id, setData)
              setLastSearchedID(_id)
              searchForCertificateByHash(_id)
            }}
          >
            Search
          </Button>
        </Form>
      </>
      <CertsLIST certs={data} />
      <VerifyTable certs={data} />
    </MainScreen>
  )
}

export default VerifyCert
