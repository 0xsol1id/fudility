import type { NextPage } from "next";
import Head from "next/head";
import { InsightView } from "../views";
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

const Insight: NextPage = (props) => {
  return (
    <div>
    <AlertProvider template={AlertTemplate} {...options}>
      <Head>
        <title>Wallet Insights</title>
        <meta name="description" content="Check your wallet, instantly..." />
      </Head>
      <InsightView />
      </AlertProvider>
    </div>
  );
};

export default Insight;
