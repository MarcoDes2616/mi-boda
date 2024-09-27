import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import RoleFilter from "./RoleFilter";
import color from "../../constants/color";
import { FontAwesome } from '@expo/vector-icons';

const ControlPanel = ({setRoleId}) => {
  const [showRoleFilter, setShowRoleFilter] = useState(false);

  return (
    <View>
      <View style={styles.controlBar}>
        <TouchableOpacity onPress={() => setShowRoleFilter(!showRoleFilter)}>
          <FontAwesome name="filter" size={24} color={color.wine} />
        </TouchableOpacity>
      </View>
      {showRoleFilter && <RoleFilter setRoleId={setRoleId} />}
    </View>
  );
};

export default ControlPanel;

const styles = StyleSheet.create({
    controlBar: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      backgroundColor: color.ivory,
    }, 
})