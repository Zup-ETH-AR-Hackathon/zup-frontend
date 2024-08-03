import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThirdwebProvider, coinbaseWallet, embeddedWallet, metamaskWallet, phantomWallet, trustWallet, walletConnect } from "@thirdweb-dev/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain="ethereum"
      clientId="b1d2187beccc295e57ae5922065821dd"
      supportedWallets={[
        embeddedWallet(),
        metamaskWallet(),
        phantomWallet(),
        coinbaseWallet(),
        walletConnect(),
        trustWallet()
      ]}
    >
      <App />    
    </ThirdwebProvider>

  </React.StrictMode>
);
reportWebVitals();
