import React, { useState, useEffect } from "react";
import { firestore } from "../services/firebase";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import {
  Button,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCarrito } from "../context/CarritoState";
import CarroView from "./CarroView";

const ProductsDetail = () => {
  const [quantity, setQuantity] = useState(null);
  const navigation = useRoute();
  const { name, price, description } = navigation.params || {};
  const { addProduct } = useCarrito();
  const navigation2 = useNavigation();


  return (
    <View style={[styles.container, styles.productItem]}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>Precio artículo: {price} €</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.description}>
        Seleccione cantidad:
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        placeholder="0"
        labelField="label"
        valueField="value"
        value={quantity}
        onChange={item => {
          setQuantity(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={15} />
        )}
      />
      
      <Text style={[styles.description, {marginBottom: 15}]}>Precio total: {price * quantity} €</Text>

      <View>
        <Button 
          title="Añadir a carrito"
          onPress={() => {addProduct({ name, price, description, quantity: parseInt(quantity) }),
          navigation2.navigate("Carrito")}}
        />
      </View>
    </View>
  );
};

ProductsDetail.navigationOptions = {
  title: "ProductsDetail",
};

const data = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 10
  },
  productItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 80,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 26,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 26,
  },
  placeholderStyle: {
    fontSize: 27,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});

export default ProductsDetail;
