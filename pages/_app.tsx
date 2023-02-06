import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  pink,
  lightBlue,
  blueGrey,
} from "@mui/material/colors";
import { Provider } from "react-redux";
import { store } from "../features/store";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme({
    palette: {
      primary: {
        main: pink[400],
      },
      secondary: {
        main: lightBlue[400],
      },

      text: {
        primary: blueGrey[800],
      },
    },
    typography: {
      fontFamily: ["メイリオ", "Comic Sans MS"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
}
