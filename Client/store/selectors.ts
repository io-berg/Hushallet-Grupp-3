import { AppState } from "./store";

export const selectCurrentHousehold = (state: AppState) =>
  state.household.households?.find((household) => household.id === state.household.current);

export const selectCurrentUserProfile = (state: AppState) => {
  const currentHousehold = selectCurrentHousehold(state);
  const currentUser = state.auth.user;

  if (!currentHousehold || !currentUser) {
    return null;
  }

  return currentHousehold.profiles.find((profile) => profile.user.email === currentUser.email);
};
