import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connectWallet } from './connectWallet';
import { ReactComponent as PLUS } from './resources/plus.svg';import './Header.css';
import { ConnectWallet } from '@thirdweb-dev/react';


function Header() {
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnectWallet = async () => {
    const wallet = await connectWallet();
    if (wallet) {
      setWalletAddress(wallet.address);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="enabled-link">Zup In</Link>
        <Link to="/mypools" className="disabled-link">My Pools</Link>
      </div>
      <div className="header-right">
        {walletAddress ? (
          <span className="wallet-address">Address:{walletAddress}</span>
        ) : (
          <div>
        <ConnectWallet
          modalSize="compact"
          theme="light"
          btnTitle="Connect Wallet"
          modalTitle="Connect your favorite wallet"
        />

        
      </div>
        )}
      </div>
    </header>
  );
}

export default Header;
