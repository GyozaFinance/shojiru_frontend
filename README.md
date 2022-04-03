# Shojiru.finance!

Welcome to Shojiru.finance front-end repository! This is our entry for the Telos Spark hackathon. If you're interested in the contract side, head over to the contract repository, for a more technical explanation.

Shojiru.finance is a proof-of-concept of a native yield optimizer, built for Telos.

## Why another yield optimizer?

There exist many Yield optimizers in the EVM market (See Beefy or Autofarm, for instance), most work by compounding the user's rewards and take some management fees. This economic model is indeed great a battle-tested, but for we weren't satisfied with it. We thus took the opportunity of this hackathon to "hack" it a little bit, and improve the user's yield in the meantime!

## How does it work?

Shojiru.finance will stake the user's LP tokens into the AMM's farm (here, zappy.finance was used). The reward ($Zappy) will then be sold on the market and exchanged for $Shojiru token. The earned $Shojiru will then be staked in our own boosted farm, with improved APYs, and compounded every day. 

This mechanism allows to improve the yield of a user's investment, while protecting his capital, the added risk being only on the rewards and not on the principal. It can also be applied to any type of liquidity, increasing organically the rewards for very competitive pairs, such as stablecoins, for instance.

### Yeah, ok, but usually the token dumps, right?
You're right, most yield optimizer minting a yield token reached the floor after some time, the fees being not high enough to compensate the emission. With this model, this is not the case: because the protocol uses the rewards from the investments to buy everyday new tokens from the market, it creates a constant buy pressure, compensating the natural inflation.

As an added stabilizer, Shojiru has a treasury, along with a burning program, funded by the management fees. In case of a sharp decrease in liquidity, this allows the protocol to buy back tokens to protect the APYs and thus the attractivity of the platform.

## Wow, great! Can I start to use it?
Sure! The contracts should work, and you can already stake. Bear in mind that this is a test/alpha version that we set up for the hackathon: liquidity is low, the token is called "test" and some auditing/more on-chain testing needs to be done. Therefore, feel fee to try, but don't wager important amounts.

## Which link does your project has with Telos?
Given that we're one of the first defi projects on Telos, we understand our role as pionneers. Our Solidity dev (Yakitori in the Telos EVM dev chat) has been working closely with Telos core developpers to signal bugs, give feedback and debug issues. We plan to continue the collaboration, in order to improve the development experience for devs on Telos, which we think is pivotal to reach mass adoption.

## Roadmap
We plan in the short term to improve the UI of the platform, to make it even more easy to use, snappy (multicall anyone?) and stylish, add charts and proper docs. A proper launch is certainly on the table! In the medium term, We'll consider turning Shojiru.finance into a DAO, or at least adopt a collaborative model where Telos users can submit new strategies - either code or "recipes" and earn a fee from their usage. When a lending/borrowing will come, we're think about creating

## Who are we?
The team is composed of a Solidity dev (Yakitori/Kusanagi on Discord) and a Front-end dev (Loyu), with more than one year of experience in the cryptoverse as freelancers. We met on a mission for a client, and decided to work together for this hackathon! We're anon for the internet, because we like our privacy, but if the team wants us to do a KYC privately, we are open to it.