import React from 'react';
import TokenPairSelector from './TokenPairSelector';
import './Home.css';
import { ReactComponent as QUESTION } from './resources/question.svg';
import './Header.css';

function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <div className="middle">
          <h2 className="little-title">ZUP IN</h2>
          <QUESTION style={{ marginLeft: '10px' }} />
        </div>
        <TokenPairSelector />
      </div>
    </div>
  );
}

export default Home;
