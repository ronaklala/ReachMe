import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import React, {useEffect, useState} from 'react';
import FooterSection from '../FooterSection';
import Header from '../Header';
import MobileMenu from '../MobileMenu';
import Sidebar from '../Sidebar';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './supply.scss';

const Docs = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    document.title = 'Documentation : JinX';
    if (sessionStorage.getItem('user') !== null) {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    } else {
      setUser();
    }
  }, []);
  return (
    <>
      <Header />
      <section className="wrapper">
        <section className="container">
          <Sidebar
            username={user.username}
            wallet={user.wallet}
            profile_url={user.profile_url}
          />
          <MobileMenu />
          <div className="docs">
            <Accordion className="accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>How and Where to Start Web3?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <h1>Web3 Start</h1>
                  <p>
                    Initially before starting web3, we recommend you should know
                    basics of Web2 and how it works, After having a Good
                    knowledge of that, you can move onto diving into Web3 and
                    its beauty.
                  </p>

                  <h1>What is Web3?</h1>
                  <p>
                    Web3 is no different from Web2 but it includes some more
                    features that are not available in web2. Web3 involves
                    BlockChains, CryptoCurrencies, constant transaction and
                    interaction with BlockChain. To Start with Web3 You must
                    have a MetaMask Wallet.
                    <br />
                    <br /> A Metamask Wallet is a wallet that holds your
                    CryptoCurrencies. Start your journey by installing the
                    Metamask extension in your chrome and create a Wallet.Watch
                    The video below to get more knowledge about the Metamask
                    wallet and its usage.
                    <br />
                    <br />
                    <br />
                    <iframe
                      src="https://www.youtube.com/embed/afATAw7iuUM"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      style={{borderRadius: '15px'}}
                      className="ytVideo"
                      allowfullscreen></iframe>
                    <br />
                    <br />
                    One you are done with the Metamask wallet setup, lets start
                    by adding funds in your account, head over to{' '}
                    <a href="https://faucet.egorfine.com/">
                      Ropsten Faucet{' '}
                    </a>{' '}
                    and enter your metamask wallet address there. In some 1-2
                    minutes you can see the funds in your metamask wallet which
                    you can use for testing purposes.
                  </p>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion className="accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>Smart Contracts</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <h1>What Are Smart Contracts?</h1>
                <p>
                  Smart contracts are simply programs stored on a blockchain
                  that run when predetermined conditions are met. They typically
                  are used to automate the execution of an agreement so that all
                  participants can be immediately certain of the outcome,
                  without any intermediary’s involvement or time loss. They can
                  also automate a workflow, triggering the next action when
                  conditions are met.
                  <br />
                  <br />
                  Smart Contracts are written in various languages such as
                  Solana and Solidity. The Remix IDE helps a user to code and
                  deploy a Smart Contract and to use it in their code. To Help
                  you more with the Integration Smart Contract here is a great
                  video which helped us also,
                  <br />
                  <br />
                  <iframe
                    src="https://www.youtube.com/embed/h9PdvEDuZS8"
                    title="YouTube video player"
                    frameborder="0"
                    className="ytVideo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
                </p>
                <h1>How to Connect Deployed Smart Contract with FrontEnd?</h1>
                <p>
                  <ul>
                    <li>Deploy The Smart Contract on The Remix IDE.</li>
                    <li>
                      Get the Contract Address and The Contract ABI from the
                      deployed contract from the IDE.
                    </li>
                    <li>
                      Store those in a seperate File in a JS file, Access Those
                      in your FrontEnd File such as HTML / JS Files by method of
                      web3.eth.Contract('Contact Address','Abi')
                    </li>
                    <li>
                      Once the above method is done, you can now access your
                      smart contract functions in the FrontEnd and store and
                      retireve data on BlockChain
                    </li>
                  </ul>
                </p>
              </AccordionDetails>
            </Accordion>

            <Accordion className="accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>Web3 Wallets</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p>
                    In simple words, web3 wallets are digital platforms that
                    give access to the web3 space. They are similar to regular
                    crypto wallets, allowing users to store, send, and receive
                    cryptocurrencies. Moreover, through these wallets, users can
                    interact with smart contracts, transact NFTs, develop
                    blockchain platforms, and connect with communities. Web3
                    wallets create a wide range of valuable applications beyond
                    the normal existing digital wallets out there. Usually,
                    these wallets have in-built browsers. There are many
                    different types of wallets such as CoinBase, WalletConnect
                    and Metamask, Metamask is the most famous among all of them
                  </p>
                  <h1>MetaMask</h1>
                  <p>
                    MetaMask is a non-custodial wallet that allows you to buy,
                    store, send and swap tokens. It’s available as a browser
                    extension on Chrome and other popular web browsers. MetaMask
                    is available on both Android and iOS.
                    <br />
                    <br />
                    <img
                      src="https://s32659.pcdn.co/wp-content/uploads/2021/09/guide_metamask.jpg.webp"
                      alt="metamask"
                    />
                    <br />
                    <br />
                    It’s essentially built for the Ethereum Blockchain, where
                    users get to save Ethereum and other ERC-20 tokens. Through
                    MetaMask, users also get to explore many decentralized apps
                    by providing a secure way of integrating projects and
                    interacting with on-chain applications.
                    <br />
                    <br />
                    For more advanced users, MetaMask allows you to interact
                    with DApp in a permissionless approach. This means that
                    there’s no need to link your private keys to DApps, making
                    the whole process much safer.
                  </p>
                  <h1>RainBow</h1>
                  <p>
                    As stated on its website, Rainbow is a non-custodial, fun,
                    easy-to-use, and secure wallet that allows users to create
                    an Ethereum wallet, collect NFTs and explore the new world
                    of web3.
                    <br />
                    <br />
                    <img
                      src="https://s32659.pcdn.co/wp-content/uploads/2019/05/quantum_future.jpg.webp"
                      alt="rainbow"
                    />
                    <br />
                    <br />
                    It currently works well on iOS and Android mobile devices.
                    The wallet comes with a series of innovative features, such
                    as NFT support, WalletConnect integration, and much more.
                    <br />
                    <br />
                    Rainbow wallet offers an easy-to-use platform that provides
                    users an inbuilt swap functionality. This allows you to
                    transact between multiple ERC-20 tokens without an external
                    exchange. This wallet also ensures you don’t fall victim to
                    scam projects, so it has an approved list of verified tokens
                    safe to swap.
                  </p>
                  <h1>CoinBase</h1>
                  <p>
                    This is another self-custody wallet that offers access to
                    thousands of tokens and DApps, allowing you to store your
                    NFTs (ERC-721 tokens) all in one place. The wallet offers
                    seamless access to decentralized finance (DeFi), and you can
                    link your Ethereum tokens to many DeFi projects. In
                    addition, users can partake in legitimate online airdrops,
                    which increases their chances of getting free crypto coins.
                    <br />
                    <br />
                    <img
                      src="https://images.ctfassets.net/c5bd0wqjc7v0/nRAgADd16bWeKLdiNwNj3/9467b371c4055a16d0e195bf9cd70f19/Wallet_LP_Hero.png"
                      alt="coinbase"
                    />
                    <br />
                    <br />
                    You can also use DeFi liquidity pools to lend or borrow and
                    swap assets on the available decentralized exchanges.
                    Notably, the wallet supports ICOs, which helps users explore
                    new coins at the best possible prices. Furthermore, you can
                    harness the decentralized web on your phone or browser and
                    explore the available crypto-friendly stores.
                  </p>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </section>
      </section>
      <FooterSection />
    </>
  );
};

export default Docs;
