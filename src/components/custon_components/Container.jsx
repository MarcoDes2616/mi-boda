import React from 'react';
import { StyleSheet, View } from 'react-native';
import color from '../../constants/color';

const Container = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

export default Container;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.ivory,
      padding: 10,
    },
  });