import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SecondPage.css';
import PoolTermSelector from './PoolTermSelector';
import DepositAmountInput from './DepositAmountInput';
import { Web3Button } from '@thirdweb-dev/react';
import { BigNumber, ethers } from 'ethers';
import { poolConfigData, poolContractCall } from './utils/pools.constants';
import { parseUnits } from 'ethers/lib/utils';

const CONTRACT_ADDRESS = '0x05e91D9eD5c49aF7541635809e1f70CB0B768336';

const TEN_MINUTES_IN_MS = 60 * 1000 * 10;

const SecondPage = () => {
  const location = useLocation();
  const { token1, token2, data } = location.state;
  const [poolTerm, setPoolTerm] = useState('24h');
  const [depositAmount1, setDepositAmount1] = useState('');
  const [depositAmount2, setDepositAmount2] = useState('');
  const [selectedPool, setSelectedPool] = useState();
  const [txHash, setTxHash] = useState('');

  useEffect(() => {
    setDepositAmount2(depositAmount1);
  }, [depositAmount1]);

  useEffect(() => {
    setDepositAmount1(depositAmount2);
  }, [depositAmount2]);

  const calculateTokenAmount = async amount => {
    if (!selectedPool) {
      return;
    }

    const provider = new ethers.providers.JsonRpcProvider(
      'https://rpc.scroll.io'
    );

    const contractABI = poolConfigData[selectedPool.name].abi;

    const POOL_CONTRACT_ADDRESS = selectedPool.id;
    const contract = new ethers.Contract(
      POOL_CONTRACT_ADDRESS,
      contractABI,
      provider
    );

    const sqrtPrice = await poolContractCall(selectedPool.name, contract);

    console.log('sqrtPrice:', sqrtPrice);
    const sqrtPriceX96 = sqrtPrice[0];

    debugger;
    const num2pow96 = BigNumber.from(2).pow(96);
    const x = BigNumber.from(sqrtPriceX96).div(num2pow96).pow(2);

    const y = BigNumber.from(1).div(x);

    const token_1_Decimals = await getTokenDecimals(token2.id, provider);
    const token_0_Decimals = await getTokenDecimals(token1.id, provider);

    const token_1_decimals_pow = new BigNumber(10).pow(token_1_Decimals);
    const token_0_decimals_pow = new BigNumber(10).pow(token_0_Decimals);
    const priceRatio = new BigNumber(y).multipliedBy(
      new BigNumber(token_1_decimals_pow).dividedBy(
        new BigNumber(token_0_decimals_pow)
      )
    );
    console.log('View function result:', priceRatio.toString());
    console.log('View function result:', priceRatio);
  };

  const getTokenDecimals = async (tokenAddress, provider) => {
    const contract = new ethers.Contract(
      tokenAddress,
      ['function decimals() public view returns (uint8)'],
      provider
    );

    const decimals = await contract.decimals();
    console.log('decimals', decimals);
    return decimals;
  };

  const handlePoolTermChange = pool => {
    console.log('pool selected', pool);
    setSelectedPool(pool);
  };

  const handleDepositAmount1Change = e => setDepositAmount1(e.target.value);
  const handleDepositAmount2Change = e => setDepositAmount2(e.target.value);

  const getPoolObject = pool => ({
    id: pool.poolId,
    initialFeeTier: pool.initialFeeTier,
    yield: 'Yield',
    percent: `${parseFloat(pool.apr).toFixed(2)}%`,
    name: `${pool.name}`,
    img: './resources/lookup.svg',
  });

  const pools = [getPoolObject(data.nuri_24hs), getPoolObject(data.izumi_24hs)];

  const handleAction = async contract => {
    const callee = poolConfigData[selectedPool.name].poolManager;
    const params = {
      token0: token1.id,
      token1: token2.id,
      fee: parseInt(selectedPool.initialFeeTier),
      token0Amount: parseUnits(depositAmount1, 6),
      token1Amount: parseUnits(depositAmount1, 6),
      token0Min: 0,
      token1Min: 0,
      deadline: new Date().getTime() + TEN_MINUTES_IN_MS,
    };
    const ret = await contract.call(
      poolConfigData[selectedPool.name].depositMethod,
      [callee, params]
    );
    console.log(ret.receipt.transactionHash);
    setTxHash(ret.receipt.transactionHash);
  };

  // const handleActionTest = async contract => {
  //   await contract.call('store', [111]);
  //   const ret = await contract.call('retrieve');
  //   alert(ret.toNumber());
  // };

  return (
    <div className="second-page">
      <div>
        <h2 className="title">ZUP IN</h2>
        <div className="form-container">
          <PoolTermSelector
            poolTerm={poolTerm}
            onTermChange={handlePoolTermChange}
            terms={pools}
          />
          <div className="deposit-amounts">
            <h3 className="sub-title">Deposit Amount</h3>
            <DepositAmountInput
              depositAmount={depositAmount1}
              onDepositAmountChange={handleDepositAmount1Change}
              selectedToken={token1.label}
            />
            <DepositAmountInput
              depositAmount={depositAmount2}
              onDepositAmountChange={handleDepositAmount2Change}
              selectedToken={token2.label}
            />
          </div>
          <Web3Button
            contractAddress={CONTRACT_ADDRESS}
            action={handleAction}
            className="add-liquidity-button">
            Zup in
          </Web3Button>
          {!txHash ? <></> : <p>Tx Hash: {txHash}</p>}
          {/* <Web3Button
            contractAddress="0xD3E0444fFcF316Db49D1526dd76E00b0F70676dB"
            action={handleActionTest}
            className="add-liquidity-button">
            TEST
          </Web3Button> */}
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
