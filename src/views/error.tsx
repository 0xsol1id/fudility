import React, { FC } from "react";

export const ErrorScreen: FC = ({ }) => {

  return (
    <div className="mx-auto">
      <div className="">
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
      </div>
    </div>
  );
};

export default ErrorScreen;