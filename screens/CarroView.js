import React, { useState, useEffect } from "react";
import { Button, ScrollView, View, StyleSheet, Text } from "react-native";
import { useCarrito } from "../context/CarritoState";

const CarroView = () => {
  const { state, addProduct, removeProduct, increase, decrease } = useCarrito();
  const [carrito, setCarrito] = useState({
    products: [],
    total: 0,
    numElements: 0,
  });

  useEffect(() => {
    console.log(state);
    setCarrito(state);
  }, []);

  useEffect(() => {
    console.log(state);
    setCarrito(state);
  }, [state]);

  return (
    <View>
      <ScrollView >
        <View >
          <Text style={styles.titulo}>Carro de la compra</Text>
        </View>

        {state.products.map((productoEnCarro) => (
          <View key={productoEnCarro.id} >
            <View >
              <Text>{productoEnCarro.name}</Text>
              <Text>Precio: {productoEnCarro.price} €</Text>
              <Text>Cantidad: {productoEnCarro.quantity} uds.</Text>
            </View>
            <View >
            <Button title="+" onPress={() => increase(productoEnCarro)} />
            <Button title="-" onPress={() => decrease(productoEnCarro)} />
              <Button title="Eliminar" onPress={() => removeProduct(productoEnCarro)} />
            </View>
          </View>
        ))}
      </ScrollView>
      <Text> Precio total: {state.total} €</Text>
      <Button title="Comprar" onPress={() =>{}} />
      <View></View>
    </View>
  );
};

export default CarroView;

CarroView.navigationOptions = {
  title: "CarroView",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
  productItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnaIzq: {
    flex: 1,
  },
  columnaDer: {
    marginLeft: 10,
    alignSelf: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
});
