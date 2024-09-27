import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from 'react-native-vector-icons';
import GuestList from "../../screen/GuestList";
import SuppliersList from "../../screen/SuppliersList";
import Settings from "../../screen/Settings";
import BudgetManagement from "../../screen/BudgetManagement";
import color from "../../constants/color";

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mis Invitados') {
            iconName = focused ? 'people' : 'people-outline';
          } 
          if (route.name === 'Proveedores') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          }
          if (route.name === 'Configuraciones') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          if (route.name === 'Presupuesto') {
            iconName = focused ? 'wallet' : 'wallet-outline'; // Icon for Budget tab
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: color.wine },
        tabBarActiveTintColor: color.sageGreen,
        tabBarInactiveTintColor: color.ivory,
        tabBarShowLabel: false, // Hide labels
      })}
    >
      <Tab.Screen name="Mis Invitados" component={GuestList} />
      <Tab.Screen name="Proveedores" component={SuppliersList} />
      <Tab.Screen name="Presupuesto" component={BudgetManagement} />
      <Tab.Screen name="Configuraciones" component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomMenu;

