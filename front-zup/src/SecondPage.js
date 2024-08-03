// SecondPage.js
import React, { useState } from 'react';
import './SecondPage.css';
import PoolTermSelector from './PoolTermSelector';
import DepositAmountInput from './DepositAmountInput';

const SecondPage = () => {
  const [poolTerm, setPoolTerm] = useState('24h');
  const [depositAmount1, setDepositAmount1] = useState('');
  const [depositAmount2, setDepositAmount2] = useState('');

  const handlePoolTermChange = (term) => setPoolTerm(term);

  const handleDepositAmount1Change = (e) => setDepositAmount1(e.target.value);
  const handleDepositAmount2Change = (e) => setDepositAmount2(e.target.value);

  const tokenOptions = [
    { value: 'ETH', label: 'ETH' },
    { value: 'WBTC', label: 'WBTC' },
  ];

  const poolTerms = [
    { yield: 'Yield', percent:'54%', name: 'Uniswap' },
    { yield: 'Yield', percent:'34%', name: 'Sushi Swap' },
    { yield: 'Yield', percent:'12%', name: 'SyncSwap' },
  ];

  return (
    <div className="second-page">
      <div>
      <h2 className="title">ZUP IN</h2>
      <div className="form-container">
        <PoolTermSelector poolTerm={poolTerm} onTermChange={handlePoolTermChange} terms={poolTerms} />
        <div className="deposit-amounts">
          <h3 className="sub-title">Deposit Amount</h3>
          <DepositAmountInput
            depositAmount={depositAmount1}
            onDepositAmountChange={handleDepositAmount1Change}
            tokenOptions={tokenOptions}
            selectedToken="ETH"
          />
          <DepositAmountInput
            depositAmount={depositAmount2}
            onDepositAmountChange={handleDepositAmount2Change}
            tokenOptions={tokenOptions}
            selectedToken="WBTC"
          />
        </div>
        <button className="add-liquidity-button">Add Liquidity</button>
      </div>
      </div>
    </div>
  );
};

export default SecondPage;
