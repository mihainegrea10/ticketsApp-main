import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSearchParams } from "react-router-dom";

function MyNavbar() {
  let [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">E-tickets</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={`/buy?userId=${userId}`}>Buy</Nav.Link>
            <Nav.Link href={`/profile?userId=${userId}`}>Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
