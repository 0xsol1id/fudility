import type { NextPage } from "next";
import Head from "next/head";
import { AboutView } from "../views";

const Grid: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>About us</title>
        <meta name="description" content="Everything you need to know" />
      </Head>
      <AboutView />
    </div>
  );
};

export default Grid;
