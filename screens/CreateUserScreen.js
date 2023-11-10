import React, { useState } from "react";
import { firestore } from "../database/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { Button, ScrollView, TextInput, View, StyleSheet, Text } from "react-native";

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const saveNewUser = () => {
    console.log(state);
    if (state.name === "") {
      alert("Usuario sin nombre");
    } else {
      const ref = collection(firestore, "users");
      try {
        addDoc(ref, state);
        props.navigation.navigate("UsersList")
      } catch (err) {
        console.error(err);
      }
      alert("Usuario guardado");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text>Crear Usuario</Text>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          onChangeText={(value) => setState({ ...state, name: value })}
        />
      </View>
      <View style={styles.inputGroup}>
      <TextInput
          placeholder="Email"
          onChangeText={(value) => setState({ ...state, email: value })}
        />
      </View>
      <View style={styles.inputGroup}>
      <TextInput
          placeholder="Telefono"
          onChangeText={(value) => setState({ ...state, phone: value })}
        />
      </View>
      <View>
        <Button title="Guardar" onPress={() => saveNewUser()}/>
      </View>
    </ScrollView>
  );
};

export default CreateUserScreen;

CreateUserScreen.navigationOptions={
    title: "CreateUserScreen"   
};

const styles=StyleSheet.create({
    container:{
        flex: 1, 
        padding: 35
    },
    inputGroup:{
        flex: 1, 
        padding: 0,
        marginBottom: 15,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc'
    }
})
