import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";

interface RootProviderOwnProps {
  store: Store;
}
const RootProvider: React.FC<RootProviderOwnProps> = ({ store, children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default RootProvider;
