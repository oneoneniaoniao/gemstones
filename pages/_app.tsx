import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Provider } from "react-redux";
import { store } from "../features/store";

export default function App({ Component, pageProps }: AppProps) {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme({
    palette: {
      // mode: isDarkMode ?  "dark":"light",
    },
    typography: {
      fontFamily: ["メイリオ", "Comic Sans MS"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
