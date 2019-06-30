import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Privacy from "../components/pages/Privacy";
import Post from "../components/pages/Post";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/privacy" component={Privacy} />
    <Route path="/post/:id" component={Post} />
  </Switch>
);
