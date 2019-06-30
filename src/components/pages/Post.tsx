import * as React from "react";
import Helmet from "react-helmet";
import { History } from "history";
import styled from "styled-components";
import { MapDispatchToProps, MapStateToProps, connect } from "react-redux";

import { PostItemModel, RemoteData, UserModel } from "../../state/types";
import { TryFetchPost, TryFetchUser } from "../../state/actions";
import PostListItem from "../layout/PostListItem";
import { colors } from "../../general/colors";
import Loading from "../layout/Loading";
import Banner from "../layout/Banner";

interface PostDispatchProps {
  getPost: (id: number) => void;
  getUser: (id: number) => void;
}
interface PostOwnProps {
  history: History;
}

interface PostStateProps {
  post: RemoteData<PostItemModel>;
  user: RemoteData<UserModel>;
}

interface PostProps extends PostOwnProps, PostDispatchProps, PostStateProps {}

const Post: React.FC<PostProps> = ({
  post,
  user,
  getPost,
  getUser,
  history
}) => {
  const [likedPosts, setLikedPosts] = React.useState<number[]>([]);

  const postId = parseInt(history.location.pathname.replace("/post/", ""));
  const isLiked = likedPosts ? likedPosts.includes(postId) : false;

  React.useEffect(() => {
    const likedPostsString = localStorage.getItem("likedPosts") || "";

    if (likedPostsString)
      setLikedPosts(
        likedPostsString
          .split(",")
          .map(likedPostString => parseInt(likedPostString))
      );

    getPost(postId);
  }, [postId]);

  React.useEffect(() => {
    if (post.status === "RESPONSE") {
      if (
        user.status === "NOT_REQUESTED" ||
        user.data.userId !== post.data.userId
      ) {
        getUser(post.data.userId);
      }
    }
  }, [post]);

  const toggleLike = () => {
    const newLikedPostsArray: number[] = isLiked
      ? likedPosts.filter(id => id !== postId)
      : [...likedPosts, postId];

    setLikedPosts(newLikedPostsArray);

    const newLikedPostsString = newLikedPostsArray.join(",");

    localStorage.setItem("likedPosts", newLikedPostsString);
  };

  switch (post.status) {
    case "NOT_REQUESTED":
      getPost(postId);
      return null;

    case "LOADING":
      return (
        <>
          <Banner loading={true} />
          <Loading />
        </>
      );

    case "RESPONSE":
      const { id, title, userId, body } = post.data;
      return (
        <>
          <Helmet>
            <title>Post</title>
          </Helmet>
          <Banner title={user.data.name} body={user.data.companyName} />
          <PostContainer>
            <StyledUl>
              <PostListItem
                key={id}
                id={id}
                userId={userId}
                title={title}
                body={body}
                liked={isLiked}
              />
            </StyledUl>
            <LikeButton liked={isLiked} onClick={toggleLike}>
              {isLiked ? `Unlike ` : `Like`}
            </LikeButton>
          </PostContainer>
        </>
      );
    default:
      return null;
  }
};

const PostContainer = styled.div``;

interface LikeButtonProps {
  liked: boolean;
}

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const LikeButton = styled.button<LikeButtonProps>`
  background-color: ${({ liked }) => (liked ? colors.black : colors.lightBlue)};
  border: ${({ liked }) => (liked ? `3px solid ${colors.lightBlue}` : `none`)};
  border-radius: 25%/50%;
  bottom: 1vh;
  color: ${({ liked }) => (liked ? colors.white : colors.black)};
  cursor: pointer;
  height: 40px;
  position: absolute;
  right: 1rem;
  width: 100px;
`;

const mapDispatchToProps: MapDispatchToProps<
  PostDispatchProps,
  PostOwnProps
> = dispatch => ({
  getPost: (id: number) =>
    dispatch<TryFetchPost>({ type: "TRY_FETCH_POST", payload: id }),
  getUser: (id: number) =>
    dispatch<TryFetchUser>({ type: "TRY_FETCH_USER", payload: id })
});

const mapStateToProps: MapStateToProps<PostStateProps, PostOwnProps, any> = ({
  post,
  user
}) => ({
  post,
  user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
