import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer data-testid="footerComponent">
      <Container>
        <Row>
          <Col className='text-center py-3' data-testid="footerText">Copyright &copy; Rentle</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
