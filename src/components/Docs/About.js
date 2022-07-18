import React, {useEffect, useState} from 'react';
import FooterSection from '../FooterSection';
import Header from '../Header';
import MobileMenu from '../MobileMenu';
import {Icon} from '@iconify/react';
import Sidebar from '../Sidebar';
import './supply.scss';

const About = () => {
  document.title = 'About ' + process.env.REACT_APP_NAME;
  const app_name = process.env.REACT_APP_NAME;
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
          <section className="about">
            <h1>About {app_name}</h1>
            <p>
              {app_name} is a Decentralized Social Media Platform just like your{' '}
              <b>Instagram</b> , <b>Facebook</b>. It is made with the help of
              Moralis and is connecting users worldwide which are on blockchain.{' '}
              {app_name} helps users to connect with other users which are on
              blockchain and learn from them as much as they can. ReachME also
              uses Moralis DB to keep a track of Signed users which Mint NFT and
              to keep a track of wallets connected to ReachME
            </p>
            <h1>What is a Decentralized Social Media Platform?</h1>
            <p>
              Decentralized Social Media, also called blockchain-based social
              media, refers to social media platforms that use sources such as
              the blockchain to power themselves. Therefore, any activity by a
              user on said platform is not supervised by a large central
              overseer, such as those with centralized social media platforms
              like Twitter and Facebook.{' '}
            </p>
            <h1>What is Rarible and why we use it?</h1>
            <p>
              Rarible (RARI) is a decentralized NFT marketplace and minting
              platform that allows digital artists to create and sell their
              tokenized artworks. Rarible launched in early 2020, providing
              digital artists with a diverse suite of services.
              <br />
              <br />
              The Laziminting is one of the powerful Plugin from Moralis that
              helps our users to mint NFT from our platform and see it on
              rarible as well with their provided token name and description
              <br />
              <br />
              With the help of technologies used in our platform, user can be
              able to mint an NFT and automatically list it on rarible. From
              there Users can put it up for sale or add it in a collection. NFTs
              minted from other Users from our platform are also accessible in
              your timeline and as well as in their profile as well. <br />
              <br />
              What are you waiting for ?? Start minting your first NFT{' '}
              <a href="/create-nft">here</a>
            </p>
            <h1>What is Metamask?</h1>
            <p>
              MetaMask is a browser plugin that serves as an Ethereum wallet,
              and is installed like any other browser plugin. Once it's
              installed, it allows users to store Ether and other ERC-20 tokens,
              enabling them to transact with any Ethereum address.
              <br />
              <br />
              The use of Metamask in {app_name} is to manage authentication of
              User and keeping their data private with the help of their Wallet
              Address.
            </p>
            <h1>Features of {app_name}</h1>
            <ul>
              <li>One to One Messaging.</li>
              <li>
                Connecting with other Users on <Icon icon="mdi:ethereum" />
                {'ETH '}
                BlockChain.
              </li>
              <li>Creating a Post that other Users Can Like</li>
              <li>Commenting on Post or Saving it for future purpose</li>
              <li>
                Minting NFT and Hosting it automatically on Rarible Platform
              </li>
              <li>Creating Groups</li>
              <li>Posting in Groups</li>
              <li>
                Appreciating Someone's Post by Tipping them 0.005
                <Icon icon="mdi:ethereum" />
              </li>
              <li>Updating Your Profile</li>
              <li>No Password Required to Register or Login</li>
              <li>
                Ability to view Minted NFT and posts from Other user on Your
                Homepage Timeline
              </li>
              <li>To view the Transactions of Tipping user</li>
              <li>
                Ability to view others followers and Minted NFts from them
              </li>
            </ul>

            <h1>Future Updates</h1>
            <ul>
              <li>Tipping Groups</li>
              <li>Able to Share Images and Videos on Messages</li>
              <li>Able to Post Videos</li>
              <li>To Burn the Minted NFT from our End</li>
              <li>List the NFT on sell while Minting it</li>
            </ul>

            <h1>What is a wallet? Why do I need one?</h1>
            <p>
              Your crypto wallet does that on a blockchain. It has an “ID” (a
              long string of numbers and letters), your cryptocurrencies and any
              NFTs you bought with those cryptocurrencies. There are a number of
              wallet providers, including Metamask (the most popular and easy to
              use), Fortmatic, Coinbase and Rainbow, among others.
              <br />
              <br /> When you create a crypto wallet, you get a “seed phrase” —
              a series of words which let you recover your currencies or NFTs if
              you lose access.
            </p>
            <h1>Conclusion</h1>
            <p>
              ReachME helps users worldwide to Connect with each other, Share
              Their Ideas about NFTs, CryptoCurrencies, Other Platforms
            </p>
          </section>
        </section>
      </section>
      <FooterSection />
    </>
  );
};

export default About;
