import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import Loadable from "react-loadable";
import { getBundles, Manifest } from "react-loadable/webpack";
import { ServerStyleSheet } from "styled-components";
import { Store } from "redux";

import App from "../src/App";
import { indexHtml } from "./indexHtml";
import * as stats from "../build/react-loadable.json";
import RootProvider from "../src/state/store";
import rootSaga from "../src/state/sagas";
import configureStore from "./configureStore";
import { initialState } from "../src/state";

interface ServerAppToRenderProps {
  store: Store;
  url: string;
}
const ServerAppToRender: React.FC<ServerAppToRenderProps> = ({
  store,
  url
}) => {
  const context = {};

  const ServerApp = (
    <RootProvider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </RootProvider>
  );

  return ServerApp;
};

export const renderServerSideApp = (req: Request, res: Response) => {
  Loadable.preloadAll()
    .then(() => fetchDataForRender(req, res))
    .then(({ data, store }) => {
      renderApp(data, store, req, res);
    });
};

const fetchDataForRender = async (req: Request, res: Response) => {
  const store = configureStore(initialState);
  const url = req.url;

  const rootSagaTask = store.runSaga(rootSaga);

  ReactDOMServer.renderToString(<ServerAppToRender url={url} store={store} />);
  store.close();

  const data = await rootSagaTask.toPromise().then(() => store.getState());

  return { data, store };
};

function renderApp(data: any, store: Store, req: Request, res: any) {
  const context: any = {};
  const modules: string[] = [];
  const sheet = new ServerStyleSheet();
  const url = req.url;

  let markup;
  let styleTags;

  try {
    markup = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <Loadable.Capture
          report={(moduleName: string) => modules.push(moduleName)}
        >
          <ServerAppToRender url={url} store={store} />
        </Loadable.Capture>
      )
    );

    styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
  } catch (error) {
    // handle error
    console.error(error);
  } finally {
    sheet.seal();
  }

  if (context.url) {
    res.redirect(context.url || "");
  } else {
    const anyStats: any = stats;
    const fullMarkup = indexHtml({
      helmet: Helmet.renderStatic(),
      serverData: data,
      bundles: getBundles(anyStats, modules),
      markup,
      styleTags
    });

    res.status(200).send(fullMarkup);
  }
}
