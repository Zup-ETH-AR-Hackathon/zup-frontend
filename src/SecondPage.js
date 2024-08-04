import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SecondPage.css';
import PoolTermSelector from './PoolTermSelector';
import DepositAmountInput from './DepositAmountInput';

const SecondPage = () => {
  const location = useLocation();
  const { token1, token2, data } = location.state || { token1: { value: 'ETH', label: 'ETH' }, token2: { value: 'WBTC', label: 'WBTC' }, data: null };
console.log("XATA",data);
  const [poolTerm, setPoolTerm] = useState('24h');
  const [depositAmount1, setDepositAmount1] = useState('');
  const [depositAmount2, setDepositAmount2] = useState('');

  const handlePoolTermChange = (term) => setPoolTerm(term);

  const handleDepositAmount1Change = (e) => setDepositAmount1(e.target.value);
  const handleDepositAmount2Change = (e) => setDepositAmount2(e.target.value);

  const poolTerms = [
    { yield: 'Yield', percent: `${data ? data.pool24hs.apr : 0}%`, name: data ? data.pool24hs.name : 'Loading...', img: './resources/lookup.svg' },
    { yield: 'Yield', percent: '34%', name: 'Sushi Swap', img: './resources/lookup.svg' },
    { yield: 'Yield', percent: '12%', name: 'SyncSwap', img: './resources/lookup.svg' },
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
              selectedToken={token1.label}
            />
            <DepositAmountInput
              depositAmount={depositAmount2}
              onDepositAmountChange={handleDepositAmount2Change}
              selectedToken={token2.label}
            />
          </div>
          <button className="add-liquidity-button">Zup in</button>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
