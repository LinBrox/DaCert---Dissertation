import React from 'react'
import jsPDF from 'jspdf'
import { Button } from 'react-bootstrap'

function CertsLIST({ certs }) {
  const generatePDF = () => {
    const certificate = document.getElementById('certificate')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const data = new XMLSerializer().serializeToString(certificate)
    const DOMURL = window.URL || window.webkitURL || window
    canvas.width = 1000
    canvas.height = 700

    const img = new Image()
    const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
    const url = DOMURL.createObjectURL(svgBlob)

    img.onload = function () {
      ctx.drawImage(img, 0, 0)
      DOMURL.revokeObjectURL(url)

      const dataURL = canvas.toDataURL('image/png')
      const pdf = new jsPDF('l', 'mm', 'a4')
      pdf.addImage(dataURL, 'png', 0, 5, 0, 210)
      const newWindow = window.open(
        pdf.output('bloburl'),
        '',
        'width=1000,height=800',
      )
      newWindow.focus()
    }
    img.src = url
  }
  // Helper function to format a BigNumber as a string with '/' characters
  const formatBigNumber = (bigNumber) => {
    // Convert the BigNumber to a string
    let str = bigNumber.toString()
    // Insert '/' characters after every second digit
    return str.slice(0, 2) + '/' + str.slice(2, 4) + '/' + str.slice(4)
  }
  return (
    <blockquote className="blockquote mb-0">
      <Button variant="primary" onClick={generatePDF}>
        Generate PDF to send
      </Button>
      <svg width="1000" height="700" id="certificate" className="border">
        <rect
          fill="#A0A0A0"
          x="50"
          y="25"
          rx="20"
          ry="20"
          width="900"
          height="600"
        />
        <text
          x={String(500)}
          y={String(100)}
          textAnchor="middle"
          fill="white"
          id="bodyTitle"
          fontSize="40"
        >
          Certificate
        </text>
        <text
          x={String(500)}
          y={String(140)}
          textAnchor="middle"
          fill="white"
          id="bodySubTitle"
          fontSize="40"
        >
          of
        </text>
        <line x1="250" y1="260" x2="750" y2="260" id="titleUnderLine" />
        <text
          x={String(500)}
          y={String(200)}
          textAnchor="middle"
          fill="white"
          id="title"
          fontSize="40"
        >
          {certs.title}
        </text>
        <text
          x={String(500)}
          y={String(250)}
          textAnchor="middle"
          fill="white"
          id="subTitleHeader"
          fontSize="25"
        >
          awarded to
        </text>
        <text
          x={String(500)}
          y={String(325)}
          textAnchor="middle"
          fill="white"
          id="name"
          fontSize="50"
        >
          {certs.name}
        </text>
        <line x1="200" y1="410" x2="800" y2="410" id="titleUnderLine" />
        <text
          x={String(500)}
          y={String(375)}
          textAnchor="middle"
          fill="white"
          id="bodySubTitle"
          fontSize="30"
        >
          on
        </text>
        {certs.date && (
          <text
            x={String(500)}
            y={String(450)}
            textAnchor="middle"
            fill="white"
            id="date"
            fontSize="50"
          >
            {formatBigNumber(certs.date)}
          </text>
        )}
        <line x1="400" y1="510" x2="600" y2="510" id="titleUnderLine" />
        <text
          x={String(100)}
          y={String(575)}
          textAnchor="start"
          fill="white"
          id="hash"
          fontSize="15"
        >
          ID: {certs.hash}
        </text>
        <image
          x={String(750)}
          y={String(425)}
          height="200px"
          width="120px"
          id="logo"
          href={certs.logo}
        />
        Sorry, your browser does not support inline SVG.
      </svg>
    </blockquote>
  )
}

export default CertsLIST
