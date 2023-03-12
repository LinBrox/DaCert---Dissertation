import React from 'react'
import { Table } from 'react-bootstrap'


  // Helper function to format a BigNumber as a string with '/' characters
  const formatBigNumber = (bigNumber) => {
    // Convert the BigNumber to a string
    let str = bigNumber.toString()
    // Insert '/' characters after every second digit
    return str.slice(0, 2) + '/' + str.slice(2, 4) + '/' + str.slice(4)
  }

const VerifyTable = ({ certs }) => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Certificate ID</th>
            <th>Name of Recipient</th>
            <th>Course</th>
            <th>Date</th>
            <th>Hash</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
            {/* <tr key={certs._id}>
              <td>{certs.user}</td>
              <td>{certs.name}</td>
              <td>{certs.title}</td>
              <td>{formatBigNumber(certs.date)}</td>
              <td>{certs.hash}</td>
              <th>Verified</th>
            </tr> */}
          
        </tbody>
      </Table>
    )
  }

export default VerifyTable