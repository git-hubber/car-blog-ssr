import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "../../general/colors";

const Footer: React.FC = () => {
  return (
    <>
      <FooterContainer>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy policy</Link>
        </Nav>
      </FooterContainer>
    </>
  );
};

const FooterContainer = styled.footer`
  align-items: center;
  background: ${colors.black};
  box-sizing: border-box;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  height: 20vh;
  justify-content: flex-end;
  padding: 1rem 4rem 3rem;
`;

const Nav = styled.nav`
  text-align: center;
  a {
    color: ${colors.white};
    margin-right: 1rem;
  }
`;

export default Footer;
