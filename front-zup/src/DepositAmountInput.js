// DepositAmountInput.js
import React from 'react';
import CustomDropdown from './CustomDropdown';

const DepositAmountInput = ({ depositAmount, onDepositAmountChange, tokenOptions, selectedToken }) => {
  return (
    <div className="amount-input">
      <input
        type="number"
        value={depositAmount}
        onChange={onDepositAmountChange}
        placeholder="0"
      />
      <CustomDropdown options={tokenOptions} value={selectedToken} />
    </div>
  );
};

export default DepositAmountInput;
