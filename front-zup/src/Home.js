import React from 'react';
import TokenPairSelector from './TokenPairSelector';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h2 className='little-title'>ZUP IN</h2>
        <TokenPairSelector />
      </div>
    </div>
  );
}

export default Home;