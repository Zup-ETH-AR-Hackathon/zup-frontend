import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SecondPage.css';
import PoolTermSelector from './PoolTermSelector';
import DepositAmountInput from './DepositAmountInput';
import { Web3Button } from '@thirdweb-dev/react';

const contractAddress = '0xdA0C1c282137d1D4b01ce31536d56959eB9da41c';

const TEN_MINUTES_IN_MS = 60 * 1000 * 10;

const SecondPage = () => {
  const location = useLocation();
  const { token1, token2, data } = location.state;
  const [poolTerm, setPoolTerm] = useState('24h');
  const [depositAmount1, setDepositAmount1] = useState('');
  const [depositAmount2, setDepositAmount2] = useState('');
  const [poolSelectedId, setPoolSelectedId] = useState();
  const [poolSelectedFeeTier, setPoolSelectedFeeTier] = useState();

  const handlePoolTermChange = ({ id, initialFeeTier }) => {
    console.log('pool selected', id, initialFeeTier);
    setPoolSelectedId(id);
    setPoolSelectedFeeTier(initialFeeTier);
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
    const callee = poolSelectedId;
    const params = {
      token0: token1.id,
      token1: token2.id,
      fee: parseInt(poolSelectedFeeTier),
      token0Amount: 100000,
      token1Amount: 100000,
      token0Min: 0,
      token1Min: 0,
      deadline: new Date().getTime() + TEN_MINUTES_IN_MS,
    };
    const ret = await contract.call('depositUniswap', [callee, params]);
    console.log('handleAction', ret);
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
            contractAddress={contractAddress}
            action={handleAction}
            className="add-liquidity-button">
            Zup in
          </Web3Button>

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
