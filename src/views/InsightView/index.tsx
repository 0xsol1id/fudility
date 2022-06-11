import Link from "next/link";
import { FC, useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { resolveToWalletAddrress } from "@nfteyez/sol-rayz";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { performReverseLookup, NAME_PROGRAM_ID } from "@bonfida/spl-name-service";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAlert } from 'react-alert'
import ReactPaginate from 'react-paginate';

import { Loader, SelectAndConnectWalletButton, MagicEdenLogo } from "components";
import NftCard from "./NftCard";
import { Footer } from "../footer"
import { MainMenu } from "../mainmenu"
import ErrorScreen from "../error"

const randomWallets = [
  { "Wallet": "DVmQbyfoTztR4iAdibRx2h6cb4J84EYArTZfj1ZcM8u4" },
  { "Wallet": "94qM9awvQiW35vmS5m86sHeJp1JZAQWkW7w3vYwHZeor" },
  { "Wallet": "6gjFy9Gp3mMN8uTLtfAyMmxdDfUe74YTo8cUTDXJtBUH" },
  { "Wallet": "DxKc73eJX5J1kY5ND69hnLs7ox64Q2exN3BVUWxBtBjo" },
  { "Wallet": "HLSgM1a7wSufVwe1NrPPR22ynY2aPsH8a1XQfqFsQiqY" },
  { "Wallet": "73tF8uN3BwVzUzwETv59WNAafuEBct2zTgYbYXLggQiU" },
  { "Wallet": "2tn4ToRyMT8Mnh29AHcrixZr8GmDBUjBcSqpYdEuWoAU" },
  { "Wallet": "EAHJNfFDtivTMzKMNXzwAF9RTAeTd4aEYVwLjCiQWY1E" },
  { "Wallet": "5URSakmV37mRXJ2rETDRZEyzEVBE2ebySVeLGWhUUk5h" },
  { "Wallet": "8v5DE3Yf6oaBFckTcG2iAvrmauiKXjHWqQ7HuRzj4htp" },
  { "Wallet": "FaqEroxry6uiu3C1WrxYnJybww3mkHkXuavbCpBvKLr5" },
  { "Wallet": "cXQEAwX36w4f2nuBybcNA2ntexKyJ7F3iUNLb3eX8PJ" },
  { "Wallet": "gqwBMP2shvC3n21n4PwtqQujQG9yHCx9yHAziYom4uZ" },
  { "Wallet": "2srVaGFB8htkvB5qYEam2bHArRQCwzrLAoq9zYFZDw5a" },
  { "Wallet": "BdwoSZEFqYwvWLHgwzmTg2j3cXYpiY1jpvvFYRJnsgyU" },
  { "Wallet": "9f3iyEszuvHgyDQbw2DLPvCfjma9fn2UtWGGw6BWqhpA" },
  { "Wallet": "MGRGhyEYZyVzwWTPnWR1gvP61NK9oDb2sLrs1FnVgmX" },
  { "Wallet": "9fALd2Qm4VW9B6VKqY18bx7YByzcZqwV5yVex9iHQWjP" },
  { "Wallet": "5rqeAsk5R3fmwLRR77KGQYxbdif2PFCuiM3uK2uyxvaV" },
  { "Wallet": "JDjFuj29hBWoSp9gjY8XcmwqdsisPyh2w8S5vgUaq2w9" },
  { "Wallet": "D6wh3WS66LqAa5ya4fTCvYRKaZDScC5d54H3ijbSAg3Z" },
  { "Wallet": "7ikJca2CpYn2yp7FGRS5uAWbuSATeSTjvTM37v8noTdo" },
  { "Wallet": "DmhK9gKYwgmzk6bP52kat1qgwvFo4gJ8HhEH32zVdCab" },
  { "Wallet": "5ni1d8WXwspbruncxs9iwDibWU2veXCaLdJ8ZT8WnKvt" },
  { "Wallet": "DxX6esF4DEDdJJzB54atkQaDCLjUK7Q2uTvhbKMQCvBQ" },
  { "Wallet": "CFmKZePyVHakWmkL8tDwWeSSZWoErBJtLD99o3R9zs2m" },
  { "Wallet": "6zusztonKZB4g7zNz3fX4o8Vxm6xayWTkoPp6RZKoqoe" },
  { "Wallet": "2b88gGMDV43Q1kweF489bqj4RZ4zU6yrke5PcCaZiizh" },
  { "Wallet": "Bxjx6HhSrc5DGuzccfsbLLch64oKKHLS3qy9Te5tVPcf" },
  { "Wallet": "BVqz7gyf2rMcNgqUkx8iJJDS4yHASmBwu93HAitV7ey3" },
  { "Wallet": "AYZCLBEGMjLR7yzgf4PSy5ZU5q7frPSMqgS6QU6sGyhh" },
  { "Wallet": "4M5vgNq26ova2nVbgKgHT5R1hpo3Gf9Yq19xER1yC7qQ" },
  { "Wallet": "7cDS2kK1cFkvGT5dz6CxMjhNZk8pZ7yHxrsuHjG5GoFv" },
  { "Wallet": "2uFuEpAch4fDvw9xurNXtLjJFP8rZnnE4Yimpyz88VJK" },
  { "Wallet": "9REeqvAq6aEosq3cAvwTMBgw2EJePBZ7k13PLYLbuLeW" },
  { "Wallet": "AvukdqQtiW2hm7kn64nviCySvr18soPmse5yoHiduScX" },
  { "Wallet": "7iYBkQXZZnw7Jxz5yLnhofx1oEYuZERWfnwKdrB5WydF" },
  { "Wallet": "AfRpqBSiT8BgUcEEMbPLCy9TpZSQcpkWvA4BkunHcef" },
  { "Wallet": "6rnPRTCHV5kBSG4pYrCZHviABZcBdj7Mc6uUihkPPpc2" },
  { "Wallet": "AH4zFowqsAeCrbBsw9UHWLCmUDqqEJCoYFtKjH6Y9N8k" },
  { "Wallet": "4ZAAEnQFqhsiCXzxGmHyfSc95rKSstqXLwccHT5pspvL" },
  { "Wallet": "5RRz4vYmHopaT8bKgAxchufoNUAgZu7ZjUjURk9Ecs7x" },
  { "Wallet": "DWYx3rgY7uTaE6KGyffHqh5QNa98Pt2uLbAQ9MGvewzJ" },
  { "Wallet": "ZLgNEZsXCunR6TrZCk5eeK71MmyLLi8Zy18vKgNLJUL" },
  { "Wallet": "AUNeqDuuFzPSeRx6jSn1WnvsyLwim3R2mqngsZeP8qH" },
  { "Wallet": "DzDk6VsamFnGLYJrY3vERr5pb2e1coeZXMo2UpGdo8mj" },
  { "Wallet": "8MFGGzfsWyiJwQVg9r7bZgY6e6fRkr54pPQj2Mr3voxx" },
  { "Wallet": "4cvJYgHz56Sj6GY6dQiZfsxMiaXZ1ZuXrd1jo52X41fa" },
  { "Wallet": "EomYnkxVCLotRPFMZ78xUQTfxfKncdeZUXjaLMTASwqG" },
  { "Wallet": "Fbpmm2rAn2XedZxQz8sqnSiKqZQtbdrUXcwFatSvZBju" },
  { "Wallet": "HeMDS1NhqsuVgag8QmWdY5WPZAsxb2vEvZEApAqS45Sw" },
  { "Wallet": "BY4tJVNpsWjM5AjGX3t4bKT7BSfcSmo4j2octY1dht99" },
  { "Wallet": "7woqoyhrysYZCRsHKSWmYEVtHxP3qWBjvpmUfNS71Ste" },
  { "Wallet": "3Pnr2DZxT3CLGYX6NfhFQyKeZhcJEWKAHmH4oH7cDKRw" },
  { "Wallet": "5aqZKcZfKzxPZY1w5tNajyb8WT6BjtCVfYdFyT4qjcip" },
  { "Wallet": "31mKbYwGwJJa2eNCgxqzmkDDFfDkGyUNXvPe6NnXyVN8" },
  { "Wallet": "2xE7HLyEXgt39cALfb1XiygEMB3HbNd1JfT7YhHhSRHY" },
  { "Wallet": "6berDa4fhoPWEoNP36samHZhRYnuvsNphKQ4ABS7ZTh8" },
  { "Wallet": "9er5VnavWah1c87gR3dPBzV23BtNWcoUjSHcTurD44EQ" },
  { "Wallet": "3NLc8oSSr5LiyMU24eFE3RnqzTuz6QwDvph7Ex5H1Xyd" },
  { "Wallet": "GUc4mZnLE9bHtGfkgwLN1EiiD8HZSRSnHJAiLCshZyp4" },
  { "Wallet": "6zJp799qQvc4CoKqvhqHbiULzGrmRq4JaZBs9P2wvbuJ" },
  { "Wallet": "2cCYDx5KKUw4Dtw6gButVH9NoRBoDkkvYt98Lf1vx91d" },
  { "Wallet": "DC9r4aJ6HZZ9pwCChxcFxgWExKgMuRM926D344ikVZwT" },
  { "Wallet": "Hqxph19idU17vg4YgmA7BjTpxASLA6PvRkL5ECKbV9Vb" },
  { "Wallet": "78fUNLmXqEkxnhYj7HxE4HoqQtwtFuB3hPyR5tCACNXk" },
  { "Wallet": "3NUvdKUikHKjjcjLFNjz2jpi43xKzN6GN13beUUiDV9D" },
  { "Wallet": "7m1L23Qv7ErStz3gUzDudNFcEfBpmFXwniRnw99VbGKc" },
  { "Wallet": "45nnw9MT4jGB4nSF2vtJZ2ygihy6t4LF6FZAcADp4p7o" },
  { "Wallet": "2Jd1duAzk5inm4pEbUrrnxcWTeLer8G47NVyntU8aaUP" },
  { "Wallet": "kDqcV7SN46wBz5RoXBwzgCUN2nza1zx25jTXvvzma2U" },
  { "Wallet": "2TRy4WuaWcYEpK1R6663V9REKBSPhtTihKzvBPRVm2Lq" },
  { "Wallet": "9MaDTH2fzPEZPepppnGRRQa7WaKjkgqFhiPCVABSQmoN" },
  { "Wallet": "99zhJij4b3whQbdBxArELReYfrRbTtPCBT3C2A69uE3Z" },
  { "Wallet": "BdxFF53v7ghx9ZSTJjZfd6wTJL5QrEsb5JX7E9oa8NFQ" },
  { "Wallet": "8cry6tkZ3RuKziNfEWfavREvbSCssGGdmws6iudAVR9t" },
  { "Wallet": "BFMSK8fsdG5ACHKmfpexHaM8fo4s3yYj9aGZtPdeE34u" },
  { "Wallet": "2qtNznGCREEejenVtowLFRfetEQBetWxpYatD7dGHFiK" },
  { "Wallet": "9r6Cf9tGmoM6aTkFxSTWf89iqEszMHh9uGWiuych7aie" },
  { "Wallet": "6TkSWhELzpnLoUSEbMLxgGhCZ2ca98Hyvytfnx6EDQ89" },
  { "Wallet": "8WQyTzC4T9KptRRecivtL2CD2ZBPaKVRemUwAYdjqjve" },
  { "Wallet": "WM3Bnemp4E394AueZPfBt5hRXR7ZnEpysSdbftLCuqb" },
  { "Wallet": "2ysNfvVvdtut4LpiMCELsEADiJmMiWXK51F7Ld3PYfKA" },
  { "Wallet": "7M9b69YCmnSxriX9tiLFNG3rzVRPNKTRKoEzjbnYunBW" },
  { "Wallet": "GkWdHnYio9d2uh4oK78M6eixhTJCBpMFjtixr5YnoS1q" },
  { "Wallet": "2Ki1xkN4PgjTBz42VvfnuthMG5LHV4ecMwCEiXZGmXAK" },
  { "Wallet": "dHvSL1iDsihVJf7Aq7EjpbQN5mqfwGNGRoNDb6g12W2" },
  { "Wallet": "AmX8xmiEuwAdph3ntcncw7BEj6qb6apnWVbCCzh1BQVJ" },
  { "Wallet": "AE2Z1TWYvmoorJTL63MdD8UUhJdaDVx9yF8CgHfCZk99" },
  { "Wallet": "WUaFjLHh76f1168o2esLHxTt2imqTGuUj7RZ6L5uUZ7" },
  { "Wallet": "5t7fN5YsHFAYuYUobfPqeLMxjjmwPawwDzcdLxA7ZieU" },
  { "Wallet": "2iiF1uxpDFdda3nvgoFTvf9ig94EdKE7C6ijARzgZRJ8" },
  { "Wallet": "FFRH5NUJ5RL97ndCMPnoRwCu3mL1LmMfePphZqeF1n39" },
  { "Wallet": "DCmQYoGqF52FimrBtnj7CsydBpeskrTLSHWQTPSh7VoY" },
  { "Wallet": "9i9LhzPtR6GKLN3YMAS9J1srtQ3fvwdfc5Hnf7CxcTVi" },
  { "Wallet": "4h7kkCMTjoBFAoC58Tn9xLTCETBWvdy8UBtLmQKiUFLy" },
  { "Wallet": "E3GNM8bG4CqVXCT3kzKeYubBLpKqj1hnCkVMbqfPWdMq" },
  { "Wallet": "FNjwbBHgTb76Afc41q2WqKeDn6fUNa9vgCUinkxuzNST" },
  { "Wallet": "CPwcLM5zRfG2CE81vDJ7kq5TkW8DyB3CiPuPunnndsMc" },
  { "Wallet": "JA7MgydDLk6mLVwiKtrF6EKWZPBVdMX6N2e5yCUTv55G" },
  { "Wallet": "D6bCeYL8q3piBCZG528imQ1RcwhgPFgebR8BQ5ZVvCSX" },
  { "Wallet": "7tJSHom1qcys97jTKwcytXo3rSv32UwUXDyAH8ZzSvDb" },
  { "Wallet": "FmPr12TxnrjxzFFChvaGiiPjBcu1bbE1UT6AiZfAPRNb" },
  { "Wallet": "7aQdeym9sBzGwyd2kZuP64TPmxjsKAovD2QCdkkM3kyx" },
  { "Wallet": "BEasUYLR4ZQvgMP5tBdaLZZ3GguwJDmnC7q78TbEwDY4" },
  { "Wallet": "FJTecczet73dWgn4LysYBtSDcqfvp2ExHDwMHJ6AQUkj" },
  { "Wallet": "H3YTFiYvr9heD4UF73jAeXzCxgTVaqgLmng9bhLaYTmr" },
  { "Wallet": "9JVVWFB9aJ6ekXaAyjQ3W6PXifhsrk4Bjte5YBHaRE5Y" },
  { "Wallet": "JCP4gy7rzq2xr1SWEUjz9VUtYUKtrAyFgM6NYbDzuP9p" },
  { "Wallet": "GeeCvJntNNS6wR8TR7X3qqRYLPtQSsFZDGFFqAe7X4dA" },
  { "Wallet": "4ewhoX7mZSgVEN13Tmja1Dy6zw2qy5A52HUKmNbCocL5" },
  { "Wallet": "Fmg5Jdh6GCFaHZsgGXqrEgieBX3BMYzpAWgczKi6jzCd" },
  { "Wallet": "9b1vmMHYTpAQCzdDJbrJAHDN1JMfUm8vpEHhsT4a3pMQ" },
  { "Wallet": "F1xvQU6HfjBQYuUjgCB8TmAbQCQrM8J8H7Rte1sAwiWS" },
  { "Wallet": "J66nm4GPswvq9T9eJDSdMTgdck7T8BP3zTTK49621uB" },
  { "Wallet": "EGa4JBrNTDafetNXgb5EaQGomaAgTcZJNf1F19vgDqd7" },
  { "Wallet": "BMWHPCit73cKF4biqsTpakf1ubW9g58gciZwPcRe33Ff" },
  { "Wallet": "69uq5XWdDqTqoa5VNfkSTKgnvqKBCoUAVXe9GAijnvNF" },
  { "Wallet": "4qzjkQueYSf3XJJGrWvzxJedTtVhWjZPCgeuvGfV2rG2" },
  { "Wallet": "8pPYZ9sX8cLFqxdfNHrqP3xXBBPmnYDpnoPrAA5KDV1Q" },
  { "Wallet": "CyTRnZN1KeVNy1xqKHG1ZR68eWxHhNB4AMDzmjfgtJyL" },
  { "Wallet": "CaL8jGNdUEV8TSabSFMRA3YiJ5w6JQAnBuso73UYvphg" },
  { "Wallet": "CYN3DaHmk9Xydo5W7Nheti2QL99LhfGrWQ8a8GrLQ8RJ" },
  { "Wallet": "6Ro58eK7S693wgaNdKUzptEG28DJZ2aEvpPDts7Sg4uf" },
  { "Wallet": "9944ZtJab8pjxm9dR8fsnj2nXcfrp4oH5f8PwQRriBmo" },
  { "Wallet": "AP9PomHNRfd5s59XYnWFrFd6SX9EUTL4SD5gsSmqNkJ2" },
  { "Wallet": "6YRHAC752eAzJb4sAM7QQPQbMKEqviMYugwZKeAA3mJs" },
  { "Wallet": "8hZdvwaPivGic4DYtkZxiDbTKNRetf5HoUEf1UEAn4tY" },
  { "Wallet": "5DxrzqVoTKPJXiABxRJwvsUBrWdk9XacqQdMjLw9LWv8" },
  { "Wallet": "8VKqBznMqXytooi2YXLAeNxdspAKQyxMnVcpvbTNgR71" },
  { "Wallet": "F8FjbEXtPW7S4dZk1si768fFCtRZBjPC3Wr27BLhBTQR" },
  { "Wallet": "c5XFRmb4bJkxvKcUkY2r9yLeFnrDJqyGMbFtuSV8bUe" },
  { "Wallet": "DzBhESoZpRTQF3UkzdcV85KKwNCBaWmuqx5J39hndwHk" },
  { "Wallet": "9FYd2WxoT4baMXbZjJzqquUqqhndEP37Bzc5QmLA4ywk" },
  { "Wallet": "ByFBCYEZa7xFFKyJYfaLuAksSY1i5z79Kj4Q2uTtfCKs" },
  { "Wallet": "7jUgTohSbDNgqH58m2bNksEtKqsxyhcMf5fRG58XLLmE" },
  { "Wallet": "HHmmWgMDYkXutU39hzoG7NzEhS8LKygAUewy763QE7rr" },
  { "Wallet": "6v1fL88peHJCRyfKuze8XyqP4Tqcqy4wb9Wmtg6z8im1" },
  { "Wallet": "5RMmnGh5KBSVNxgUpbpPhYAuKj2AEGe5X3SbiLy8f4w3" },
  { "Wallet": "D3oREopGkE3fa3H2FT6AW9gh3BgoqDGDnZonZdztmg4U" },
  { "Wallet": "2KcVHkLHyGjLFUcTw2kYnEc2WNqEubigAmjCV7JJi7Au" },
  { "Wallet": "Bdn9HrKu7kubPAfuNZm4QBxTxwXF1r1y8NfGQ9TxEC9u" },
  { "Wallet": "J3gAmJiP48z3uczX8ku6uu7gzUQxzV2FdwpQj7JxdC4G" },
  { "Wallet": "H7G6jdWDXhGfyQanrc9gCRZwHk6j1WegEP6UY9pfNjqw" },
  { "Wallet": "6wfnCWorHKjWuSNFCM3oxxmXYCb9kEs7uBo97hcBjKt8" },
  { "Wallet": "ErNoHvtTyPaWcMc8PdXbYcCTN8oFqFWj3BXVXJNLCjLo" },
  { "Wallet": "36MdZuBeUMLHpyNuoGgGzyrEcvSUHv4fVcWx7j8TRixL" },
  { "Wallet": "A4jTwCn4zmUYmSo88MgiiCQRaCtuSbAMdR84ZPvay7Bw" },
  { "Wallet": "4ZVYJvxt9b6fpRTpMTHQnE3jHWEmLx8wjLYYMBKAgNc9" },
  { "Wallet": "88btH24DiLUyUvBzZJcapKBAEYLsPXzuQM6ni523RF8S" },
  { "Wallet": "3HXUAb7FJ5xk3YEV86SdXAuNs3utwpuKzpj3coEJC9te" },
  { "Wallet": "2nYaLvLTRbiGtdQjaFJZdumA36kqJRPES151qz8xTZJg" }
]
var isConnectedWallet = false
var walletPublicKey = randomWallets[randomInt(0, randomWallets.length)].Wallet //start with random wallet from list

