import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RematchDispatcher } from '@rematch/core';
import IndexModel from 'src/models/indexPage';

import drink from 'assets/drink.webp';

import styles from './index.less';

type Prop = {
  index: typeof IndexModel['state'] & { asdasd: string };
  dispatch: RematchDispatcher<{ type: string; payload: any }>;
};

function IndexPage({ index, dispatch }: Prop) {
  useEffect(() => {
    dispatch({ type: 'index/fetch', payload: 'asd' });
  }, []);

  const clickHandle = () => {
    dispatch({ type: 'index/fetch', payload: index?.num + 1 });
  };

  return (
    <div className={styles.indexpage}>
      <img src={drink} alt="sss" onClick={clickHandle} />
      <h1>{index.welcome}</h1>
      <Link to="/img">我猜是404.</Link>
      <br />
      <Link to="/test">test</Link>
    </div>
  );
}

const mapStateToProps = ({ index, global }) => ({
  index,
  global,
});

export default connect(mapStateToProps)(IndexPage);
