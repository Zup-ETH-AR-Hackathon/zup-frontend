import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';
import './TokenPairSelector.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LOOKUP } from './resources/lookup.svg';
import { ReactComponent as LOADER } from './resources/loader.svg';
import './Header.css';

function TokenPairSelector() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [token1, setToken1] = useState({ value: 'ETH', label: 'ETH' });
  const [token2, setToken2] = useState({ value: 'WBTC', label: 'WBTC' });

  const tokenOptions = [
    { value: 'ETH', label: 'ETH' },
    { value: 'BTC', label: 'BTC' },
    { value: 'WBTC', label: 'WBTC' },
    { value: 'USDT', label: 'USDT' },
    { value: 'USDC', label: 'USDC' },
  ];

  const handleToken1Change = option => setToken1(option);
  const handleToken2Change = option => setToken2(option);

  const handleClick = async () => {
    setIsLoading(true); 

    try {
      const response = await fetch(`https://zup-backend-507748619dec.herokuapp.com/search?tokenA=0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4&tokenB=0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      navigate('/second', { state: { token1, token2, data } }); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="token-pair-selector">
      <div>
        <label className="sub-title">Select Token Pair</label>
        <div className="dropdowns">
          <CustomDropdown
            options={tokenOptions}
            value={token1.value}
            onChange={handleToken1Change}
          />
          <CustomDropdown
            options={tokenOptions}
            value={token2.value}
            onChange={handleToken2Change}
          />
        </div>
        <button
          className="search-button"
          onClick={handleClick}
          style={{
            backgroundColor: isLoading ? '#ECECED' : '#7357FF',
            color: isLoading ? '#C6C5CA' : 'white',
          }}>
          <span className="btn-text-search">
            {isLoading ? 'Searching pool...' : 'Search Pools'}
          </span>{' '}
          {isLoading ? (
            <LOADER style={{ marginLeft: '10px' }} />
          ) : (
            <LOOKUP style={{ marginLeft: '10px' }} />
          )}
        </button>
      </div>
    </div>
  );
}

export default TokenPairSelector;
