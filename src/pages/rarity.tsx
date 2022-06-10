import type { NextPage } from "next";
import Head from "next/head";
import { RarityView } from "../views";

const Grid: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Tarding Gridz</title>
        <meta name="description" content="Have a nice clean chart view" />
      </Head>
      <RarityView />
    </div>
  );
};

export default Grid;
