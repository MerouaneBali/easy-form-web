import { Provider } from "react-redux";
import GlobalWrapper from "../components/GlobalWrapper";
import { store } from "../state/store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <GlobalWrapper>
        <Component {...pageProps} />
      </GlobalWrapper>
    </Provider>
  );
}

export default MyApp;
