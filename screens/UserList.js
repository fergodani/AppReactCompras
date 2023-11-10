import React, { useState } from "react";
import { firestore } from "../database/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { Button, ScrollView, TextInput, View, StyleSheet, Text } from "react-native";

const UserList = (props) => {
 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text>Lista de Usuarios</Text>
      </View>
    </ScrollView>
  );
};

export default UserList;

UserList.navigationOptions={
    title: "UserList"   
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
