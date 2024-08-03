import React, { useState } from 'react';
import './SecondPage.css';
import CustomDropdown from './CustomDropdown';

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

  return (
    <div className="second-page">
      <div className="form-container">
        <h2 className="title">ZUP IN</h2>
        <div className="pool-terms">
          <h3 className="sub-title">Select Pool's Term</h3>
          <div className="terms">
            <button
              className={`term-button ${poolTerm === '24h' ? 'active' : ''}`}
              onClick={() => handlePoolTermChange('24h')}
            >
              <div>Yield 54%</div>
              <div>Uniswap</div>
            </button>
            <button
              className={`term-button ${poolTerm === '1m' ? 'active' : ''}`}
              onClick={() => handlePoolTermChange('1m')}
            >
              <div>Yield 34%</div>
              <div>Sushi Swap</div>
            </button>
            <button
              className={`term-button ${poolTerm === '3m' ? 'active' : ''}`}
              onClick={() => handlePoolTermChange('3m')}
            >
              <div>Yield 12%</div>
              <div>SyncSwap</div>
            </button>
          </div>
        </div>
        <div className="deposit-amounts">
          <h3 className="sub-title">Deposit Amount</h3>
          <div className="amount-input">
            <input
              type="number"
              value={depositAmount1}
              onChange={handleDepositAmount1Change}
              placeholder="0"
            />
            <CustomDropdown options={tokenOptions} value="ETH" />
          </div>
          <div className="amount-input">
            <input
              type="number"
              value={depositAmount2}
              onChange={handleDepositAmount2Change}
              placeholder="0"
            />
            <CustomDropdown options={tokenOptions} value="WBTC" />
          </div>
        </div>
        <button className="add-liquidity-button">Add Liquidity</button>
      </div>
    </div>
  );
};

export default SecondPage;
