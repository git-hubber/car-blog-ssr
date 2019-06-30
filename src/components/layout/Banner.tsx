import * as React from "react";
import styled from "styled-components";

import { ScreenWithin, Breakpoint } from "../../general/breakpoints";

interface BannerDispatchProps {}

interface BannerOwnProps {
  title?: string;
  body?: string;
  loading?: boolean;
}

interface BannerStateProps {}

interface BannerProps
  extends BannerOwnProps,
    BannerDispatchProps,
    BannerStateProps {}

const defaultTitle = "Redbook Inspect Blog";
const defaultBody = ` Iaculis justo sapien elementum viverra penatibus praesent massa pharetra
        purus. Sodales dui magna commodo enim nisi. Ultricies quis cubilia
        primis inceptos, aliquam sit.`;

const Banner: React.FC<BannerProps> = ({
  title = defaultTitle,
  body = defaultBody,
  loading = false
}) => {
  return (
    <>
      <BannerContainer>
        <BannerLeft>
          <BannerLeftImage />
          <BannerLeftContent>
            {!loading && (
              <>
                <StyledH1>{title}</StyledH1>
                <StyledDiv>{body}</StyledDiv>
              </>
            )}
          </BannerLeftContent>
        </BannerLeft>
        <BannerRight />
      </BannerContainer>
    </>
  );
};

const BannerContainer = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: auto auto;
  height: 300px;
  margin-bottom: 2rem;
  position: relative;
  ${ScreenWithin({ upper: Breakpoint.TabletMax })} {
    grid-template-columns: auto;
  }
`;

const BannerLeft = styled.div`
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const StyledH1 = styled.h1`
  ${ScreenWithin({ upper: Breakpoint.MobileMax })} {
    font-size: 1.2em;
  }
`;

const StyledDiv = styled.div``;

const BannerLeftImage = styled.div`
  background-image: url(https://content.choiz.me/uploads/2017-06/8fc5a852efb0490ebd1d3c7b414cb555.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(8px);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: scale(1.5);
  width: 100%;
  ${ScreenWithin({ upper: Breakpoint.TabletMax })} {
    background-image: url(https://amp.businessinsider.com/images/592f4169b74af41b008b5977-750-563.jpg);
  }
`;

const BannerLeftContent = styled.div`
  box-sizing: border-box;
  left: 0;
  padding: 2rem;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  ${ScreenWithin({ upper: Breakpoint.TabletMax })} {
    padding: 0.5rem 0.5rem 0 0.5rem;
  }
`;

const BannerRight = styled.div`
  background-image: url(https://content.choiz.me/uploads/2017-06/8fc5a852efb0490ebd1d3c7b414cb555.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: inline-block;
  height: 100%;
  width: 100%;
  ${ScreenWithin({ upper: Breakpoint.TabletMax })} {
    background-image: url(https://amp.businessinsider.com/images/592f4169b74af41b008b5977-750-563.jpg);
  }
`;

export default Banner;
