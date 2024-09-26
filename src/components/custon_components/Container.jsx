import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-web';
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