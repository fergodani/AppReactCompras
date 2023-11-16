import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconButton = ({ action, icon }) => (
  <TouchableOpacity onPress={action} style={styles.button}>
    <Ionicons name={icon} size={25} />
  </TouchableOpacity>
);

export default IconButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center', // Centra el contenido verticalmente
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});