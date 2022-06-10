import { Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';

export async function burnTokenAndCloseAccount(image: any, tokenMintAddress: string, owner: PublicKey, wallet: WalletContextState, connection: Connection, amount:number, setAmount: Dispatch<SetStateAction<number>>, setIsburning: Dispatch<SetStateAction<boolean>>) {
    try {
        setIsburning(true)
        const mintPublickey = new PublicKey(tokenMintAddress);

        const associatedAddress = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mintPublickey,
            owner,
        );

        const burnInstruction = await Token.createBurnInstruction(
            TOKEN_PROGRAM_ID,
            mintPublickey,
            associatedAddress,
            owner,
            [],
            amount
        );

        const closeInstruction = await Token.createCloseAccountInstruction(
            TOKEN_PROGRAM_ID,
            associatedAddress,
            owner,
            owner,
            []
        );

        const BurnandCloseTransaction = new Transaction().add(burnInstruction, closeInstruction);

        const BurnandCloseSignature = await wallet.sendTransaction(BurnandCloseTransaction, connection);

        const confirmed = await connection.confirmTransaction(BurnandCloseSignature, 'processed');

        if (confirmed) {            
            setAmount(0)
            
            const createWebhookData = {
                  "username": "SolJunks Solana Beach Clean Up",
                  "embeds": [
                    {
                      "author": {
                        "name": "SolJunks Solana Beach Clean Up"
                      },
                      "image": {
                        "url": `${image}`
                        },
                      "fields": [
                        {
                          "name": "That Wallet",
                          "value": `${owner}`
                        },
                        {
                          "name": "burned that NFT",
                          "value": `${mintPublickey}`,
                          "inline": true 
                        }
                      ],
                      "color": 14303591,
                      "title": `PROOF OF BURN`,
                      "url": `https://explorer.solana.com/tx/${mintPublickey}`,
                      footer: {
                          text: 'powered by SolJunks.io',
                      }, 
                      "description": "Nice m8, you have made your contribution in cleaning up the solana ecosystem"
                    }
                  ]
            }
            
            await axios.post("https://discord.com/api/webhooks/983160073876545567/Jhe4i_RnLI1WlxGT-kE92VrBh63i4e2bCTCk9lwbYzbmvBDAisEjzJCpPx6B9aAE2xqL", createWebhookData);
        }
    } catch (error) {
        setIsburning(false)
    }

}

function _createWebhookData() {
    throw new Error('Function not implemented.');
}
