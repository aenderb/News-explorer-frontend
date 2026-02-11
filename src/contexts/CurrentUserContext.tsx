import { createContext } from "react";
import type { UserData } from "../../utils/MainApi";

interface CurrentUserContextType {
  currentUser: UserData | null;
  isLoggedIn: boolean;
}

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  isLoggedIn: false,
});

export default CurrentUserContext;
export type { CurrentUserContextType };
