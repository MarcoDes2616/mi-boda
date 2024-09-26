import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../../constants/color'; // Ruta al archivo donde tienes tus colores

const FloatingButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <FontAwesome name="plus" size={24} color={colors.oliveGreen} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
  button: {
    backgroundColor: colors.sageGreen, // Usando el color vino como dominante
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FloatingButton;
