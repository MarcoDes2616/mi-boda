import React from "react";
import { Text, View, StyleSheet } from "react-native";
const SuppliersList = () => {
  return (
    <View style={styles.container}>
      <Text>Pantalla de Proveedores</Text>
    </View>
  );
};

export default SuppliersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
