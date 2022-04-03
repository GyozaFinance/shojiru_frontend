import { useContext } from "react";
import { web3Context } from "../contexts/web3-modal-context";

import Pools from "./pools";
import { Puff } from "react-loader-spinner";
import { loadContext } from "../contexts/load-context";
import styled from "styled-components";

import Header from "./Header";
import Hero from "./Hero";
import HotPools from "./HotPools";
import Filters from "./Filters";

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
  const { selectedNetwork, changeNetwork } = useContext(web3Context);

  const { load } = useContext(loadContext);
  return (
    <div id="dashboard" className="overflow-hidden relative">
      <Header />
      <Hero />
      <div id="content" className="z-50 relative">
        <div className="pools mx-auto pb-20">
          <HotPools />
          <Filters />
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
    </div>
  );
};
export default DashBoard;
