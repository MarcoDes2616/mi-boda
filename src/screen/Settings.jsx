import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, TextInput } from "react-native";
import { fetchAllRoles, createRole } from "../api/role_api"; // Import your API functions

const Settings = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState(""); // State for new role input
  const [isCreatingRole, setIsCreatingRole] = useState(false); // State to toggle the role creation form

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

  const renderRole = ({ item }) => (
    <View style={styles.roleCard}>
      <Text style={styles.roleId}>ID: {item.id}</Text>
      <Text style={styles.roleName}>{item.role_name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configuraciones</Text>
      
      <Text style={styles.subHeader}>Roles</Text>
      
      <FlatList
        data={roles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRole}
        contentContainerStyle={styles.list}
      />

      {/* Button to toggle role creation form */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 10,
  },
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

export default Settings;

