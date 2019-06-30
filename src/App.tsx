import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Routes from "./routes";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Helmet from "react-helmet";
import { ScreenWithin, Breakpoint } from "./general/breakpoints";

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
    <AppContainer>
      <Header />
      <SiteContent>
        <Routes />
      </SiteContent>
      <Footer />
    </AppContainer>
  </>
);

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
  .active {
    color: #007aff;
  }
  img {
    height: 50px;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const SiteContent = styled.div`
  flex: 1;
  padding: 0 4rem;
  position: relative;
  ${ScreenWithin({ upper: Breakpoint.TabletMax })} {
    padding: 0;
  }
`;

export default App;
