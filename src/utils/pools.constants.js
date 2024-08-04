import nuriAbi from './nuri-pool.abi.json';
import iZUMIAbi from './iZUMI-pool.abi.json';

export const poolConfigData = {
  'Nuri Exchange': {
    poolManager: '0xAAA78E8C4241990B4ce159E105dA08129345946A',
    abi: nuriAbi,
    depositMethod: 'depositUniswap',
  },
  'iZUMI Finance': {
    poolManager: '0x1502d025BfA624469892289D45C0352997251728',
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
