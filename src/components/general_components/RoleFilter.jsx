import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Picker} from "@react-native-picker/picker"
import color from "../../constants/color"

const RoleFilter = ({ setRoleId }) => {
  const [selectedRole, setSelectedRole] = useState();

  const roles = [
    { id: "", role_name: "Todos" },
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
      <Text style={styles.label}>Filtrar por rol:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedRole}
          onValueChange={handleRoleChange}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item label="Seleccionar rol" value={null} />
          {roles.map(role => (
            <Picker.Item key={role.id} label={role.role_name} value={role.id} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: color.palePink,
    borderRadius: 12,
    marginBottom: 10,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center'
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
    textAlign: 'center'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    width: '100%',
  }
});

export default RoleFilter;
