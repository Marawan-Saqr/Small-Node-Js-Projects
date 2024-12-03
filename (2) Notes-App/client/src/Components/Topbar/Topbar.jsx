import './Topbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <i className="fa-solid fa-clipboard"></i> My Notes
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" style={{ backgroundColor: '#fff' }} />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Link to={"/todo"} className="nav-link" style={{ textDecoration: 'none' }}>
              <i className="fa-solid fa-note-sticky"></i> Notes
            </Link>
            <Link to={"/add-note"} className="nav-link" style={{ textDecoration: 'none' }}>
              <i className="fa-solid fa-pen"></i> Add Note
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export default Topbar;