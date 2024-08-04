import React, { useState } from 'react';
import './PoolTermSelector.css';
import { ReactComponent as Fire } from './resources/fire.svg';

const PoolTermSelector = ({ onTermChange, terms }) => {
  const [selectedTerm, setSelectedTerm] = useState(null);

  const handleTermChange = (term) => {
    setSelectedTerm(term);
    onTermChange(term);
  };

  return (
    <div className="pool-terms">
      <h3 className="sub-title">Select Pool's Term</h3>
      <div className="duration">
        <p>24's Best</p>
        <p>24's Best</p>
      </div>
      <div className="terms">
        {terms.map(term => (
          <button
            key={term.name}
            className={`term-button ${selectedTerm && selectedTerm.id === term.id ? 'selected' : ''}`}
            onClick={() => handleTermChange(term)}
          >
            <div className='btn-terms-content'>
              <div>
                <div>{term.yield}</div>
                <div>
                  <span className="percent">{term.percent}</span>
                </div>
                <div className="name-tk">{term.name}</div>
              </div>
              <Fire />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PoolTermSelector;