function randomInt(low: number, high: number) {
  return Math.floor(Math.random() * (high - low) + low)
}

function convertTimestamp(timestamp: any) {
  var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
    dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
    hh = d.getHours(),
    h = hh,
    min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
    ampm = 'AM',
    time;

  if (hh > 12) {
    h = hh - 12;
    ampm = 'PM';
  } else if (hh === 12) {
    h = 12;
    ampm = 'PM';
  } else if (hh == 0) {
    h = 12;
  }

  // ie: 2014-03-24, 3:00 PM
  time = yyyy + '-' + mm + '-' + dd + ' / ' + h + ':' + min + ' ' + ampm;
  return time;
}

export const InsightView: FC = ({ }) => {
  const alert = useAlert()
  const { connection } = useConnection();
  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState<string>(walletPublicKey);
  const { publicKey } = useWallet();

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletToParsePublicKey,
    connection,
  })

  //console.log("nfts", nfts);  
  const [history, setHistory] = useState([])
  const handleChangeHistory = (val: []) => {
    setHistory(val)
  }
  async function GetHistory(url: string) {
    try {      
      const response = await fetch(url)
      const jsonData = await response.json()
      handleChangeHistory(jsonData)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    GetHistory(`https://api-mainnet.magiceden.dev/v2/wallets/${walletToParsePublicKey}/activities?offset=0&limit=500`)
  }, [history])
  const [value, setValue] = useState(walletToParsePublicKey);

  const onChange = async () => {
    const val = value
    const address = await resolveToWalletAddrress({ text: val.trim() })
    isConnectedWallet = false
    setWalletToParsePublicKey(address)
    walletPublicKey = address
    GetHistory(`https://api-mainnet.magiceden.dev/v2/wallets/${address}/activities?offset=0&limit=500`)
  };

  const randomWallet = () => {
    var wallet = randomWallets[randomInt(0, randomWallets.length)]
    isConnectedWallet = false
    setWalletToParsePublicKey(wallet.Wallet)
    walletPublicKey = wallet.Wallet
    setValue(wallet.Wallet)
    GetHistory(`https://api-mainnet.magiceden.dev/v2/wallets/${wallet.Wallet}/activities?offset=0&limit=500`)
  };

  const onUseWalletClick = () => {
    if (publicKey) {
      isConnectedWallet = true
      setWalletToParsePublicKey(publicKey?.toBase58())
      walletPublicKey = publicKey?.toBase58()
      setValue(publicKey?.toBase58())
      GetHistory(`https://api-mainnet.magiceden.dev/v2/wallets/${publicKey?.toBase58()}/activities?offset=0&limit=500`)
    }
  };

  const getInfluencerWallet = (wallet: any) => {
    isConnectedWallet = false
    setWalletToParsePublicKey(wallet)
    walletPublicKey = wallet.toString()
    setValue(wallet)
    GetHistory(`https://api-mainnet.magiceden.dev/v2/wallets/${wallet}/activities?offset=0&limit=500`)
  };

  return (
    <div className="">
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
            </div>
            : <div />}
          {publicKey ?
            <div>
              <input
                type="text"
                placeholder="Enter Wallet Address"
                className="w-96 input input-bordered mr-2 bg-base-200"
                value={value}
                onChange={(e) => { setValue(e.target.value) }}
              />
              <div className="tooltip tooltip-right" data-tip="Show wallet">
                <button onClick={onChange} className="btn btn-primary mr-12 text-xl">
                  👁️
                </button>
              </div>
            </div>
            : <div />}
          {publicKey ? (
            <div>
              <div className="tooltip tooltip-left" data-tip="Show a random wallet">
                <button onClick={randomWallet} className="btn btn-primary mr-2 text-xl">
                  🤷‍♂️
                </button>
              </div>
              <div className="tooltip tooltip-left" data-tip="Influencer Wallets">
                <div className="dropdown">
                  <div tabIndex={0} className="btn mr-2 btn-primary text-xl">⭐</div>
                  <ul tabIndex={0} className="p-1 mt-1 text-sm shadow menu dropdown-content bg-base-300 rounded w-48 border border-gray-500">
                    <li>
                      <a onClick={() => getInfluencerWallet("94qM9awvQiW35vmS5m86sHeJp1JZAQWkW7w3vYwHZeor")} className="h-8">
                        Steve Aoki
                      </a>
                    </li>
                    <li>
                      <a onClick={() => getInfluencerWallet(" 6gjFy9Gp3mMN8uTLtfAyMmxdDfUe74YTo8cUTDXJtBUH")} className="h-8">
                        SOLBIGBRAIN
                      </a>
                    </li>
                    <li>
                      <a onClick={() => getInfluencerWallet("73tF8uN3BwVzUzwETv59WNAafuEBct2zTgYbYXLggQiU")} className="h-8">
                        Sol King
                      </a>
                    </li>
                    <li>
                      <a onClick={() => getInfluencerWallet("EAHJNfFDtivTMzKMNXzwAF9RTAeTd4aEYVwLjCiQWY1E")} className="h-8">
                        ICED Knife
                      </a>
                    </li>
                    <li>
                      <a onClick={() => getInfluencerWallet("DxKc73eJX5J1kY5ND69hnLs7ox64Q2exN3BVUWxBtBjo")} className="h-8">
                        Knoxtrades
                      </a>
                    </li>
                    <li>
                      <a onClick={() => getInfluencerWallet("HLSgM1a7wSufVwe1NrPPR22ynY2aPsH8a1XQfqFsQiqY")} className="h-8">
                        0xCelon
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tooltip tooltip-left" data-tip="Clean up your wallet">
                <SelectAndConnectWalletButton
                  onUseWalletClick={onUseWalletClick}
                />
              </div>
              <WalletMultiButton />
            </div>
          ) : (
            <WalletMultiButton />
          )}

        </div>
        <div className="text-center">

          <div className="my-1">
            {error ? (
              <div>
                <h1>Error Occures</h1>
                {(error as any)?.message}
              </div>
            ) : null}
            <div>
              {publicKey ? (
                <div>
                  {!error && isLoading ? (
                    <div className="grid grid-flow-row auto-rows-max content-center h-[52rem]">
                      <Loader />
                    </div>
                  ) : (
                    <div className="mx-2"><PointRanking nfts={nfts} error={error} /></div>
                  )}
                  <div className="grid grid-cols-7">
                    <div className="col-span-1">
                      {!error && isLoading ? (
                        <div className="">
                        </div>
                      ) : (
                        <div className="p-1">
                          <div className="p-1 rounded h-[51rem] mr-1 overflow-auto">
                            {history?.map((num: any) => (
                              
                              <div key={num}>
                                {num.type != "bid" ? (
                                <div className="rounded bg-base-200 text-sm">
                                  <p className="text-xs">{convertTimestamp(num.blockTime)}</p>
                                  <button className="btn mt-1 btn-xs">
                                    <a href={`https://magiceden.io/marketplace/${num.collection}`} target="_blank">
                                      <p className="uppercase">{num.collection?.replaceAll("_", " ")}</p>
                                    </a></button>
                                  <div className="grid grid-cols-3 m-1 p-1">
                                    {num.type == "buyNow" && num.buyer == walletToParsePublicKey ?(
                                      <p className="rounded bg-green-600">BUY</p>
                                    ) : (
                                      num.type == "list" ? (
                                        <p className="rounded bg-yellow-600">LIST</p>
                                      ) : (
                                        num.type == "delist" ? (
                                          <p className="rounded bg-gray-500">DELIST</p>
                                        ) : (
                                          num.type == "buyNow" && num.seller == walletToParsePublicKey ? (
                                            <p className="rounded bg-red-600">SELL</p>
                                          ) : (
                                            num.type == "cancelBid" ? (
                                              <p className="rounded bg-blue-600">CANCEL</p>
                                            ) : (
                                              <p className="rounded w-24">{num.type}</p>
                                            )
                                          )
                                        )
                                      )
                                    )}<button className="btn btn-xs bg-gray-800 rounded p-1 w-6 shadow-sm">
                                      <a href={`https://magiceden.io/item-details/${num.tokenMint}`} target="_blank">
                                        👁️
                                      </a></button>
                                    <p className="mt-1 text-pink-300">{num.price.toFixed(2)}◎</p></div>
                                </div>
                                ):(null)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {!error && isLoading ? (
                      <div className="col-span-6">

                      </div>
                    ) : (
                      <div className="col-span-6">
                        <NftList nfts={nfts} error={error} />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <ErrorScreen />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

type NftListProps = {
  nfts: NftTokenAccount[];
  error?: Error;
};

const NftList = ({ nfts, error }: NftListProps) => {
  if (error) {
    return null;
  }

  if (!nfts?.length) {
    return (
      <div className="text-center text-5xl pt-28 align-center h-[52.5rem]">
        <div>No NFTs found in this wallet</div>
      </div>
    );
  }

  const [pagination, setPagination] = useState({
    data: nfts,
    offset: 0,
    numberPerPage: 21,
    pageCount: 0,
    currentData: nfts
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
    <div className="p-2 h-[49.5rem]">
      <div className="grid grid-cols-2 md:grid-cols-7 gap-2 items-start overflow-auto max-h-[49rem]">
        {/*nfts?.map((nft) => (
          <NftCard key={nft.mint} isConnectedWallet={isConnectedWallet} details={nft} onSelect={() => { }} />
        ))*/}
        {pagination.currentData && pagination.currentData.map((nft: any, index) => (
            <div key={index} className="post rounded bg-base-300 text-sm">
              <NftCard key={nft.mint} isConnectedWallet={isConnectedWallet} details={nft} onSelect={() => { }} />
            </div>
          ))}
      </div>
      <div className="rounded mt-1 mx.-auto bg-base-300">
        {nfts.length >= 21 ? (
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
        ):(null)}
        </div>
    </div>
  );
};

const Balance = ({ }) => {
  const [balance, setBalance] = useState("")
  const handleChangeBalance = (val: string) => {
    setBalance(val)
  }
  useEffect(() => {
    (async () => {
      try {
        fetch('https://solana-api.projectserum.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            { "jsonrpc": "2.0", "id": 1, "method": "getBalance", "params": [walletPublicKey] }
          )
        }).then(res => res.json())
          .then(json => {
            handleChangeBalance((json.result.value / LAMPORTS_PER_SOL).toFixed(4))
          });
      } catch (e) {
        console.log(e)
      }

    })();
  }, [balance])
  return (
    <div className="flex justify-between text-sm ml-2">
      <p className="font-bold">SOL Balance:&nbsp;</p><p>{balance}◎</p>
    </div>
  )
}

const DomainName = ({ }) => {
  const [domain, setDomain] = useState("loading...")
  const handleChangeDomain = (val: string) => {
    setDomain(val)
  }
  const pupKey = new PublicKey(walletPublicKey);
  useEffect(() => {
    (async () => {
      try {
        const connection = new Connection('https://solana-api.projectserum.com')
        const filters = [
          {
            memcmp: {
              offset: 32,
              bytes: pupKey.toBase58(),
            },
          },
        ];
        const accounts = await connection.getProgramAccounts(NAME_PROGRAM_ID, {
          filters,
        })
        const domainKey = new PublicKey(accounts[0].pubkey.toString());
        handleChangeDomain(await performReverseLookup(connection, domainKey) + ".sol")
      } catch (err) {
        console.log(err)
        handleChangeDomain("none")
      }
    })();
  }, [])
  
  return (
    <div className="flex justify-between text-sm"><p className="font-bold">Domain:&nbsp;</p><p>{domain}</p></div>
  )
}

const PointRanking = ({ nfts, error }: NftListProps) => {
  var junksCount: number = 0
  var smbCount: number = 0
  var facesCount: number = 0
  var points = 0
  nfts.forEach((element: any) => {
    if (element.updateAuthority == "EshFf23GMA55yKPCQm76KrhSyfp7RuAsjDDpHE7wTeDM") {
      junksCount++
    }
    if (element.updateAuthority == "FEtQrCx12b9ebbTZq8Un11RNJUYxiDQF4zQCJctzRYH6") {
      smbCount++
    }
    if (element.updateAuthority == "8DQoDXZvWrUHjp4DbjFTW8AhXsdTBgYVicwieJ6FzKVe") {
      facesCount++
    }
  });
  points = (junksCount * 5) + (smbCount * 10) + (facesCount * 25)
  if (error) {
    return null;
  }

  return (
    <div className="p-1 bg-base-200 rounded flex justify-between">
      <DomainName />
      <Balance />
      <div className="flex justify-between text-sm"><p className="font-bold">NFT Balance:&nbsp;</p><p>{nfts.length}</p></div>
      <div className="flex justify-between text-sm"><p className="font-bold">SolJunks:&nbsp;</p><p>{junksCount}</p></div>
      <div className="flex justify-between text-sm"><p className="font-bold">$olana Money Bu$ine$$:&nbsp;</p><p>{smbCount}</p></div>
      <div className="flex justify-between text-sm"><p className="font-bold">Faces of $MB:&nbsp;</p><p>{facesCount}</p></div>
      <div className="flex justify-between text-sm mr-2"><p className="font-bold">Wallet Score:&nbsp;</p><p>{points}</p></div>
    </div>
  );
};