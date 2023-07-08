// Global loader for whole application //

import React from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';

interface LoaderProps { }

const Loader: React.FC<LoaderProps> = () => {
  const { isLoading } = useSelector((state: any) => state.app);

  return (
    <Spinner
      visible={isLoading}
      textContent={'Loading...'}
      textStyle={styles.textStyle}
    />
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 15,
  },
});

export default Loader;
