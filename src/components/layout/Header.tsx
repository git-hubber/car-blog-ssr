import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "../../general/colors";
import { ScreenWithin, Breakpoint } from "../../general/breakpoints";

const Header: React.FC = () => {
  return (
    <>
      <HeaderContainer>
        <StyledLink to={"/"}>
          <StyledImage
            src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K`}
          />
        </StyledLink>

        <SignInButton onClick={() => alert("Sign in")}>Sign In</SignInButton>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div`
  align-items: center;
  background: ${colors.darkBlue};
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 0 4rem;
  ${ScreenWithin({ upper: Breakpoint.TabletMax })} {
    padding: 0 0.5rem;
  }
`;

const StyledLink = styled(Link)`
  height: 20px;
  width: 23px;
`;

const StyledImage = styled.img`
  height: 20px;
  width: 23px;
`;

const SignInButton = styled.button`
  background-color: ${colors.lightBlue};
  border: none;
  border-radius: 25%/50%;
  cursor: pointer;
  height: 40px;
  width: 100px;
`;

export default Header;
