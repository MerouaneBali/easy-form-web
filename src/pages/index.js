import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "../state/actionCreators";
// import "../styles/css/layouts/home.css";

export default function Home() {
  const state = useSelector((state) => state);
  const testState = useSelector(({ test }) => test);

  console.log(state, testState);

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const { testAction } = bindActionCreators(actionCreators, dispatch);

  console.log(actions, testAction);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h3>Redux setup text: {testState}</h3>

      <button onClick={() => testAction(1)}>Increment</button>
    </div>
  );
}
