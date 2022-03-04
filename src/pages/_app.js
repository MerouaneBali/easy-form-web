import { useEffect } from "react";
import { Provider } from "react-redux";
import GlobalWrapper from "../components/GlobalWrapper";
import { store } from "../state/store";
import "../styles/css/globals.css";
import cldi from "../utils/cldi";

function MyApp({ Component, pageProps }) {
  useEffect(() => cldi(), []);

  return (
    <Provider store={store}>
      <GlobalWrapper>
        <Component {...pageProps} />
      </GlobalWrapper>
    </Provider>
  );
}

export default MyApp;
