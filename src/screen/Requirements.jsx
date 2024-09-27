import React, { useState, useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Container from "../components/custon_components/Container";
import { createRequirement, fetchAllRequirements } from "../api/requirement_api";

const Requirements = () => {
  const [requirements, setRequirements] = useState([]);
  const [isCreatingRequirement, setIsCreatingRequirement] = useState(false)
  const [requirement, setRequirement] = useState("")

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const response = await fetchAllRequirements();
      setRequirements(response);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleCreateRequirement = async () => {
    if (!requirement) return; // Ensure the role name is not empty
    try {
      await createRequirement({ requirement: requirement });
      setRequirement(""); // Clear input after creating
      fetchRequirements(); // Refresh the role list
      setIsCreatingRequirement(false); // Hide the creation form after submission
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const renderRequirements = ({ item }) => (
    <View style={styles.roleCard}>
      <Text style={styles.roleName}>{item.requirement}</Text>
    </View>
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
        title={isCreatingRequirement ? "Cancelar" : "Crear Nuevo requerimiento"}
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
    </Container>
  );
};

export default Requirements;

const styles = StyleSheet.create({
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 20,
    },
    subHeader: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10,
    },
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
    },
    roleId: {
      fontSize: 16,
      color: "#555",
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
  });