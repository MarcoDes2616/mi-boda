import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import Container from "../components/custon_components/Container";
import requirement from "../../assets/requirement.jpg"
import roles from "../../assets/roles.png"
import color from "../constants/color";

const options = [
  { id: '1', title: 'Roles', navigateTo: 'Roles', img: roles },
  { id: '2', title: 'Requerimientos', navigateTo: 'Requerimientos', img: requirement },
];

const Settings = ({ navigation }) => {
  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.navigateTo)}>
      <ImageBackground
        source={item.img} // Reemplaza con la URL de tu imagen
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <Text style={styles.title}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <Container>
      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  imageBackground: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: color.wine, // Cambia según el color que prefieras
    fontSize: 20,
    fontWeight: 'bold',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 10,
    borderRadius: 5
  },
  image: {
    borderRadius: 10,
  },
});


// useEffect(() => {
  //   fetchRoles();
  // }, []);

  // const fetchRoles = async () => {
  //   try {
  //     const response = await fetchAllRoles();
  //     setRoles(response);
  //   } catch (error) {
  //     console.error("Error fetching roles:", error);
  //   }
  // };

//const handleCreateRole = async () => {
  //   if (!roleName) return; // Ensure the role name is not empty
  //   try {
  //     await createRole({ role_name: roleName });
  //     setRoleName(""); // Clear input after creating
  //     fetchRoles(); // Refresh the role list
  //     setIsCreatingRole(false); // Hide the creation form after submission
  //   } catch (error) {
  //     console.error("Error creating role:", error);
  //   }
  // };

  // const renderRole = ({ item }) => (
  //   <View style={styles.roleCard}>
  //     <Text style={styles.roleId}>ID: {item.id}</Text>
  //     <Text style={styles.roleName}>{item.role_name}</Text>
  //   </View>
  // );

  {/* <Text style={styles.header}>Configuraciones</Text>
      <Text style={styles.subHeader}>Roles</Text> */}
      
      {/* <FlatList
        data={roles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRole}
        contentContainerStyle={styles.list}
      /> */}

      {/* Button to toggle role creation form */}
      {/* <Button
        title={isCreatingRole ? "Cancelar" : "Crear Nuevo Rol"}
        onPress={() => setIsCreatingRole(!isCreatingRole)}
      /> */}

      {/* {isCreatingRole && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del rol"
            value={roleName}
            onChangeText={setRoleName}
          />
          <Button title="Crear Rol" onPress={handleCreateRole} />
        </View>
      )} */}

