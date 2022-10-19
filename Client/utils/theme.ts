import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

const lightTheme = {
  ...MD3LightTheme,
  roundness: 10,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#000",
    accent: "#ffff",
  },
};
const darkTheme = {
  ...MD3DarkTheme,
  roundness: 10,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#000",
    accent: "#ffff",
  },
};

export { lightTheme, darkTheme };
