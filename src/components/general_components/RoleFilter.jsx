import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const RoleFilter = ({ setRoleId }) => {
  const [selectedRole, setSelectedRole] = useState();

  const roles = [
    {id: "", role_name: "Todos"},
    { id: 1, role_name: "Dama de honor" },
    { id: 2, role_name: "Padrino (a) de ceremonia" },
    { id: 3, role_name: "Padrino civil" },
    { id: 4, role_name: "Madrina Civil" },
    { id: 5, role_name: "Madrina ceremonia" },
    { id: 6, role_name: "Padrino ceremonia" },
    { id: 7, role_name: "Invitado (a)" }
  ];

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
    setRoleId(roleId); // Actualiza la prop roleId
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Seleccione un rol:</Text>
      <Picker
        selectedValue={selectedRole}
        onValueChange={handleRoleChange}
        style={styles.picker}
      >
        <Picker.Item label="Seleccionar rol" value={null} />
        {roles.map(role => (
          <Picker.Item key={role.id} label={role.role_name} value={role.id} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold'
  },
  picker: {
    height: 50,
    backgroundColor: '#fff'
  }
});

export default RoleFilter;
