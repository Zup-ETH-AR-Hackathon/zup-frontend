import nuriAbi from './nuri-pool.abi.json';
import iZUMIAbi from './iZUMI-pool.abi.json';

export const poolConfigData = {
  'Nuri Exchange': {
    poolManager: '',
    abi: nuriAbi,
    depositMethod: 'depositUniswap',
  },
  'iZUMI Finance': {
    poolManager: '',
    abi: iZUMIAbi,
    depositMethod: 'depositIzumi',
  },
};

export const poolContractCall = (name, contract) => {
  switch (name) {
    case 'Nuri Exchange':
      return contract.slot0();
    case 'iZUMI Finance':
      return contract.state();
    default:
      throw new Error('Pool not found');
  }
};
