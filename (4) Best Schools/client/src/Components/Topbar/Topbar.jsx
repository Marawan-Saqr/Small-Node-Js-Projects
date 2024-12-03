import "./Topbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Loader from "../../Shared/Loader/Loader";

const Topbar = () => {

  // Component States
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);


  // Get All Titels Function
  const getAllTitles = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/getAllTitles");
      setTitles(response.data.data);
    } catch (error) {
      console.error("Error fetching titles:", error);
    } finally {
      setLoading(false);
    }
  };


  // UseEffect
  useEffect(() => {
    getAllTitles();
  }, []);


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <i className="fa-solid fa-school"></i> Best Schools
        </Link>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          style={{ backgroundColor: "#fff" }}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {loading ? (
              <Loader />
            ) : (
              titles.map((title) => (
                <Link
                  key={title.id}
                  to={title.path}
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
                  <i className={title.icon}></i> {title.name}
                </Link>
              ))
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};



export default Topbar;