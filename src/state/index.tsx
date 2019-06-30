import { defaultNetworkState, NetworkNotRequested, RemoteData } from "./types";

export interface InitialState {
  postItems: RemoteData<NetworkNotRequested>;
  post: RemoteData<NetworkNotRequested>;
  user: RemoteData<NetworkNotRequested>;
}

export const initialState: InitialState = {
  postItems: defaultNetworkState,
  post: defaultNetworkState,
  user: defaultNetworkState
};
