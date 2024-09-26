import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from 'react-native-vector-icons'; // Asegúrate de tener esta librería instalada
import GuestList from "../../screen/GuestList";
import SuppliersList from "../../screen/SuppliersList";
import Settings from "../../screen/Settings";

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Invitados') {
            iconName = focused ? 'people' : 'people-outline';
          } 
          if (route.name === 'Proveedores') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          }
          if (route.name === 'Configuraciones') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: "#007bff" },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ddd",
        tabBarShowLabel: false, // Oculta los nombres
      })}
    >
      <Tab.Screen name="Invitados" component={GuestList} />
      <Tab.Screen name="Proveedores" component={SuppliersList} />
      <Tab.Screen name="Configuraciones" component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomMenu;

