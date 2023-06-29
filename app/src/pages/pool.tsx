import type { NextPage } from "next";
import Head from "next/head";
import { PoolView } from "../views";

const Basics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Pyramid Lottery</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <PoolView />
    </div>
  );
};

export default Basics;
