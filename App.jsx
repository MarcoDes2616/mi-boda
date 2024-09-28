import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomMenu from "./src/components/general_components/BottomMenu";
import Requirements from "./src/screen/Requirements";
import Roles from "./src/screen/Roles";
import { AppProvider } from "./src/context/AppContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={BottomMenu}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Roles" component={Roles} />
          <Stack.Screen name="Requerimientos" component={Requirements} />
        </Stack.Navigator>
        <StatusBar style="dark" />
      </AppProvider>
    </NavigationContainer>
  );
}
