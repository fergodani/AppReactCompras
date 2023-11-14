import React, { useState, useEffect } from "react";
import { firestore } from "../services/firebase";
import { addDoc, collection, getDocs } from "@firebase/firestore";

import {
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const ProductsView = (props) => {
  const [products, setProducts] = useState([]);

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  // Constante para obtener la lista de productos de la base de datos
  const listProducts = collection(firestore, "products");

  useEffect(() => {
    // Función asincrónica para obtener los datos de la base de datos
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const consultaProds = await getDocs(listProducts);
        const datosProd = consultaProds.docs.map((doc) => {
          const { name, price, description } = doc.data();
          return { id: doc.id, name, price, description };
        });
        setProducts(datosProd);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.titulo}>Lista de Productos</Text>
      </View>

      {products.map((product) => (
        <View key={product.id} style={styles.productItem}>
          <View style={styles.flexRow}>
            <View>
            <Text style={styles.titulo}>{product.name}</Text>
            <Text style={{fontSize: 20, marginTop: 3}}>{product.price} €</Text>
            </View>
            <Button
              texto="Detalles"
              action={() => {
                navigation.navigate("ProductsDetail", {
                  name: product.name,
                  price: product.price,
                  description: product.description,
                });
              }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ProductsView;

ProductsView.navigationOptions = {
  title: "ProductsView",
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
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  }
});
