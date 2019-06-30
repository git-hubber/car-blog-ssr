import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "../../general/colors";
import { PostItemModel } from "../../state/types";

interface PostListItemProps extends PostItemModel {
  liked: boolean;
}

const PostListItem: React.FC<PostListItemProps> = ({
  id,
  title,
  body,
  liked
}) => {
  return (
    <>
      <PostContainer liked={liked}>
        <StyledLink to={`/post/${id}`}>
          <PostTitle>{title}</PostTitle>
          <PostBody>{body}</PostBody>
        </StyledLink>
      </PostContainer>
    </>
  );
};

interface PostContainerProps {
  liked: boolean;
}

const PostContainer = styled.li<PostContainerProps>`
  background-color: ${({ liked }) => (liked ? colors.lightBlue : colors.white)};
  ${({ liked }) => !liked && `border: 1px solid ${colors.grey};`}
  box-shadow: 4px 5px 5px 0px rgba(179, 179, 179, 1);
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  min-height: 7rem;
`;

const StyledLink = styled(Link)`
  color: ${colors.black};
  display: block;
  padding: 1rem;
  text-decoration: none;
`;

const PostTitle = styled.h2`
  font-size: 1.25em;
`;

const PostBody = styled.div``;

export default PostListItem;
