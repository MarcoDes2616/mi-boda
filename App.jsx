import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import BottomMenu from "./src/components/general_components/BottomMenu";

export default function App() {
  return (
    <NavigationContainer>
      <BottomMenu />
      {/* <Text>"hola"</Text> */}
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
