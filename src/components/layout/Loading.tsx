import * as React from "react";
import styled from "styled-components";

import { colors } from "../../general/colors";
import { ScreenWithin, Breakpoint } from "../../general/breakpoints";

const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      Loading...
      <LoadingModalContainer>
        <LoadingModal>
          <StyledH2>Addendum</StyledH2>
          <span>Lorem ipsum is dummy text used to replace...</span>
          <Button onClick={() => alert("Clicked")}>Click here</Button>
        </LoadingModal>
      </LoadingModalContainer>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  height: 20vh;
  padding: 2rem 4rem;
  ${ScreenWithin({ upper: Breakpoint.TabletMax })} {
    padding: 1rem;
  }
`;

const LoadingModalContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoadingModal = styled.div`
  align-items: center;
  background-color: ${colors.white};
  border: 1px solid ${colors.grey};
  border-radius: 20px;
  bottom: 15vh;
  box-shadow: 10px 10px 10px 0px rgba(179, 179, 179, 1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 10rem;
  justify-content: space-between;
  max-width: 285px;
  padding: 1rem 2rem;
  position: absolute;
  text-align: center;
  ${ScreenWithin({ upper: Breakpoint.TabletMax })} {
    bottom: 2vh;
  }
`;

const StyledH2 = styled.h2`
  margin: 0;
`;

const Button = styled.button`
  background-color: ${colors.lightBlue};
  border: none;
  border-radius: 25%/50%;
  cursor: pointer;
  height: 40px;
  width: 100px;
`;

export default Loading;
