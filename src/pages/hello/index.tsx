import React from 'react';
import styles from './style.module.scss';

const HelloPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello World!</h1>
    </div>
  );
};

export default HelloPage;
