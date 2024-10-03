import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import color from "../../constants/color";

const GuestCard = ({item, handleWhatsApp, handleSendInvitation, handleDeleteGuest}) => {
    return (
        <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {item.title?.title} {item.first_name} {item.last_name}
          </Text>
          <View style={styles.roleSection}>
            <FontAwesome name="id-badge" size={16} color="#121212" />
            <Text style={styles.role}>{item.role?.role_name || "Sin rol"}</Text>
          </View>
        </View>
        {/* Sección de Contacto */}
        <View style={styles.contactSection}>
          <View style={styles.row}>
            <View style={styles.contactInfo}>
              <FontAwesome name="phone" size={20} color={color.oliveGreen} />
              <Text style={styles.detail}>
                {"  "}
                {item.phone}
              </Text>
            </View>
            <View style={styles.column}>
              <TouchableOpacity onPress={() => handleWhatsApp(item.phone)}>
                <FontAwesome name="whatsapp" size={24} color="green" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.contactInfo}>
              <FontAwesome name="envelope" size={20} color={color.oliveGreen} />
              {item.invitation_sent_at ? (
                <Text style={styles.detail}>
                  {"  "}Invitado el:{" "}
                  {new Date(item.invitation_sent_at).toLocaleDateString()}
                </Text>
              ) : (
                <Text style={styles.detail}>{"  "}Invitación sin enviar</Text>
              )}
            </View>
            <View style={styles.column}>
              <TouchableOpacity onPress={() => handleSendInvitation(item.id)}>
                <FontAwesome name="send" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <View style={styles.barCode}>
            <FontAwesome name="barcode" size={40} color={color.wine} />
            <FontAwesome name="barcode" size={40} color={color.wine} />
          </View>
          <View style={styles.trash}>
            <TouchableOpacity onPress={() => handleDeleteGuest(item.id)}>
              <FontAwesome name="trash" size={24} color={color.sageGreen} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
};

export default GuestCard;

const styles = StyleSheet.create({
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
    header: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 20,
    },
    list: {
      paddingBottom: 20,
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    detail: {
      marginLeft: 5,
      marginTop: 3,
      color: "#333",
      fontSize: 16,
      fontWeight: "bold",
    },
    column: {
      flexDirection: "column",
      alignItems: "center",
      width: "25%",
    },
    contactInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 4,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    roleSection: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: color.ivory, // Verde salvia
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    contactSection: {
      flexDirection: "column",
      padding: 16,
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
    role: {
      fontSize: 14,
      color: "#121212",
      marginLeft: 6,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
      color: color.ivory,
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