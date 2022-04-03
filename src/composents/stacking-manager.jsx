import { useContext, useState } from "react";
import { ActionButton, TransparentButton } from "../utils/styled";
import Rodal from "rodal";

// include styles
import "rodal/lib/rodal.css";
import { BigNumber, ethers } from "ethers";
import { web3Context } from "../contexts/web3-modal-context";
import useAuth from "../hooks/useAuth";
import { approve } from "../utils/approve";
import { deposit, withdraw } from "../utils/poolUtils";
import { loadContext } from "../contexts/load-context";
import { toast } from "react-toastify";
import styled from "styled-components";
import { dashBoardContext } from "../contexts/dashboard-context";
import { RoundedGradientMask } from "./HotPools";
export const Input = styled.input`
  padding: 0.3rem;
  background: transparent;
  border: 2px solid #245ce7;
  border-radius: 15px;

  position: relative;
  + span {
    display: block;
    padding: 1rem;
    font-size: 1rem;
  }
`;

const StackingManager = ({
  pool: {
    vault,
    allowance,
    userDeposited,
    userTokenBalance,
    stakedToken,
    stakedTokenName,
  },
  visible,
  onClose,
}) => {
  const [stakeModal, setStakeModal] = useState(false);
  const [unstakeModal, setUnstakeModal] = useState(false);

  const [locked, setLocked] = useState(false);
  const [value, setValue] = useState(0);

  const { activeLoad, disableLoad } = useContext(loadContext);

  return (
    <div>
      <Rodal visible={visible} onClose={onClose}>
        <div className="w-full flex">
          <RoundedGradientMask className="rounded-3xl" />
          <div className="box flex bg-blue rounded-3xl flex-col justify-center">
            <div className="flex flex-wrap justify-center z-50">
              <h1 className="text-center mb-4 w-full text-2xl">
                Manage your funds
              </h1>
              <ActionButton
                className="block mr-2"
                onClick={() => setStakeModal(true)}
              >
                Stake
              </ActionButton>
              <ActionButton
                onClick={() => setUnstakeModal(true)}
                className="block ml-2"
              >
                Unstake
              </ActionButton>
            </div>
          </div>
        </div>
      </Rodal>

      <Rodal
        visible={stakeModal}
        onClose={() => setStakeModal(false)}
        height={360}
      >
        <RoundedGradientMask className="rounded-3xl" />
        <div className="box flex bg-blue rounded-3xl flex-col justify-center w-full z-50">
          <h1 className="block mb-8 text-center text-2xl">Deposit</h1>
          <form
            className="block mb-8"
            onSubmit={async (e) => {
              e.preventDefault();

              if (locked) return;
              setLocked(true);

              activeLoad();

              if (!(allowance > 0)) {
                approve(stakedToken, vault)
                  .then(() => {
                    setLocked(false);
                    return deposit(vault, value).then((resolve) => {
                      return resolve.wait();
                    });
                  })
                  .then(() => {
                    disableLoad();
                    setStakeModal(false);
                    toast.success("Your deposit was a success");
                  })
                  .catch((err) => {
                    console.error(err);
                    setLocked(false);
                    disableLoad();
                  });
              } else {
                deposit(vault, value)
                  .then((resolve) => {
                    setLocked(false);
                    return resolve.wait();
                  })
                  .then(() => {
                    disableLoad();
                    setStakeModal(false);
                    toast.success("Your deposit was a success");
                  })
                  .catch((err) => {
                    console.error(err);
                    setLocked(false);
                    disableLoad();
                  });
              }
            }}
          >
            <div className="relative stake-unstake-input mx-auto block flex flex-wrap">
              <Input
                className="block mx-auto flex-1"
                required
                value={value}
                onChange={({ target }) => {
                  const formated = target.value
                    .replace(" ", "")
                    .replace(",", ".")
                    .replace("..", ".")
                    .replace(/[^0-9.]/, "");
                  setValue(formated);
                }}
                placeholder="1.0"
                type="text"
                name="deposit"
              />
              <span>{stakedTokenName}</span>
            </div>
            <span
              className="block w-full cursor-pointer text-xs ml-2 mt-2"
              onClick={() => {
                setValue(userTokenBalance.toString());
              }}
            >
              max
            </span>
            <ActionButton
              type="submit"
              className="block mt-8 p-8 hover-border hover-text mt-8 deposit-button mx-auto"
            >
              Deposit
            </ActionButton>
          </form>
          <div className="text-center p-2 mb-4">
            Your balance ≈{Math.round(userTokenBalance * 1000) / 1000}
            <span className="ml-2">{stakedTokenName}</span>
          </div>
        </div>
      </Rodal>
      <Rodal
        visible={unstakeModal}
        onClose={() => setUnstakeModal(false)}
        height={360}
      >
        <RoundedGradientMask className="rounded-3xl" />
        <div className="box flex bg-blue rounded-3xl flex-col justify-centeghr w-full z-50">
          <h1 className="block mb-8 text-center text-2xl">Withdraw</h1>
          <form
            className="block mb-8"
            onSubmit={async (e) => {
              e.preventDefault();
              if (locked) return;
              setLocked(true);

              activeLoad();

              if (!(allowance > 0)) {
                approve(stakedToken, vault)
                  .then(() => {
                    setLocked(false);

                    return withdraw(vault, value).then((resolve) => {
                      return resolve.wait();
                    });
                  })
                  .then(() => {
                    disableLoad();
                    setUnstakeModal(false);
                    toast.success("Your deposit was a success");
                  })
                  .catch((err) => {
                    console.error(err);
                    setLocked(false);

                    disableLoad();
                  });
              } else {
                withdraw(vault, value)
                  .then((resolve) => {
                    setLocked(false);
                    return resolve.wait();
                  })
                  .then(() => {
                    disableLoad();
                    setUnstakeModal(false);
                    toast.success("Your deposit was a success");
                  })
                  .catch((err) => {
                    console.error(err);
                    setLocked(false);
                    disableLoad();
                  });
              }
            }}
          >
            <div className="relative stake-unstake-input mx-auto flex flex-wrap">
              <Input
                className="flex-1 block mx-auto"
                required
                value={value}
                onChange={({ target }) => {
                  const formated = target.value
                    .replace(" ", "")
                    .replace(",", ".")
                    .replace("..", ".")
                    .replace(/[^0-9.]/, "");
                  setValue(formated);
                }}
                placeholder="1.0"
                type="text"
                name="deposit"
              />
              <span>{stakedTokenName}</span>
            </div>
            <span
              className="block w-full cursor-pointer text-xs pl-4 mt-2"
              onClick={() => {
                setValue(userDeposited.toString());
              }}
            >
              max
            </span>
            <ActionButton className="block mt-8 p-8 hover-border hover-text mt-8 deposit-button mx-auto">
              Withdraw
            </ActionButton>
          </form>
          <div className="text-center p-2 mb-4">
            Your deposited balance ≈ {Math.round(userDeposited * 1000) / 1000}
            <span className="ml-2">{stakedTokenName}</span>
          </div>
        </div>
      </Rodal>
    </div>
  );
};
export default StackingManager;
