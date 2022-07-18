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
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
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
