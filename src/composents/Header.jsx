import React from "react";

import useAuth from "../hooks/useAuth";
import logo from "../images/logo.png";

import telegram from "../icons/telegram-brands.svg";
import discord from "../icons/discord.svg";
import doc from "../icons/doc.svg";
import github from "../icons/github.svg";
import tokenImage from "../images/token.png";
import connectIcon from "../icons/connect-icon.png";
import { GreenButton } from "../utils/styled";
import { FaPlusCircle } from "react-icons/fa";
import styled from "styled-components";
import { useReadOnlyTokenContract } from "../hooks/useContract";
import { registerToken } from "../utils/wallet";
const AbsoluteBottomRight = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;
const Header = () => {
  const { active, account, login, logout } = useAuth();
  const accountConverted = account ? account.toString() : "";
  const contract = useReadOnlyTokenContract();
  return (
    <header className="fixedContainer mx-auto mt-8 rounded-2xl">
      <nav id="navigation" className="flex mx-auto z-50 relative">
        <div className="flex p-4">
          <img src={logo} alt="logo" className="w-10 sm:w-12 md:mr-4" />
          <div className="flex flex-col justify-center">
            <span className="text-2xl hidden md:flex font-bold">
              Shoji.finance
            </span>
          </div>
        </div>
        <div className="flex justify-end flex-1 p-4">
          <div className="flex flex-col justify-center mr-4">
            <ul className="rs hidden sm:flex hidden">
              <li className="mx-2">
                <a href="/#" className="flex w-6" target="_blank">
                  <img src={github} alt="github" />
                </a>
              </li>
              <li className="mx-2">
                <a href="/#" className="flex w-5" target="_blank">
                  <img src={doc} alt="doc" />
                </a>
              </li>
              <li className="mx-2">
                <a href="/#" className="flex w-6" target="_blank">
                  <img src={discord} alt="discord" />
                </a>
              </li>
              <li className="mx-2">
                <a href="/#" className="flex w-5" target="_blank">
                  <img src={telegram} alt="telegram" />
                </a>
              </li>
            </ul>
          </div>
          <div
            className="flex flex-col justify-center mr-2 relative cursor-pointer"
            onClick={async () => {
              registerToken(
                contract.address,
                await contract.symbol(),
                await contract.decimals(),
                tokenImage
              );
            }}
          >
            <img src={tokenImage} alt="Shoji.finance" className="w-8" />
            <AbsoluteBottomRight>
              <FaPlusCircle />
            </AbsoluteBottomRight>
          </div>

          {!active && (
            <>
              <GreenButton className="ml-4" onClick={() => login()}>
                <span className="relative pl-10">
                  <img src={connectIcon} alt="" className="connect-icon" />
                  Connect
                </span>
              </GreenButton>
            </>
          )}

          {active && (
            <React.StrictMode>
              <div className="flex flex-col justify-center">
                <div className="flex">
                  <span className="mr-4 font-bold">
                    0x***
                    {accountConverted.slice(
                      accountConverted.length - 4,
                      accountConverted.length
                    )}
                  </span>
                </div>
              </div>
              <GreenButton
                className="cursor-pointer hover-text"
                onClick={() => {
                  logout();
                  localStorage.removeItem("login");
                }}
              >
                Disconnect
              </GreenButton>
            </React.StrictMode>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
