import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SecondPage.css';
import PoolTermSelector from './PoolTermSelector';
import DepositAmountInput from './DepositAmountInput';
import { Web3Button } from '@thirdweb-dev/react';

const contractAddress = '0xdA0C1c282137d1D4b01ce31536d56959eB9da41c';

const SecondPage = () => {
  const location = useLocation();
  const { token1, token2 } = location.state || {
    token1: { value: 'ETH', label: 'ETH' },
    token2: { value: 'WBTC', label: 'WBTC' },
  };

  const [poolTerm, setPoolTerm] = useState('24h');
  const [depositAmount1, setDepositAmount1] = useState('');
  const [depositAmount2, setDepositAmount2] = useState('');

  const handlePoolTermChange = term => setPoolTerm(term);

  const handleDepositAmount1Change = e => setDepositAmount1(e.target.value);
  const handleDepositAmount2Change = e => setDepositAmount2(e.target.value);

  const poolTerms = [
    {
      yield: 'Yield',
      percent: '54%',
      name: 'Uniswap',
      img: './resources/lookup.svg',
    },
    {
      yield: 'Yield',
      percent: '34%',
      name: 'Sushi Swap',
      img: './resources/lookup.svg',
    },
    {
      yield: 'Yield',
      percent: '12%',
      name: 'SyncSwap',
      img: './resources/lookup.svg',
    },
  ];

  const handleAction = async contract => {
    const callee = '0xAAA78E8C4241990B4ce159E105dA08129345946A';
    const params = {
      token0: '0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4',
      token1: '0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df',
      fee: 100,
      token0Amount: 100000,
      token1Amount: 100000,
      token0Min: 0,
      token1Min: 0,
      deadline: 1723753468,
    };
    const ret = await contract.call('depositUniswap', [callee, params]);
    console.log('handleAction', ret);
  };

  // const handleActionTest = async contract => {
  //   await contract.call('store', [111]);
  //   const ret = await contract.call('retrieve');
  //   alert(ret.toNumber());
  // };

  return (
    <div className="second-page">
      <div>
        <h2 className="title">ZUP IN</h2>
        <div className="form-container">
          <PoolTermSelector
            poolTerm={poolTerm}
            onTermChange={handlePoolTermChange}
            terms={poolTerms}
          />
          <div className="deposit-amounts">
            <h3 className="sub-title">Deposit Amount</h3>
            <DepositAmountInput
              depositAmount={depositAmount1}
              onDepositAmountChange={handleDepositAmount1Change}
              selectedToken={token1.label}
            />
            <DepositAmountInput
              depositAmount={depositAmount2}
              onDepositAmountChange={handleDepositAmount2Change}
              selectedToken={token2.label}
            />
          </div>
          <Web3Button
            contractAddress={contractAddress}
            action={handleAction}
            className="add-liquidity-button">
            Zup in
          </Web3Button>

          {/* <Web3Button
            contractAddress="0xD3E0444fFcF316Db49D1526dd76E00b0F70676dB"
            action={handleActionTest}
            className="add-liquidity-button">
            TEST
          </Web3Button> */}
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
