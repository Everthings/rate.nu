import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import rate_logo from "./../../images/cover_no_background.png";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";

const Nav = styled.nav`
  background-color: #7371fc;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  z-index: 9000;
`;

const Logo = styled.img`
  width: 9rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const Navbar = () => {
  const bigScreen = useMediaQuery({
    query: "(min-width: 992px)",
  });

  return (
    <Nav className="navbar navbar-light">
      {bigScreen && <Logo src={rate_logo} alt="Logo" />}
      <SearchBar />
      <Link to="/login" style={{ color: "#fff", marginLeft: "2rem" }}>
        Login
      </Link>
    </Nav>
  );
};

export default Navbar;
