import { Button, StyleSheet, Text } from "react-native";
import { View } from "react-native";

const SupplierCard = ({ supplier, onEdit, onDelete }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{supplier.full_name}</Text>
        <Text style={styles.phone}>{supplier.phone}</Text>
        <Text style={styles.requirement}>
          Requirement: {supplier.requirement.requirement}
        </Text>
        <Text style={styles.price}>Precio: ${supplier.requirement.price}</Text>
        <View style={styles.buttons}>
          <Button
            title="Edit"
            color="#4CAF50"
            onPress={() => onEdit(supplier.id)}
          />
          <Button
            title="Delete"
            color="#F44336"
            onPress={() => onDelete(supplier.id)}
          />
        </View>
      </View>
    );
  };

  export default SupplierCard;

  const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    listContainer: {
      paddingBottom: 20,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
    },
    phone: {
      fontSize: 16,
      color: "#555",
      marginVertical: 5,
    },
    requirement: {
      fontSize: 16,
      color: "#555",
    },
    price: {
      fontSize: 16,
      color: "#555",
      marginBottom: 10,
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
  