import lightTheme from "./light"
import darkTheme from "./dark"

export type Theme = {
  name: string;
  colors: {
      background: string;
      main: string;
      secondary: string;
      border: string;
      hover: string;
  }
}

export const themesList = {
  default: lightTheme,
  [lightTheme.name]: lightTheme,
  [darkTheme.name]: darkTheme
}
