import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconButton=({action, icon}) => (
  

   <TouchableOpacity
   underlayColor='#efefef'
   onPress={action}
   style={[styles.button]}>
        <Ionicons name={icon} color='white' size={25}/>
   </TouchableOpacity>
 
  
)
//La view que se le mete a todo es para que se desacople de la tabla justo superior
export default IconButton;

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#333',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 5,
      marginBottom: 10,
      width: 'auto'

    }
  })