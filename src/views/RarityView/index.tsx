import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import ReactPaginate from 'react-paginate';
import SolJunk from './soljunks.json'
import SMB from './smb.json'
import Faces from './faces.json'

import { MainMenu } from "../mainmenu"
import { Footer } from "../footer"
import ErrorScreen from "../error"
import { TramOutlined } from "@material-ui/icons";

const junks: any = SolJunk
const smb: any = SMB
const faces: any = Faces

export const RarityView: FC = ({ }) => {
  const { publicKey } = useWallet();

  const [collection, setCollection] = useState(junks)
  const handleChangeCollection = (val: any, rank: boolean) => {
    setCollection(val)
    const mode = rank == true ? val[0].nfts : val[0].edition
    setPagination((prevState) => ({
      ...prevState,
      offset: 0,
      data: mode,
      pageCount: mode.length / prevState.numberPerPage,
      currentData: mode.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
    }))
  }
  const [pagination, setPagination] = useState({
    data: collection[0].nfts,
    offset: 0,
    numberPerPage: 21,
    pageCount: 0,
    currentData: []
  });
  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
    }))
  }, [pagination.numberPerPage, pagination.offset])
  const handlePageClick = (event: { selected: any; }) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage
    setPagination({ ...pagination, offset })
  }

  return (
    <div className="overflow-x-auto space-x-5">
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
          {publicKey ?
            <div className="flex">
              <div className="dropdown mx-1">
                <div tabIndex={0} className="btn"><img src="./button/sjn.png"/></div>
                <ul tabIndex={0} className="p-1 text-md shadow menu dropdown-content bg-base-300 rounded w-32 border border-gray-500">
                  <li>
                    <button className="btn mx-1 mb-1 bg-base-300 rounded border-base-300" onClick={() => handleChangeCollection(junks, true)}><img src="./button/rank.png"/></button>
                  </li>
                  <li>
                    <button className="btn mx-1 bg-base-300 rounded border-base-300" onClick={() => handleChangeCollection(junks, false)}><img src="./button/order.png"/></button>
                  </li>
                </ul>
              </div>
              
              <div className="dropdown mx-1">
                <div tabIndex={0} className="btn"><img src="./button/smb.png"/></div>
                <ul tabIndex={0} className="p-1 text-md shadow menu dropdown-content bg-base-300 rounded w-32 border border-gray-500">
                  <li>
                    <button className="btn mx-1 mb-1 bg-base-300 rounded border-base-300" onClick={() => handleChangeCollection(smb, true)}><img src="./button/rank.png"/></button>
                  </li>
                  <li>
                    <button className="btn mx-1 bg-base-300 rounded border-base-300" onClick={() => handleChangeCollection(smb, false)}><img src="./button/order.png"/></button>
                  </li>
                </ul>
              </div>
              
              <div className="dropdown mx-1">
                <div tabIndex={0} className="btn"><img src="./button/faces.png"/></div>
                <ul tabIndex={0} className="p-1 text-md shadow menu dropdown-content bg-base-300 rounded w-32 border border-gray-500">
                  <li>
                    <button className="btn mx-1 mb-1 bg-base-300 rounded border-base-300" onClick={() => handleChangeCollection(faces, true)}><img src="./button/rank.png"/></button>
                  </li>
                  <li>
                    <button className="btn mx-1 bg-base-300 rounded border-base-300" onClick={() => handleChangeCollection(faces, false)}><img src="./button/order.png"/></button>
                  </li>
                </ul>
              </div>
            </div>
            : <div />}
          <div className="mx-2">
            <WalletMultiButton />
          </div>
        </div>
        {publicKey ? (
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 items-start max-h-[52rem]">
              {pagination.currentData && pagination.currentData.map((nft: any, index) => (
                <div key={index} className="post rounded bg-base-300 text-sm">
                  <img className="w-38 rounded-t-md" src={nft.Image} loading="lazy" />
                  <div className="flex justify-between p-2">
                    <p className="font-bold mt-1 text-center">{nft.Name}</p>
                    <div className="rounded bg-gray-700 p-1">👑{nft.Rank}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded mt-1 mx.-auto bg-base-300">
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                pageCount={pagination.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                className="flex justify-between card-title"
              />
            </div>
          </div>
        ) : <ErrorScreen />}
        {/*<Footer />*/}
      </div>
    </div>
  );
};