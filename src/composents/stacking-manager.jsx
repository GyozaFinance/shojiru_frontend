import { useContext, useState } from "react";
import { BlueButton, TransparentButton } from "../utils/styled";
import Rodal from "rodal";

// include styles
import "rodal/lib/rodal.css";
import { ethers } from "ethers";
import { web3Context } from "../contexts/web3-modal-context";
import useAuth from "../hooks/useAuth";
import { approve } from "../utils/approve";
import { deposit, withdraw } from "../utils/poolUtils";
import { loadContext } from "../contexts/load-context";
import { toast } from "react-toastify";
import styled from "styled-components";
import { dashBoardContext } from "../contexts/dashboard-context";
export const Input = styled.input`
  padding: 0.3rem;
  background: transparent;
  border: 2px solid #245ce7;
  border-radius: 15px;
  //width: 10rem;

  position: relative;
  + span {
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    padding: 1rem;
    font-size: 1rem;
    transform: translate(0, -50%);
  }
`;

const StackingManager = ({
  pool: { chef, vault, allowance, userDeposited, withdrawAmount },
}) => {
  const { account } = useAuth();

  const [stakeModal, setStakeModal] = useState(false);
  const [unstakeModal, setUnstakeModal] = useState(false);

  const [locked, setLocked] = useState(false);
  const [value, setValue] = useState(0);

  const { activeLoad, disableLoad } = useContext(loadContext);
  const { ERC20Balance, ERC20Name } = useContext(dashBoardContext);

  const { contract } = useContext(web3Context);
  return (
    <div className="max-w-xs w-full">
      <BlueButton
        className="block mx-auto w-full"
        onClick={() => setStakeModal(true)}
      >
        Stake
      </BlueButton>
      <TransparentButton
        onClick={() => setUnstakeModal(true)}
        className="block mx-auto mt-4 w-full"
      >
        Unstake
      </TransparentButton>
      <Rodal visible={stakeModal} onClose={() => setStakeModal(false)}>
        <h1 className="block mb-8 text-center text-2xl">Deposit</h1>
        <form
          className="block mb-8"
          onSubmit={async (e) => {
            e.preventDefault();
            if (locked) return;
            setLocked(true);

            activeLoad();

            if (!(allowance > 0)) {
              approve(contract, vault)
                .then(() => {
                  setLocked(false);
                  return deposit(chef, value).then((resolve) => {
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
          <div className="relative stake-unstake-input mx-auto block w-40">
            <Input
              className="w-full block mx-auto"
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
            <span>{ERC20Name}</span>
            <span
              className="block w-full cursor-pointer text-xs text-right pr-2 absolute"
              onClick={() => {
                setValue(ERC20Balance);
              }}
            >
              max
            </span>
          </div>
          <BlueButton className="block mt-8 p-8 hover-border hover-text mt-8 deposit-button mx-auto">
            Deposit
          </BlueButton>
        </form>
      </Rodal>
      <Rodal visible={unstakeModal} onClose={() => setUnstakeModal(false)}>
        <h1 className="block mb-8 text-center text-2xl">Withdraw</h1>
        <form
          className="block mb-8"
          onSubmit={async (e) => {
            e.preventDefault();
            if (locked) return;
            setLocked(true);

            activeLoad();

            const pricePerFullShare = await vault.getPricePerFullShare();
            const oldValue = value;
            const withDrawValue = Math.round(
              oldValue / (pricePerFullShare / 10 ** 18)
            ).toString();

            if (!(allowance > 0)) {
              approve(contract, vault)
                .then(() => {
                  setLocked(false);

                  return withdraw(vault, withDrawValue).then((resolve) => {
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
              withdraw(vault, withDrawValue)
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
          <div className="relative stake-unstake-input mx-auto block w-40">
            <Input
              className="w-full block mx-auto"
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
            <span>{ERC20Name}</span>
            <span
              className="block w-full cursor-pointer text-xs text-right pr-2 absolute"
              onClick={() => {
                setValue(userDeposited);
              }}
            >
              max
            </span>
          </div>
          <BlueButton className="block mt-8 p-8 hover-border hover-text mt-8 deposit-button mx-auto">
            Withdraw
          </BlueButton>
        </form>
      </Rodal>
    </div>
  );
};
export default StackingManager;
