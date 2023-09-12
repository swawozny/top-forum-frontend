import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./Header";
import { routes } from "../constants/routes";

const App = () => {
  return (
    <Router>
    <Fragment>
      <Header />
      <Routes>
        {routes.map(({ name, path, component }) => <Route path={path} key={name} element={component()} />)}
      </Routes>
    </Fragment>
    </Router>

  );
};

export default App;
