import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';
import './TokenPairSelector.css';
import { useNavigate } from 'react-router-dom';


function TokenPairSelector() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/second');
  };

  const [token1, setToken1] = useState({ value: 'ETH', label: 'ETH' });
  const [token2, setToken2] = useState({ value: 'WBTC', label: 'WBTC' });

  const tokenOptions = [
    { value: 'ETH', label: 'ETH' },
    { value: 'BTC', label: 'BTC' },
    { value: 'WBTC', label: 'WBTC' },
    { value: 'USDT', label: 'USDT' },
  ];

  const handleToken1Change = (option) => setToken1(option);
  const handleToken2Change = (option) => setToken2(option);

  return (
    <div className="token-pair-selector">
      <label className='sub-title'>Select Token Pair</label>
      <div className="dropdowns">
        <CustomDropdown options={tokenOptions} value={token1.value} onChange={handleToken1Change} />
        <CustomDropdown options={tokenOptions} value={token2.value} onChange={handleToken2Change} />
      </div>
      <button onClick={handleClick} className="search-button">Search Pools</button>
    </div>
  );
}

export default TokenPairSelector;
