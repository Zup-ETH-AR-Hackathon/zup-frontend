import React from 'react';
import './DepositAmountInput.css';

const DepositAmountInput = ({ depositAmount, onDepositAmountChange, selectedToken }) => {
  return (
    <div className="amount-input-container">
      <input
        type="number"
        value={depositAmount}
        onChange={onDepositAmountChange}
        placeholder="0"
        className="amount-input"
      />
      <span className="selected-token">{selectedToken}</span>
    </div>
  );
};

export default DepositAmountInput;