import SignUp from "../pages/SignUp";

export interface Route {
  name: string;
  path: string;
  component: () => JSX.Element;
}

export const routes: Route[] = [
  { name: "Sign up", path: "/signup", component: SignUp }
];
