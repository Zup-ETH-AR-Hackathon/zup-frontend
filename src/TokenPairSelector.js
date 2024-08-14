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

  const [token1, setToken1] = useState({
    value: 'ETH',
    label: 'ETH',
    id: '0x5300000000000000000000000000000000000004',
  });
  const [token2, setToken2] = useState({
    value: 'WBTC',
    label: 'WBTC',
    id: '0x3c1bca5a656e69edcd0d4e36bebb3fcdaca60cf1',
  });

  const tokenOptions = [
    {
      value: 'ETH',
      label: 'ETH',
      id: '0x5300000000000000000000000000000000000004',
    },
    {
      value: 'WBTC',
      label: 'WBTC',
      id: '0x3c1bca5a656e69edcd0d4e36bebb3fcdaca60cf1',
    },
    {
      value: 'USDT',
      label: 'USDT',
      id: '0xf55bec9cafdbe8730f096aa55dad6d22d44099df',
    },
    {
      value: 'USDC',
      label: 'USDC',
      id: '0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4',
    },
  ];

  const handleToken1Change = option => setToken1(option);
  const handleToken2Change = option => setToken2(option);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const baseURL = 'https://zup-backend-8d25fb328a21.herokuapp.com';
      const response = await fetch(
        `${baseURL}/search?tokenA=${token1.id}&tokenB=${token2.id}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      navigate('/second', { state: { token1, token2, data } });
    } catch (error) {
      console.error('Error fetching data:', error);
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
