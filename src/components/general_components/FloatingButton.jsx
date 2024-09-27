import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import color from "../../constants/color"; // Ruta al archivo donde tienes tus colores

const FloatingButton = ({ onPress, count }) => {
  return (
    <View style={styles.container}>
      <View style={styles.count}>
        <Text style={styles.textCount}>Van</Text>
        <Text style={styles.textCount}>{count}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <FontAwesome name="plus" size={24} color={color.oliveGreen} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: color.oliveGreen,
    height: 110,
    flexDirection: "column",
    borderRadius: 30,
  },
  count: {
    height: 50,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textCount: {
    fontWeight: "bold",
    color: color.sageGreen,
  },
  button: {
    backgroundColor: color.sageGreen, // Usando el color vino como dominante
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FloatingButton;
