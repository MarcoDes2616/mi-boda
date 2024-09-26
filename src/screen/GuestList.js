import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Linking, Alert, Modal, Button, TextInput } from "react-native";
import {Picker} from "@react-native-picker/picker" //@react-native-picker/picker
import { fetchAllGuests, sendInvitation, createGuest } from "../api/guest_api";
import {fetchAllRoles} from "../api/role_api"
import {fetchAllTitles} from "../api/title_api"
import { FontAwesome } from '@expo/vector-icons';

const GuestList = () => {
  const initialValues = { first_name: '', last_name: '', phone: '', email: '', roleId: null }
  const [guests, setGuests] = useState([]);
  const [roles, setRoles] = useState([]);
  const [titles, setTitles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGuest, setNewGuest] = useState(initialValues);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (modalVisible) {
      fetchRoles()
      fetchTitles()
    }
  }, [modalVisible])

  const fetchData = async () => {
    try {
      const response = await fetchAllGuests();
      setGuests(response);
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };

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

  const handleSendInvitation = async (id) => {
    try {
      await sendInvitation(id);
      Alert.alert("Invitación enviada", `Se ha enviado la invitación al invitado con ID: ${id}`);
      fetchData(); // Refresh the guest list
    } catch (error) {
      Alert.alert("Error", "Hubo un error al enviar la invitación.");
    }
  };

  const handleWhatsApp = (phone) => {
    const message = `Hola, te invitamos a nuestro evento de boda.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "No se pudo abrir WhatsApp.");
    });
  };

  const handleCreateGuest = async () => {
    try {
      await createGuest(newGuest); // Assume this function handles guest creation
      setModalVisible(false); // Close the modal
      setNewGuest(initialValues); // Reset form
      fetchData(); // Refresh the guest list
    } catch (error) {
      Alert.alert("Error", "Hubo un error al agregar el invitado.");
    }
  };

  const renderGuest = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.title?.title} {item.first_name} {item.last_name}</Text>
      <Text style={styles.detail}>Teléfono: {item.phone}</Text>
      <Text style={styles.detail}>Email: {item.email}</Text>
      
      <View style={styles.row}>
        <FontAwesome name="star" size={16} color="#555" />
        <Text style={styles.detail}> Rol: {item.role?.role_name}</Text>
      </View>

      <View style={styles.row}>
        <FontAwesome name="envelope" size={16} color="#555" />
        {item.invitation_sent_at ? (
          <Text style={styles.detail}> Invitación enviada el: {new Date(item.invitation_sent_at).toLocaleString()}</Text>
        ) : (
          <Text style={styles.detail}> Invitación no enviada</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {/* Botón de WhatsApp */}
        <TouchableOpacity style={styles.button} onPress={() => handleWhatsApp(item.phone)}>
          <FontAwesome name="whatsapp" size={24} color="green" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </TouchableOpacity>

        {/* Botón de Enviar Invitación */}
        <TouchableOpacity style={styles.button} onPress={() => handleSendInvitation(item.id)}>
          <FontAwesome name="send" size={24} color="blue" />
          <Text style={styles.buttonText}>Enviar Invitación</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Invitados</Text>
      <Button title="Agregar Invitado" onPress={() => setModalVisible(true)} />

      <FlatList
        data={guests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGuest}
        contentContainerStyle={styles.list}
      />

      {/* Modal for adding a new guest */}
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
          
          {/* Role Picker */}
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
    </View>
  );
};

export default GuestList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    marginBottom: 10,
    color: "#555",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
  },
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
});

