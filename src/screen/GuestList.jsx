import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  Button,
} from "react-native";
import {
  fetchAllGuests,
  sendInvitation,
  createGuest,
  deleteGuest,
} from "../api/guest_api.js";
import { FontAwesome } from "@expo/vector-icons";
import AddGuestModal from "../components/modals/AddGuestModal.jsx";
import color from "../constants/color";
import FloatingButton from "../components/general_components/FloatingButton.jsx";
import Container from "../components/custon_components/Container.jsx";
import ControlPanel from "../components/general_components/ControlPanel.jsx";
import GuestCard from "../components/general_components/GuestCard.jsx";

const GuestList = () => {
  const initialValues = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    roleId: null,
    titleId: null
  };
  const [guests, setGuests] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newGuest, setNewGuest] = useState(initialValues);
  const [roleId, setRoleId] = useState("")


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData(roleId)
  }, [roleId])

  const fetchData = async (roleId) => {
    try {
      const response = await fetchAllGuests(roleId);
      setGuests(response);
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };

  const handleSendInvitation = async (id) => {
    try {
      await sendInvitation(id);
      Alert.alert(
        "Invitación enviada",
        `Se ha enviado la invitación al invitado con ID: ${id}`
      );
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

  const handleDeleteGuest = async (id) => {
    try {
      await deleteGuest(id);
      fetchData();
    } catch (error) {
      Alert.alert("Error", "Hubo un error al agregar el invitado.");
    }
  };

  const propsToModal = {
    modalVisible,
    setModalVisible,
    newGuest,
    setNewGuest,
    handleCreateGuest,
  };
  return (
    <Container>
      <ControlPanel setRoleId={setRoleId} />
      <FloatingButton count={guests.length} onPress={() => setModalVisible(true)} />
      <FlatList
        data={guests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GuestCard
            item={item}
            handleWhatsApp={handleWhatsApp}
            handleSendInvitation={handleSendInvitation}
            handleDeleteGuest={handleDeleteGuest}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <AddGuestModal {...propsToModal} />
    </Container>
  );
};

export default GuestList;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  list: {
    paddingBottom: 110,
  },
  barCode: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "center"
  },
  trash:  {
    flexDirection: "row",
    backgroundColor: color.oliveGreen,
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderBottomRightRadius: 8
  },
  card: {
    borderRadius: 8,
    backgroundColor: color.palePink,
    marginVertical: 10,
    borderColor: "#DDD",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: color.wine, // Color vino
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  roleSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.ivory, // Verde salvia
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  role: {
    fontSize: 14,
    color: "#121212",
    marginLeft: 6,
  },
  contactSection: {
    flexDirection: "column",
    padding: 16,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  detail: {
    marginLeft: 5,
    marginTop: 3,
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: color.ivory,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    width: "25%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});
