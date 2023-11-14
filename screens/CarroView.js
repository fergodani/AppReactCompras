import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import IconButton from "../components/IconButton";
import Button from "../components/Button";
import { useCarrito } from "../context/CarritoState";
import { useNavigation } from "@react-navigation/native";

const CarroView = () => {
  const { state, removeProduct, increase, decrease } = useCarrito();
  const [carrito, setCarrito] = useState({
    products: [],
    total: 0,
    numElements: 0,
  });
  const navigation = useNavigation();
  useEffect(() => {
    setCarrito(state);
  }, []);

  useEffect(() => {
    setCarrito(state);
  }, [state]);



  return (
    <View>
      <ScrollView>
        {state.products.map((productoEnCarro) => (
          <View key={productoEnCarro.id} style={styles.card}>
            <View>
              <Text style={styles.titulo}>{productoEnCarro.name}</Text>
              <View style={styles.flexRow}>
                <Text style={{ fontSize: 25, padding: 10, marginRight: 60 }}>
                  Precio: {productoEnCarro.price} €
                </Text>
                <View style={styles.flexRow}>
                  <IconButton
                    icon="ios-remove-circle" // Ajusta el nombre del icono y otros estilos según tus necesidades
                    action={() => decrease(productoEnCarro)}
                  />

                  <Text style={{ fontSize: 25, padding: 10 }}>
                    {productoEnCarro.quantity}
                  </Text>
                  <IconButton
                    icon="ios-add-circle" // Ajusta el nombre del icono y otros estilos según tus necesidades
                    action={() => increase(productoEnCarro)}
                  />
                </View>
              </View>
            </View>
            <View>
              <IconButton
                icon="ios-trash" // Ajusta el nombre del icono y otros estilos según tus necesidades
                action={() => removeProduct(productoEnCarro)}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {state.numElements != 0 ? (
        <>
          <Text style={{ fontSize: 25, padding: 10 }}>
            {" "}
            Precio total: {state.total} €
          </Text>

          <Button
            texto="Tramitar Pedido"
            action={() => {
              navigation.navigate("Detalles Pedido");
            }}
          />
        </>
      ) : (
        <Text style={{ textAlign: "center", margin: 50 }}>
          No hay ningún producto
        </Text>
      )}
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
    textAlign: "left",
    color: "#333",
    marginBottom: 10,
  },

  card: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 15,
  },
  flexRow: {
    flexDirection: "row",
  },
});
