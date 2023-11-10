import React, { useState } from "react";
import { firestore } from "../services/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { Button, ScrollView, TextInput, View, StyleSheet, Text } from "react-native";

const UsersList = (props) => {
 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text>Lista de Usuarios</Text>
      </View>
    </ScrollView>
  );
};

export default UsersList;

UsersList.navigationOptions={
    title: "UsersList"   
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
