import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ButtonImage = ({ action, imageSource }) => (
<TouchableOpacity onPress={action} style={styles.button}>
    <Image source={imageSource} style={styles.image} />
  </TouchableOpacity>
);

export default ButtonImage;

const styles = StyleSheet.create({
    button: {
      padding: 0, // Elimina el relleno para que no haya espacio adicional alrededor de la imagen
      marginBottom: 10,
      marginLeft: 100
    },
    image: {
      width: 30, // Ajusta el ancho de la imagen según tus necesidades
      height: 30, // Ajusta la altura de la imagen según tus necesidades
    },
  });
