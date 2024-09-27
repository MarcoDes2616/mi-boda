import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import Container from "../components/custon_components/Container";
import { createRole, fetchAllRoles, deleteRole } from "../api/role_api";
import { FontAwesome } from "@expo/vector-icons";
import color from "../constants/color";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [isCreatingRole, setIsCreatingRole] = useState();
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetchAllRoles();
      setRoles(response);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleCreateRole = async () => {
    if (!roleName) return; // Ensure the role name is not empty
    try {
      await createRole({ role_name: roleName });
      setRoleName(""); // Clear input after creating
      fetchRoles(); // Refresh the role list
      setIsCreatingRole(false); // Hide the creation form after submission
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await deleteRole(id); // Llama al método para eliminar
      fetchRoles(); // Actualiza la lista de roles después de eliminar
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const renderRole = ({ item }) => (
    <View style={styles.roleCard}>
      <Text style={styles.roleName}>{item.role_name}</Text>
      <View style={styles.trash}>
        <TouchableOpacity onPress={() => handleDeleteRole(item.id)}>
          <FontAwesome name="trash" size={24} color={color.wine} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Container>
      <FlatList
        data={roles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRole}
        contentContainerStyle={styles.list}
      />
      <Button
        title={isCreatingRole ? "Cancelar" : "Crear Nuevo Rol"}
        onPress={() => setIsCreatingRole(!isCreatingRole)}
      />
      {isCreatingRole && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del rol"
            value={roleName}
            onChangeText={setRoleName}
          />
          <Button title="Crear Rol" onPress={handleCreateRole} />
        </View>
      )}
    </Container>
  );
};

export default Roles;

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roleName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
