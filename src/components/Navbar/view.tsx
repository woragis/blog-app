import ToggleThemeButton from "../ToggleThemeButton";
import { useNavbarModel } from "./model";
import {
  NavbarLogo,
  NavLink,
  NavLinkItem,
  NavLinksContainer,
  StyledNavbar,
} from "./styles";

export const NavbarView = ({
  navPages,
  authPages,
}: ReturnType<typeof useNavbarModel>) => {
  const navLinksComponent = navPages.map(({ title, path }) => {
    return (
      <NavLinkItem key={title + "_nav_link"}>
        <NavLink to={path} color="#fff">
          {title}
        </NavLink>
      </NavLinkItem>
    );
  });
  const authLinksComponent = authPages.map(({ title, path }) => {
    return (
      <NavLinkItem key={title + "_nav_link"}>
        <NavLink to={path} color="#fff">
          {title}
        </NavLink>
      </NavLinkItem>
    );
  });

  window.addEventListener("scroll", () => {
    let header = document.querySelector(".navbar");
    header?.classList.toggle("sticky", window.scrollY > 0);
  });
  return (
    <StyledNavbar backgroundColor="#000">
      <NavbarLogo />
      <NavLinksContainer>
        {navLinksComponent}
        {authLinksComponent}
        <ToggleThemeButton />
      </NavLinksContainer>
    </StyledNavbar>
  );
};
