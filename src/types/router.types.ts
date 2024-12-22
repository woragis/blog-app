export enum Pages {
  Home = "home",
  Login = "login",
  Register = "register",
  About = "about",
  Profile = "profile",
  Logout = "logout",
}

export interface NavPages {
  title: Pages;
  path: Pages;
}

export interface PagesDataInterface {
  title: Pages;
  path: Pages;
  element: JSX.Element;
}
