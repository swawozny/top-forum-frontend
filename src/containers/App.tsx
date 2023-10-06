import { Fragment, ReactNode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./Header";
import EmailConfirm from "../pages/EmailConfirm";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Home from "../pages/Home";
import Forum from "../pages/Forum";
import ForumTopic from "../pages/ForumTopic";

interface RouteInfo {
  name: string;
  path: string;
  component: ReactNode;
}

const routes: RouteInfo[] = [
  { name: "Home", path: "/", component: <Home /> },
  { name: "Sign up", path: "/signup", component: <SignUp /> },
  { name: "Login", path: "/login", component: <Login /> },
  { name: "Email confirm", path: "/confirm-email/:email", component: <EmailConfirm /> },
  { name: "Forgot password", path: "/forgot-password", component: <ForgotPassword /> },
  { name: "Reset password", path: "/reset-password", component: <ResetPassword /> },
  { name: "Forum", path: "/forum/:id", component: <Forum /> },
  { name: "Forum topic", path: "/forum-topic/:id", component: <ForumTopic /> }
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
