import React, { FC, useState } from "react";
import { DiscordLogo, TwitterLogo, GithubLogo } from "components";

export const Footer: FC = ({ }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-base-200 p-1 flex justify-between">
            <a href="https://tradingview.com" target="_blank" className="btn btn-ghost w-auto">
                <img className="" src="./tv_white.png"></img>
            </a>            
            <p className="card p-2 text-sm font-bold"><img src="./fudility.png"/> <p>V0.1_beta</p></p>
            <div>
                <button className="btn btn-ghost ml-8 mx-1 text-white tooltip tooltip-top" data-tip="DISCORD">
                    <a href="https://discord.gg/WC6GHBuSMG" target="_blank">
                        <p className="font-bold">
                            <DiscordLogo />
                        </p>
                    </a>
                </button>
                <button className="btn btn-ghost mx-1 tooltip tooltip-top" data-tip="TWITTER">
                    <a href="https://twitter.com/soljunksNFT" target="_blank">
                        <p className="font-bold">
                            <TwitterLogo />
                        </p>
                    </a>
                </button>
                <button className="btn btn-ghost mx-1 tooltip tooltip-top" data-tip="Coming soon">
                    <a href="">
                        <p className="font-bold">
                            <GithubLogo />
                        </p>
                    </a>
                </button>
            </div>
        </div>
    )
}