import React from 'react';
import { Link } from 'react-router-dom';
import { ConnectWallet } from '@thirdweb-dev/react';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="enabled-link">
          Zup In
        </Link>
        <Link to="/mypools" className="disabled-link">
          My Pools
        </Link>
      </div>
      <div className="header-right">
        <ConnectWallet
          modalSize="wide"
          theme="light"
          btnTitle="Connect Wallet"
          modalTitle="Connect your favorite wallet"
          onConnect={wallet => {console.log('connected to', wallet);
          }}
        />
      </div>
    </header>
  );
}

export default Header;
