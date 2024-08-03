import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThirdwebProvider, coinbaseWallet, embeddedWallet, metamaskWallet, phantomWallet, trustWallet, walletConnect } from "@thirdweb-dev/react";

// Define your custom network configuration
const customNetwork = {
  chainId: 534352, 
  rpc: ["https://534352.rpc.thirdweb.com/${THIRDWEB_API_KEY}"],
  nativeCurrency: {
    name: "Ether",
    symbol: "CTK",
    decimals: 18,
  },
  blockExplorers: {
    default: { name: "Custom Explorer", url: "https://scrollscan.com" },
  },
  name: "Scroll",
};

// Configure the ThirdwebProvider with the custom network and supported wallets
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={customNetwork}
      clientId="b1d2187beccc295e57ae5922065821dd" // Asegúrate de usar tu propio clientId aquí
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
