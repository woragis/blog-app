import { useSelector } from "react-redux";
import { NavPages, Pages } from "../../types/router.types";
import { RootState } from "../../features/store";

export const useNavbarModel = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navPages: NavPages[] = [
    { title: Pages.Home, path: "" as Pages },
    { title: Pages.About, path: Pages.About },
  ];

  const unloggedPages: NavPages[] = [
    { title: Pages.Login, path: Pages.Login },
    { title: Pages.Register, path: Pages.Register },
  ];
  const loggedPages: NavPages[] = [
    { title: Pages.Profile, path: Pages.Profile },
    { title: Pages.Logout, path: Pages.Logout },
  ];
  const authPages = auth.loggedIn ? loggedPages : unloggedPages;

  return { navPages, authPages };
};
