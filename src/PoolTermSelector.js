import React from 'react';
import './PoolTermSelector.css';

const PoolTermSelector = ({ poolTerm, onTermChange, terms }) => {
  return (
    <div className="pool-terms">
      <h3 className="sub-title">Select Pool's Term</h3>
      <div className='duration'>
        <p>24's Best</p>
        <p>Month's Best</p>
        <p>3 Month's Best</p>
      </div>
      <div className="terms">
        {terms.map((term) => (
          <button
            key={term.name}
            className={`term-button ${poolTerm === term.name ? 'active' : ''}`}
            onClick={() => onTermChange(term.name)}
          >
            <div>{term.yield}</div>
            <div><span className='percent'>{term.percent}</span></div>
            <div className='name-tk'>{term.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PoolTermSelector;
