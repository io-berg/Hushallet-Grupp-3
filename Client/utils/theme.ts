import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const lightTheme = {
  ...MD3LightTheme,
  roundness: 10,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#000",
    accent: "#ffff",
    surface: "white",
    disabled: "#f2f2f2",
    text: "#000",
    background: "#f2f2f2",
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  roundness: 10,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#fff",
    accent: "#ffff",
    surface: "#181818",
    text: "#ffff",
    background: "#282828",
  },
};

export { lightTheme, darkTheme };
