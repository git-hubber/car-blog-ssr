import * as React from "react";
import Helmet from "react-helmet";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { InView } from "react-intersection-observer";

import PostListItem from "../layout/PostListItem";
import { PostItemModel, PostItemsModel, RemoteData } from "../../state/types";
import { TryFetchPostItems, TryFetchMorePostItems } from "../../state/actions";
import { usePrevious } from "../../hooks";
import styled from "styled-components";
import { colors } from "../../general/colors";
import Loading from "../layout/Loading";
import Banner from "../layout/Banner";

interface HomeDispatchProps {
  getPostItems: (start: number) => void;
}
interface HomeOwnProps {}

interface HomeStateProps {
  postItems: RemoteData<PostItemsModel>;
}

interface HomeProps extends HomeOwnProps, HomeDispatchProps, HomeStateProps {}

const Home: React.FC<HomeProps> = ({ postItems, getPostItems }) => {
  const [showLoadMore, setShowLoadMore] = React.useState(true);
  const [likedPosts, setLikedPosts] = React.useState<number[]>([]);
  const prevPostsLength = usePrevious(postItems.data.length);
  const postStart = postItems.data && postItems.data.length;

  React.useEffect(() => {
    const likedPostsString = localStorage.getItem("likedPosts") || "";
    setLikedPosts(
      likedPostsString
        .split(",")
        .map(likedPostString => parseInt(likedPostString))
    );
  }, []);

  React.useEffect(() => {
    /**
     * Would be more efficient if the API told us if there were more posts to fetch, or not, but it doesn't :/
     */
    if (prevPostsLength === postItems.data.length) setShowLoadMore(false);
  }, [postItems]);

  switch (postItems.status) {
    case "NOT_REQUESTED":
      getPostItems(postStart);
      return null;
    case "LOADING":
      return <Loading />;
    case "RESPONSE":
      return (
        <>
          <Helmet>
            <title>Home</title>
          </Helmet>
          <Banner />
          <StyledUl>
            {postItems.data &&
              postItems.data.map(
                ({ id, title, userId, body }: PostItemModel) => (
                  <PostListItem
                    key={id}
                    id={id}
                    userId={userId}
                    title={title}
                    body={body}
                    liked={likedPosts.includes(id)}
                  />
                )
              )}
          </StyledUl>
          {showLoadMore && (
            <InView
              as={StyledInView}
              onChange={(inView, entry) => inView && getPostItems(postStart)}
            >
              <LoadMoreButton onClick={() => getPostItems(postStart)}>
                Load More
              </LoadMoreButton>
            </InView>
          )}
        </>
      );
    default:
      return null;
  }
};

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledInView = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

const LoadMoreButton = styled.button`
  background-color: ${colors.lightBlue};
  border: none;
  border-radius: 25%/50%;
  cursor: pointer;
  height: 40px;
  width: 100px;
`;

const mapDispatchToProps: MapDispatchToProps<
  HomeDispatchProps,
  HomeOwnProps
> = dispatch => ({
  getPostItems: (start: number) => {
    const type =
      start > 1 ? "TRY_FETCH_MORE_POST_ITEMS" : "TRY_FETCH_POST_ITEMS";
    dispatch<TryFetchPostItems | TryFetchMorePostItems>({
      type,
      payload: start
    });
  }
});

const mapStateToProps: MapStateToProps<HomeStateProps, HomeOwnProps, any> = ({
  postItems
}) => ({
  postItems
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
