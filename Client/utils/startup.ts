import { AuthState } from "../store/authSlice";
import { SettingsState } from "../store/settingsSlice";
import { get } from "./localStorage";

const getPersistedAuthValues = async () => {
  let values: AuthState = {
    token: "",
    user: null,
    expirationDate: "",
    loginErrors: null,
    registerErrors: null,
    loading: false,
    registerSuccess: false,
  };
  const token = await get("auth.token");
  const expirationDate = await get("auth.expirationDate");
  const user = await get("auth.user");
  if (token && expirationDate && user) {
    values = {
      token,
      expirationDate,
      user: JSON.parse(user),
      loginErrors: null,
      registerErrors: null,
      loading: false,
      registerSuccess: false,
    };
  }

  return values;
};

const getPersistedSettingsValues = async () => {
  let values: SettingsState = {
    theme: "auto",
  };

  const theme = await get("settings.theme");
  if (theme === "dark" || theme === "light") {
    values = {
      theme,
    };
  }

  return values;
};

export { getPersistedAuthValues, getPersistedSettingsValues };
