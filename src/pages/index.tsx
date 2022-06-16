import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '20px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const Home: NextPage = (props) => {
  return (
    <div>
      <AlertProvider template={AlertTemplate} {...options}>
      <Head>
        <title>SOLJUNKS.IO</title>
        <meta
          name="description"
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <div id="root"></div>
      <HomeView />
      </AlertProvider>
    </div>
  );
};

export default Home;
