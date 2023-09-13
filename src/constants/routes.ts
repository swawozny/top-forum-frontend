import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

export interface Route {
  name: string;
  path: string;
  component: () => JSX.Element;
}

export const routes: Route[] = [
  { name: "Sign up", path: "/signup", component: SignUp },
  { name: "Login", path: "/login", component: Login }
];
