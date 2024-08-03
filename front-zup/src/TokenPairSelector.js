import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';
import './TokenPairSelector.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LOOKUP } from './resources/lookup.svg';import './Header.css';
import { ReactComponent as LOADER } from './resources/loader.svg';import './Header.css';




function TokenPairSelector() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 

  const handleClick = () => {
    setIsLoading(true); // Set loading state
    setTimeout(() => {
      navigate('/second'); // Navigate after 1 second
    }, 1000);
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
      <button
        onClick={handleClick}
        className="search-button"
        style={{ backgroundColor: isLoading ? '#ECECED' : '#7357FF', color: isLoading ? '#C6C5CA' : 'white' }} 
      >
        <span className='btn-text-search'>{isLoading ? 'Searching pool...' : 'Search Pools'}</span>
        {isLoading ? <LOADER style={{ marginLeft: '10px' }} /> : <LOOKUP style={{ marginLeft: '10px' }} />}
      </button>
    </div>
  );
}

export default TokenPairSelector;
