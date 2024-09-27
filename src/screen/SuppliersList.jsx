import React, { useEffect, useState } from "react";
import { Text, View, Button, FlatList, StyleSheet } from "react-native";
import Container from "../components/custon_components/Container";
import {deleteSupplier, updateSupplier, fetchAllSuppliers} from "../api/supplier_api"
import SupplierCard from "../components/general_components/SupplierCard";

const SuppliersList = () => {
  const [suppliers, SetSuppliers] = useState([])
  useEffect(() => {
    fetchSupplier()
  }, [])

  const fetchSupplier = async() => {
    try {
      const response = await fetchAllSuppliers();
      SetSuppliers(response);
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  }
  const handleEdit = async(id) => {
    try {
      await updateSupplier(newGuest);
      fetchSupplier();
    } catch (error) {
      Alert.alert("Error", "Hubo un error al agregar el invitado.");
    }
  };

  const handleDelete = async(id) => {
    try {
      await deleteSupplier(newGuest);
      fetchSupplier();
    } catch (error) {
      Alert.alert("Error", "Hubo un error al agregar el invitado.");
    }
  };

  return (
    <Container>
      <FlatList
        data={suppliers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SupplierCard
            supplier={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </Container>
  );
};

export default SuppliersList;

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
