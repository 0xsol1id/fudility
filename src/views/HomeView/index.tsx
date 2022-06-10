import Link from "next/link";
import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAlert } from 'react-alert'

import { MainMenu } from "../mainmenu"
import { Footer } from "../footer"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const HomeView: FC = ({ }) => {
  const { publicKey } = useWallet();
  const alert = useAlert()

  return (
    <div className="mx-auto">
      <div className="">
        <div className="mb-1 navbar text-neutral-content rounded flex justify-between">
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
            </div>
            : <div />}
          <div className="mx-2">
            <WalletMultiButton />
          </div>
        </div>
        <div className="hero min-h-16">
          <div className="text-center hero-content">
            <div className="">
              <img src="./logo2.png" alt="logo" />
              <p className="mb-5">
                This project is not promoting any kind of drug abuse nor are we making fun of people with an serious addiction.
                This is a homage to our beloved degenerated NFT scene! Especially in the Solana Ecosystem.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
