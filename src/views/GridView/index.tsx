import Link from "next/link";
import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { MainMenu } from "../mainmenu"
import { Footer } from "../footer"
import ErrorScreen from "../error"
import {
  Grid1x1_FTX, Grid1x1_BINANCE_PERP, Grid1x1_BINANCE_BTC, Grid1x1_HUOBI, Grid1x1_FOREX, Grid1x1_USSTOCKS, Grid1x1_VGSTOCKS, Grid1x1_COMMODITIES,
  Grid2x2,
  Grid2x3,
  Grid3x3,
  Grid3x4
} from './gridz'

export const GridView: FC = ({ }) => {
  const { publicKey } = useWallet();

  const [value, setValue] = useState("2x2");

  return (
    <div className="mx-auto">
      <div className="">
        <div className="navbar text-neutral-content rounded flex justify-between">
          {publicKey ?
            <div>
              <MainMenu />
              <div className="tooltip tooltip-right" data-tip="SOLJUNKS GEN2 Mint Site">
                <button className="btn btn-ghost bg-green-500 mx-1 w-48">
                  <Link href="/mint">
                    <img src="./button/mint_gen2.png"/> 
                  </Link>
                </button>
              </div>
              <a href="https://tradingview.com" target="_blank" className="btn btn-ghost w-auto ml-2">
                <img className="" src="./tv_white.png"></img>
              </a> 
            </div>
            : <div />}
          {publicKey ?
            <div className="flex">              
              <div className="dropdown">
                <div tabIndex={0} className="btn mr-2"><img src="./button/watchlists.png"/></div>
                <ul tabIndex={0} className="p-1 mt-1 text-sm shadow menu dropdown-content bg-base-300 rounded w-48 border border-gray-500">
                  <li><a onClick={() => setValue("1x1_FTX")} className="h-8 mb-2">FTX Perpetuals</a></li>
                  <li><a onClick={() => setValue("1x1_BINANCE_PERP")} className="h-8 mb-2">BINANCE Futures</a></li>
                  <li><a onClick={() => setValue("1x1_BINANCE_BTC")} className="h-8 mb-2">BINANCE BTC Pairs</a></li>
                  <li><a onClick={() => setValue("1x1_HUOBI")} className="h-8 mb-2">HUOBI USDT Pairs</a></li>
                  <li><a onClick={() => setValue("1x1_FOREX")} className="h-8 mb-2">FOREX</a></li>
                  <li><a onClick={() => setValue("1x1_USSTOCKS")} className="h-8 mb-2">US STOCKS</a></li>
                  <li><a onClick={() => setValue("1x1_VGSTOCKS")} className="h-8 mb-2">VIDEOGAME STOCKS</a></li>
                  <li><a onClick={() => setValue("1x1_COMMODITIES")} className="h-8">COMMODITIES</a></li>
                </ul>
              </div>
              <button onClick={() => setValue("2x2")} className="btn mx-1"><img src="./button/2x2.png"/></button>
              <button onClick={() => setValue("2x3")} className="btn mx-1"><img src="./button/2x3.png"/></button>
              <button onClick={() => setValue("3x3")} className="btn mx-1"><img src="./button/3x3.png"/></button>
              <button onClick={() => setValue("3x4")} className="btn mx-1"><img src="./button/3x4.png"/></button>
            </div>
            : <div />}
          <div className="mx-2">
            <WalletMultiButton />
          </div>
        </div>
        {publicKey && value == "1x1_FTX" ?
          <Grid1x1_FTX />
          : publicKey && value == "1x1_BINANCE_PERP" ?
            <Grid1x1_BINANCE_PERP />
            : publicKey && value == "1x1_BINANCE_BTC" ?
              <Grid1x1_BINANCE_BTC />
              : publicKey && value == "1x1_HUOBI" ?
              <Grid1x1_HUOBI />
              : publicKey && value == "1x1_FOREX" ?
                <Grid1x1_FOREX />
                : publicKey && value == "1x1_USSTOCKS" ?
                  <Grid1x1_USSTOCKS />
                  : publicKey && value == "1x1_VGSTOCKS" ?
                    <Grid1x1_VGSTOCKS />
                    : publicKey && value == "1x1_COMMODITIES" ?
                      <Grid1x1_COMMODITIES />
                      : publicKey && value == "2x2" ?
                        <Grid2x2 />
                        : publicKey && value == "2x3" ?
                          <Grid2x3 />
                          : publicKey && value == "3x3" ?
                            <Grid3x3 />
                            : publicKey && value == "3x4" ?
                              <Grid3x4 />
                              : <ErrorScreen />
        }
        {/*<Footer />*/}
      </div>
    </div>
  );
};

