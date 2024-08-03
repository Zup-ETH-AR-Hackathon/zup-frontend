import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: '172px',
    backgroundColor: '#f8f8f8',
    border: 'none',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '25px',
    padding: '10px',
    fontSize: '16px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'rgba(0, 0, 0, 0.6)',
  }),
};

function CustomDropdown({ options, value, onChange }) {
  return (
    <Select
      styles={customStyles}
      options={options}
      value={options.find(option => option.value === value)}
      onChange={selectedOption => onChange(selectedOption)}
    />
  );
}

export default CustomDropdown;
