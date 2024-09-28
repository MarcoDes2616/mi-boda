import React, { useState, useEffect, useContext } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal } from "react-native";
import Container from "../components/custon_components/Container";
import { createRequirement, deleteRequirement } from "../api/requirement_api";
import { FontAwesome } from "@expo/vector-icons";
import color from "../constants/color";
import { AppContext } from "../context/AppContext";

const Requirements = () => {

  const {
    handleSaveProvider,
    requirements,
    fetchRequirements,
    setSelectedRequirement,
    selectedRequirement,
    providerData, 
    setProviderData,
    modalVisible,
    setModalVisible
  } = useContext(AppContext)
 
  const [isCreatingRequirement, setIsCreatingRequirement] = useState(false);
  const [requirement, setRequirement] = useState("")
  

  useEffect(() => {
    fetchRequirements();
  }, []);


  const handleCreateRequirement = async () => {
    if (!requirement) return;
    try {
      await createRequirement({ requirement });
      setRequirement("");
      fetchRequirements();
      setIsCreatingRequirement(false);
    } catch (error) {
      console.error("Error creating requirement:", error);
    }
  };

  const handleDeleteRequirement = async (id) => {
    try {
      await deleteRequirement(id);
      fetchRequirements();
    } catch (error) {
      console.error("Error deleting requirement:", error);
    }
  };

  const handleAssignProvider = (requirement) => {
    setSelectedRequirement(requirement);
    setModalVisible(true);
  };

  

  const renderRequirements = ({ item }) => (
    <TouchableOpacity onPress={() => handleAssignProvider(item)}>
      <View style={styles.roleCard}>
        <Text style={styles.roleName}>{item.requirement}</Text>
        <View style={styles.trash}>
          <TouchableOpacity onPress={() => handleDeleteRequirement(item.id)}>
            <FontAwesome name="trash" size={24} color={color.wine} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Container>
      <FlatList
        data={requirements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRequirements}
        contentContainerStyle={styles.list}
      />
      <Button
        title={isCreatingRequirement ? "Cancelar" : "Crear Nuevo Requerimiento"}
        onPress={() => setIsCreatingRequirement(!isCreatingRequirement)}
      />
      {isCreatingRequirement && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del requerimiento"
            value={requirement}
            onChangeText={setRequirement}
          />
          <Button title="Crear Requerimiento" onPress={handleCreateRequirement} />
        </View>
      )}

      {selectedRequirement && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Asignar Proveedor para: {selectedRequirement.requirement}</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre Completo"
                value={providerData.full_name}
                onChangeText={(text) => setProviderData({ ...providerData, full_name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={providerData.phone}
                onChangeText={(text) => setProviderData({ ...providerData, phone: text })}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Precio"
                value={providerData.price}
                onChangeText={(text) => setProviderData({ ...providerData, price: text })}
                keyboardType="numeric"
              />
              <Button title="Guardar Proveedor" onPress={handleSaveProvider} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color={color.wine} />
            </View>
          </View>
        </Modal>
      )}
    </Container>
  );
};

export default Requirements;

const styles = StyleSheet.create({
  list: {
    width: "100%",
    paddingBottom: 20,
  },
  roleCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roleName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    width: "70%",
  },
  trash: {
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
