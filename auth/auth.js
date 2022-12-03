import { initLoginForm, initSignOutButton } from "./login";
import { initRegisterForm } from "./register";

export const initAuth = (auth) => {
  initLoginForm(auth);
  initRegisterForm(auth);
  initSignOutButton(auth);
};
