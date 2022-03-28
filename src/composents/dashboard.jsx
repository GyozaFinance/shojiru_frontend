import { useContext, useEffect, useState } from "react";
import { web3Context } from "../contexts/web3-modal-context";
import useAuth from "../hooks/useAuth";
import Switch from "react-switch";
import { networks } from "../utils/networks";
import Pools from "./pools";
import { dashBoardContext } from "../contexts/dashboard-context";
import { Puff, TailSpin } from "react-loader-spinner";
import { loadContext, LoadProvider } from "../contexts/load-context";
import styled from "styled-components";

import logo from "../images/eterna.png";
import potato from "../images/potato.png";
import triangle from "../images/triangle.png";
import triangle2 from "../images/triangle2.png";
import Footer from "./Footer";

const Load = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  > * {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
`;

const DashBoard = () => {
  const { active, account, login, logout } = useAuth();
  const accountConverted = account ? account.toString() : "";

  const { selectedNetwork, changeNetwork } = useContext(web3Context);
  const { ERC20Name, ERC20Balance } = useContext(dashBoardContext);
  const { load } = useContext(loadContext);
  return (
    <div
      id="dashboard"
      className="overflow-hidden relative"
      style={{ backgroundImage: `url(${triangle}), url(${triangle2})` }}
    >
      <div className="potato">
        <img src={potato} alt="potato" />
      </div>
      <nav
        id="navigation"
        className="flex fixedContainer mx-auto pt-8 z-50 relative"
      >
        <a href="/" className="block p-4">
          <img src={logo} alt="logo" />
        </a>
        <div className="flex justify-end flex-1 p-4">
          {!active && (
            <>
              <span
                className="cursor-pointer hover-text rounded-full border-white px-4 flex-col flex justify-center px-8 text-sm"
                onClick={() => login()}
              >
                Connect wallet
              </span>
            </>
          )}
          {active && (
            <>
              <span className="mr-4  flex hidden md:flex">
                <span className="mr-2">Balance: </span>
                {(ERC20Balance === null || ERC20Name === null) && (
                  <span className="relative mt-2">
                    <TailSpin
                      type="TailSpin"
                      color="#00BFFF"
                      className="relative mt-2"
                      height={10}
                      width={10}
                    />
                  </span>
                )}
                {ERC20Balance} {ERC20Name}
              </span>
              <span className="mr-4">
                0x***
                {accountConverted.slice(
                  accountConverted.length - 4,
                  accountConverted.length
                )}
              </span>
              <span
                className="cursor-pointer hover-text"
                onClick={() => {
                  logout();
                  localStorage.removeItem("login");
                }}
              >
                Disconnect
              </span>
            </>
          )}
        </div>
      </nav>

      <div id="content" className="z-50 relative">
        <div className="pools mx-auto">
          <div className="switch text-right p-4 fixedContainer mx-auto">
            <span className="relative inline-block">ETH</span>
            <Switch
              className="mx-4 relative top-2"
              onChange={(state) => {
                changeNetwork(state === true ? "0x38" : "0x1");
              }}
              checked={selectedNetwork.chainId === "0x1" ? false : true}
            />
            <span>BSC</span>
          </div>

          <Pools />
        </div>
      </div>
      {load && (
        <Load>
          <div>
            <Puff color="#00BFFF" height={100} width={100} />
          </div>
        </Load>
      )}
      <Footer />
    </div>
  );
};
export default DashBoard;
