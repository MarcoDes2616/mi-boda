import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Modal, Button, TextInput } from "react-native";
import {Picker} from "@react-native-picker/picker" //@react-native-picker/picker
import {fetchAllRoles} from "../../api/role_api"
import {fetchAllTitles} from "../../api/title_api"

const AddGuestModal = ({modalVisible, setModalVisible, newGuest, setNewGuest, handleCreateGuest}) => {
    const [roles, setRoles] = useState([]);
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        if (modalVisible) {
          fetchRoles()
          fetchTitles()
        }
      }, [modalVisible])

      const fetchRoles = async () => {
        try {
          const response = await fetchAllRoles();
          setRoles(response); // Assuming response is an array of roles
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      };
    
      const fetchTitles = async () => {
        try {
          const response = await fetchAllTitles();
          setTitles(response);
           // Assuming response is an array of roles
        } catch (error) {
          console.error("Error fetching titles:", error);
        }
      };
    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Agregar Nuevo Invitado</Text>
          <Picker
            selectedValue={newGuest.titleId}
            onValueChange={(itemValue) => setNewGuest({ ...newGuest, titleId: itemValue })}
            style={styles.picker}
          >
            <Picker.Item label="Titulo" value={null} />
            {titles.map(title => (
              <Picker.Item key={title.id} label={title.title} value={title.id} />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={newGuest.first_name}
            onChangeText={(text) => setNewGuest({ ...newGuest, first_name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={newGuest.last_name}
            onChangeText={(text) => setNewGuest({ ...newGuest, last_name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={newGuest.phone}
            onChangeText={(text) => setNewGuest({ ...newGuest, phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newGuest.email}
            onChangeText={(text) => setNewGuest({ ...newGuest, email: text })}
          />
          <Picker
            selectedValue={newGuest.roleId}
            onValueChange={(itemValue) => setNewGuest({ ...newGuest, roleId: itemValue })}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione un rol" value={null} />
            {roles.map(role => (
              <Picker.Item key={role.id} label={role.role_name} value={role.id} />
            ))}
          </Picker>

          <Button title="Agregar Invitado" onPress={handleCreateGuest} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
      },
      modalHeader: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        width: "100%",
      },
      picker: {
        height: 50,
        width: "100%",
        marginBottom: 15,
      },
})

export default AddGuestModal;