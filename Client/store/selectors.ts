import { AppState } from "./store";

export const selectCurrentHousehold = (state: AppState) =>
  state.household.households.find((household) => household.id === state.household.current);
