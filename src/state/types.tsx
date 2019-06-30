export interface PostItemModel {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface UserModel {
  userId: number;
  name: string;
  companyName: string;
}

export type PostItemsModel = PostItemModel[];

export interface NetworkNotRequested<T = any> {
  status: "NOT_REQUESTED";
  data: T;
}

export interface NetworkLoading<T = any> {
  status: "LOADING";
  data: T;
}

export interface NetworkResponse<T = any> {
  status: "RESPONSE";
  data: T;
}

export interface NetworkError<T = any> {
  status: "ERROR";
  data: T;
  reason: string;
}

export type RemoteData<T = any> =
  | NetworkNotRequested
  | NetworkLoading
  | NetworkResponse
  | NetworkError;

export const defaultNetworkState: RemoteData<any> = {
  status: "NOT_REQUESTED",
  data: []
};
