import * as React from "react";
import styled from "styled-components";

import { Breakpoint, ScreenWithin } from "../../general/breakpoints";

const Container: React.FC = ({ children }) => {
  return (
    <>
      <PageContainer>{children}</PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  ${ScreenWithin({ upper: Breakpoint.TabletMax })} {
    padding: 0 1rem;
  }
`;

export default Container;
