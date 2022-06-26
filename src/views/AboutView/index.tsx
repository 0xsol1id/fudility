import Link from "next/link";
import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { MainMenu } from "../mainmenu"
import { Footer } from "../footer"
import ErrorScreen from "../error"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const AboutView: FC = ({ }) => {
  const { publicKey } = useWallet();

  return (
    <div className="overflow-x-auto space-x-5">
      <div className="">
        <div className="mb-1 navbar text-neutral-content rounded flex justify-between">
          {publicKey ?
            <div>
              <MainMenu />
              <div className="tooltip tooltip-right" data-tip="SOLJUNKS GEN2 Mint Site">
                <button className="btn btn-ghost bg-green-500 mx-1">
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
        <div className="grid grid-cols-3 gap-3">
          <div className="card bg-base-300 text-center">
            <img className="mx-auto p-5" src="./soljunks_title.png" alt="logo1" width="300" />
            <div className="card-body">
              <img src="./1.gif" alt="1" className="mx-auto" />
              <p className="p-2 text-sm">
                8.888 deflationary, degenerated Junks living and dying on the Solana Blockchain. SoljunksNFT is a fun pixel art NFT and one of the first multiple
                Character NFTs on Solana Blockchain. Each Junk represent a degenerate hustlin on the Crypto Crenshaw tryin to make it! Some will! Some won´t!<br /><br /><br />
              </p>
              <div className="absolute bottom-10 right-0 left-0 flex justify-between mx-2 p-2">
                <a className="h-8 mb-2 mr-2 btn btn-primary btn-sm" href="https://www.magiceden.io/marketplace/soljunk" target="_blank">@Magic Eden</a>
                <a className="h-8 mb-2 mr-2 btn btn-primary btn-sm" href="https://opensea.io/collection/soljunks" target="_blank">@Open Sea</a>
              </div>
              <div className="absolute bottom-0 right-0 left-0 flex justify-between mx-2 p-2">
                <a className="h-8 mb-2 mr-2 btn btn-primary btn-sm" href="https://solport.io/collection/soljunks" target="_blank">@SolPort</a>
                <a className="h-8 mb-2 mr-2 btn btn-primary btn-sm" href="https://digitaleyes.market/collections/Soljunks" target="_blank">@Digital Eyes</a>
                <a className="h-8 mb-2 btn btn-primary btn-sm" href="https://exchange.art/collections/Soljunks" target="_blank">@Exchange Art</a>
              </div>
            </div>
          </div>
          <div className="card bg-base-300">
            <img className="mx-auto p-5"  src="./faces_title.png" alt="fsmblogo" />
            <div className="card-body">
              <div className="text-center mb-10">
                <img src="./fsmb.gif" alt="fsmb" className="mx-auto" />
                <p className="p-2 text-sm">
                  111 Facetraits of $MB
                  Faces of $MB was a fun airdrop Collection for Soljunk Holders! <br />We @SoljunksNFT believe in our Project and we are
                  going to constantly reward our Holders for doin the same!
                </p>
                  <div className="absolute bottom-0 right-0 left-0 flex justify-between mx-2 p-2">
                    <a className="h-8 mb-2 btn btn-primary btn-sm" href="https://www.magiceden.io/marketplace/faces_of_solana_money_business" target="_blank">@Magic Eden</a>
                    <a className="h-8 mb-2 btn btn-primary btn-sm" href="https://opensea.io/collection/faces-of-solana-money-business" target="_blank">@Open Sea</a>
                    <a className="h-8 mb-2 btn btn-primary btn-sm" href="https://solport.io/collection/faces-of-solana-money-business" target="_blank">@SolPort</a>
                    <a className="h-8 mb-2 btn btn-primary btn-sm" href="https://digitaleyes.market/collections/Faces%20of%20Solana%20Money%20Business" target="_blank">@Digital Eyes</a>
                  </div>
                </div>
            </div>
          </div>
          <div className="card bg-base-300 text-center"> 
            <img className="mx-auto p-5"  src="./smb_banner.png" alt="smblogo" />
            <div className="card-body">
              <img src="./smb4.gif" alt="smb4" className="mx-auto" />
              <p className="p-2 text-sm">
                $MB is our second Generation NFT Collection. They are 1111 hustlers which are supposed to be them Soljunks masters.
                Collectin debts and protection money to save the Junks from gettin rugged!
                All Solana Money Business Nfts will have special Attributes in our upcoming Multiplayer Game!
              </p>
              <div className="absolute bottom-0 right-0 left-0 mx-2 p-2 flex justify-center">
                <a className="h-8 mb-2 mr-2 btn btn-primary btn-sm" href="https://www.magiceden.io/marketplace/solana_money_business" target="_blank">@Magic Eden</a>
                    <a className="h-8 mb-2 btn btn-primary btn-sm" href="https://opensea.io/collection/solana-money-business" target="_blank">@Open Sea</a></div>
            </div>
          </div>
        </div>        
        <img className="mx-auto p-5"  src="./coming_soon.png" alt="cs" />
        {/*<Footer />*/}
      </div>
    </div>
  );
};
