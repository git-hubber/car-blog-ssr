import path from "path";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import responseTime from "response-time";
import bodyParser from "body-parser";

import { renderServerSideApp } from "./renderServerSideApp";

const { PUBLIC_URL = "" } = process.env;

// This export is used by our initialization code in /scripts
export const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());

// Serve generated assets
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, "../build"), {
    maxAge: Infinity
  })
);

// Serve static assets in /public
app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, "../public"), {
    maxAge: "30 days"
  })
);

app.use(
  responseTime((request, res, time) => {
    res.setHeader("X-Response-Time", time.toFixed(2) + "ms");
    res.setHeader("Server-Timing", `renderServerSideApp;dur=${time}`);
  })
);
// app.use(function(req, res) {
//   // match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
//   // if (error) {
//   //   res.status(500).send(error.message)
//   // } else if (redirectLocation) {
//   //   res.redirect(302, redirectLocation.pathname + redirectLocation.search)
//   // } else if (renderProps && renderProps.components) {

//   // } else {
//   //   res.status(404).send('Not found')
//   // }
//   // });
// });

app.use(renderServerSideApp);
