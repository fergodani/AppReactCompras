import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Button from "../components/Button";
import { useCarrito } from "../context/CarritoState";
import { addDoc, collection, getDoc, doc } from "@firebase/firestore";
import { auth, firestore } from "../services/firebase";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const OrderDetails = () => {
  const { state } = useCarrito();

  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleBuy = async () => {
    setIsLoading(true);
    try {
      const usersCollection = collection(firestore, "users");
      const productCollection = collection(firestore, "productos");
      const userRef = doc(usersCollection, auth.currentUser.uid);
      const productsWithQuantity = state.products.map((p) => ({
        product: doc(productCollection, p.id),
        quantity: p.quantity,
      }));

      const data = {
        products: productsWithQuantity,
        user: userRef,
        total: state.total,
        address,
        postalCode,
        province,
        country,
      };
      const ordersCollection = collection(firestore, "orders");
      try {
        addDoc(ordersCollection, data);
        setIsLoading(false);
        Toast.show({
          type: "success",
          text1: "Pedido creado",
          position: "bottom",
        });
        navigation.navigate("Catálogo");
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error.message);
      Toast.show({
        type: "error",
        text1: "Error al crear el pedido",
        position: "bottom",
      });
    }
  };

  return (
    <ScrollView>
      {state.products.map((productoEnCarro) => (
        <View key={productoEnCarro.id} style={styles.card}>
          <View>
            <Text style={{fontSize: 25, fontWeight: 'bold', padding: 10}}>{productoEnCarro.name} x {productoEnCarro.quantity} uds</Text>
            <Text style={{ fontSize: 20, marginLeft: 15}}>
              Total: {productoEnCarro.price * productoEnCarro.quantity} €
            </Text>
          </View>
        </View>
      ))}
      <View>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.container}>
            <Text style={styles.title}>Envío</Text>
            <TextInput
              style={styles.input}
              placeholder="Dirección"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Código Postal"
              value={postalCode}
              onChangeText={setPostalCode}
            />
            <TextInput
              style={styles.input}
              placeholder="Provincia"
              value={province}
              onChangeText={setProvince}
            />
            <TextInput
              style={styles.input}
              placeholder="País"
              value={country}
              onChangeText={setCountry}
            />
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Button texto="Aceptar" action={() => handleBuy()} />
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default OrderDetails;

OrderDetails.navigationOptions = {
  title: "Detalles Pedido",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 35,
    gap: 10,
    justifyContent: "center",
    marginTop: 10
  },
  input: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 15,
  },
});
