import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ThirdwebProvider,
  embeddedWallet,
  metamaskWallet,
  phantomWallet,
  walletConnect,
} from '@thirdweb-dev/react';
import { Scroll } from '@thirdweb-dev/chains';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={Scroll}
      clientId="b1d2187beccc295e57ae5922065821dd"
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        embeddedWallet({
          auth: {
            options: ['email', 'google', 'apple', 'facebook'],
          },
        }),
        phantomWallet(),
        walletConnect(),
      ]}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);

reportWebVitals();
