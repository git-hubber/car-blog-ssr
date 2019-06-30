import { initialState, InitialState } from "..";
import { Reducer } from "redux";
import {
  RemoteData,
  defaultNetworkState,
  PostItemsModel,
  NetworkNotRequested,
  PostItemModel,
  UserModel
} from "../types";
import {
  FetchPostItemsSuccess,
  FetchPostSuccess,
  FetchUserSuccess,
  TryFetchPost,
  TryFetchUser,
  TryFetchPostItems
} from "../actions";

const postItems: Reducer<
  RemoteData<PostItemsModel | NetworkNotRequested>,
  TryFetchPostItems | FetchPostItemsSuccess
> = (state = defaultNetworkState, action) => {
  switch (action.type) {
    case "TRY_FETCH_POST_ITEMS":
      return {
        ...state,
        status: "LOADING"
      };
    case "FETCH_POST_ITEMS_SUCCESS":
      return {
        status: "RESPONSE",
        data: [...state.data, ...action.payload]
      };
    default:
      return state;
  }
};

const post: Reducer<
  RemoteData<PostItemModel | NetworkNotRequested>,
  TryFetchPost | FetchPostSuccess
> = (state = defaultNetworkState, action) => {
  switch (action.type) {
    case "TRY_FETCH_POST":
      return {
        ...state,
        status: "LOADING"
      };
    case "FETCH_POST_SUCCESS":
      return {
        status: "RESPONSE",
        data: { ...action.payload }
      };
    default:
      return state;
  }
};

const users: Reducer<
  RemoteData<UserModel | NetworkNotRequested>,
  TryFetchUser | FetchUserSuccess
> = (state = defaultNetworkState, action) => {
  switch (action.type) {
    case "TRY_FETCH_USER":
      return {
        ...state,
        status: "LOADING"
      };
    case "FETCH_USER_SUCCESS":
      return {
        status: "RESPONSE",
        data: { ...action.payload }
      };

    default:
      return state;
  }
};

const rootReducer = (state: InitialState = initialState, action: any) => ({
  postItems: postItems(state.postItems, action),
  post: post(state.post, action),
  user: users(state.user, action)
});

export default rootReducer;
