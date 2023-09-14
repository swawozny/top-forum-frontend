import { Fragment, ReactNode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./Header";
import EmailConfirm from "../pages/EmailConfirm";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

interface Route {
  name: string;
  path: string;
  component: ReactNode;
}

const routes: Route[] = [
  { name: "Sign up", path: "/signup", component: <SignUp /> },
  { name: "Login", path: "/login", component: <Login /> },
  { name: "Email confirm", path: "/confirm-email/:email", component: <EmailConfirm /> }
];

const App = () => {
  return (
    <Router>
    <Fragment>
      <Header />
      <Routes>
        {routes.map(({ name, path, component }) => <Route path={path} key={name} element={component} />)}
      </Routes>
    </Fragment>
    </Router>
  );
};

export default App;
