import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useEmbeddedWallet } from "@thirdweb-dev/react";
import { ThirdwebProvider, coinbaseWallet, embeddedWallet, metamaskWallet, phantomWallet, trustWallet, walletConnect } from "@thirdweb-dev/react";

const customNetwork = {
  chainId: 534352, 
  rpc: ["https://534352.rpc.thirdweb.com/${THIRDWEB_API_KEY}"],
  nativeCurrency: {
    name: "Ether",
    symbol: "SCRL",
    decimals: 18,
  },
  blockExplorers: {
    default: { name: "Custom Explorer", url: "https://scrollscan.com" },
  },
  name: "Scroll",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={customNetwork}
      clientId="b1d2187beccc295e57ae5922065821dd"
      supportedWallets={[
        embeddedWallet(),
        metamaskWallet(),
        phantomWallet(),
        coinbaseWallet(),
        walletConnect(),
        trustWallet(),
      ]}
    >
      <App />    
    </ThirdwebProvider>
  </React.StrictMode>
);

reportWebVitals();
