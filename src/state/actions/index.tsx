import { Action } from "redux";

import { PostItemsModel, PostItemModel, UserModel } from "../types";

export interface FluxStandardPayloadlessAction<T extends string>
  extends Action<T> {}

export interface FluxStandardPayloadAction<T extends string, PT = {}>
  extends Action<T> {
  readonly payload: PT;
}

export interface TryFetchPostItems
  extends FluxStandardPayloadAction<"TRY_FETCH_POST_ITEMS", number> {}

export interface TryFetchMorePostItems
  extends FluxStandardPayloadAction<"TRY_FETCH_MORE_POST_ITEMS", number> {}

export interface FetchPostItemsSuccess
  extends FluxStandardPayloadAction<
    "FETCH_POST_ITEMS_SUCCESS",
    PostItemsModel
  > {}
export interface TryFetchPost
  extends FluxStandardPayloadAction<"TRY_FETCH_POST", number> {}

export interface FetchPostSuccess
  extends FluxStandardPayloadAction<"FETCH_POST_SUCCESS", PostItemModel> {}

export interface TryFetchUser
  extends FluxStandardPayloadAction<"TRY_FETCH_USER", number> {}

export interface FetchUserSuccess
  extends FluxStandardPayloadAction<"FETCH_USER_SUCCESS", UserModel> {}

export type PostItemActions = TryFetchPostItems | FetchPostItemsSuccess;
