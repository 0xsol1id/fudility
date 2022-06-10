import Link from "next/link";
import { FC } from "react";

export const MainMenu: FC = ({ }) => {

    return (
        <div className="dropdown">
            <div tabIndex={0} className="btn mr-2 btn-primary text-xl h-18"><img className="w-6"  src="./heads/8.png" alt="cs" /></div>
            <ul tabIndex={0} className="mt-1 text-md shadow menu dropdown-content bg-base-300 rounded border border-gray-500 w-[19rem]">
                <li>
                    <a>
                        <Link href="/"><p className=""><img src="./button/home.png"/></p></Link>
                    </a>
                </li>
                <li>
                    <a>
                        <Link href="/insight"><p className=""><img src="./button/walletstalker.png"/></p></Link>
                    </a>
                </li>
                <li>
                    <a>
                        <Link href="/grid"><p className=""><img src="./button/tardinggridz.png"/></p></Link>
                    </a>
                </li>
                <li>
                    <a href="http://mintgame.soljunks.io/" target="_blank"><img src="./button/mintgame.png"/></a>
                </li>
                <li>
                    <a><Link href="/rarity"><img src="./button/rarity.png"/></Link></a>
                </li>
                <li>
                    <a><Link href="/about"><img src="./button/about.png"/></Link></a>
                </li>
            </ul>
        </div>
    );
};