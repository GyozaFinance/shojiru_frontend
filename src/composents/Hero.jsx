import hero1 from "../images/hero1.png";
import hero2 from "../images/hero2.png";
import hero3 from "../images/hero3.png";
import styled from "styled-components";
import { useContext, useMemo } from "react";
import { dashBoardContext } from "../contexts/dashboard-context";
const HeroImages = styled.ul`
  display: flex;
  margin: 0 auto;
  max-width: 550px;
  > * {
    padding: 0 1rem;
  }
`;
const Hero = () => {
  const { globalTVL } = useContext(dashBoardContext);

  return (
    <div className="fixedSmallContainer mx-auto justify-center flex-wrap flex text-center p-4 md:p-8">
      <h1 className="text-center p-2 text-3xl w-full mb-4 md:mb-8 md:text-4xl">
        Get the <strong>yield</strong> your investments deserve
      </h1>
      <HeroImages>
        <li>
          <img src={hero1} alt="unicorn" />
        </li>
        <li>
          <img src={hero2} alt="unicorn" />
        </li>
        <li>
          <img src={hero3} alt="unicorn" />
        </li>
      </HeroImages>
      <h2 className="w-full text-primary text-3xl mt-4 md:text-4xl md:mt-8">
        TVL: {globalTVL} $
      </h2>
    </div>
  );
};
export default Hero;
