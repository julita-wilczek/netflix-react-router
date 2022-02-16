import { Navbar, Nav, Image, Form, FormControl } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import NetflixLogo from "../data/netflix_logo.png";
import AvatarLogo from "../data/avatar.png";
import "./MyNavbar.css";
import { Link, useLocation} from "react-router-dom";

const MyNavbar = (prop) => {
  const { textColor, textMargin } = prop;
  const location = useLocation();

  const setSearchQuery = (e) => {
    if (e.keyCode === 13) {
    let str = e.target.value;
    prop.setSearch(str)
  }};
  return (
    <Navbar bg="dark" expand="lg" id="nav">
      <Image className="netflixLogo" src={NetflixLogo} rounded />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/">
            <div
              style={{ color: textColor }}
              className={`nav-link${
                location.pathname === "/" ? " active" : ""
              }`}
            >
              Home
            </div>
          </Link>

          <Link to="/series">
            <div
              style={{ color: textColor }}
              className={`nav-link${
                location.pathname === "/series" ? " active" : ""
              }`}
            >
              Tv shows
            </div>
          </Link>
          <Link to="/movie">
            <div
              style={{ color: textColor }}
              className={`nav-link${
                location.pathname === "/movie" ? " active" : ""
              }`}
            >
              Movies
            </div>
          </Link>
          <Nav.Link href="#link3" style={{ color: textColor }}>
            Recently Added
          </Nav.Link>
          <Nav.Link href="#link4" style={{ color: textColor }}>
            My List
          </Nav.Link>
        </Nav>
        <Nav>
        <FormControl
          type="search"
          width="50px"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onKeyUp={(event)=> {setSearchQuery(event)}}
        />
        </Nav>
        <FiSearch style={{ color: textColor, margin: textMargin }} />
        <div style={{ color: textColor, margin: textMargin }}>KIDS</div>
        <BsBell style={{ color: textColor, margin: textMargin }} />
        <Image className="avatarLogo me-3" src={AvatarLogo} rounded />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
