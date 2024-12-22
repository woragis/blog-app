import { Link } from "react-router-dom";
import { useNavbarModel } from "./model";

export const NavbarView = ({
  navPages,
  authPages,
}: ReturnType<typeof useNavbarModel>) => {
  const navLinksComponent = navPages.map(({ title, path }) => {
    return (
      <li key={title + "_nav_link"}>
        <Link to={path}>{title}</Link>
      </li>
    );
  });
  const authLinksComponent = authPages.map(({ title, path }) => {
    return (
      <li key={title + "_nav_link"}>
        <Link to={path}>{title}</Link>
      </li>
    );
  });

  return (
    <div>
      <ul>
        {navLinksComponent}
        {authLinksComponent}
      </ul>
    </div>
  );
};
