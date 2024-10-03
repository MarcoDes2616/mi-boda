import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import Container from "../components/custon_components/Container";
import SupplierCard from "../components/general_components/SupplierCard";
import { AppContext } from "../context/AppContext";
import { createNote } from "../api/note_api";

const SuppliersList = () => {
  const {suppliers,
    fetchSupplier,
    handleEdit,
    handleDelete} = useContext(AppContext)
  
    const [comment, setComment] = useState("")
    
  useEffect(() => {
    fetchSupplier()
  }, [])

  const handleAddComment = async (supplierId) => {
    if (comment.trim()) {
      await createNote({supplierId, comment});
      fetchSupplier();
      setComment("")
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
            handleAddComment={handleAddComment}
            setComment={setComment}
            comment={comment}
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
