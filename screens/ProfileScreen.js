import React, { useState, useEffect } from "react";
import { firestore, auth } from "../services/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  getDocFromServer,
} from "@firebase/firestore";
import IconButton from "../components/IconButton";
import {
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    // Incrementa la clave de recarga para forzar la actualización del componente
    const fetchData = async () => {
      setIsLoading(true);
      const userRef = doc(collection(firestore, "users"), auth.currentUser.uid);
      const q = query(ordersCollection, where("user", "==", userRef));
      const querySnapshot = await getDocs(q);
      const productsRetrieved = [];
      querySnapshot.forEach((doc) => {
        productsRetrieved.push(doc.data());
      });
      console.log(productsRetrieved);
      setOrders(productsRetrieved);
      setIsLoading(false);
    };
    fetchData();
  };

  const ordersCollection = collection(firestore, "orders");
  const productsCollection = collection(firestore, "products");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userRef = doc(collection(firestore, "users"), auth.currentUser.uid);
      const q = query(ordersCollection, where("user", "==", userRef));
      const querySnapshot = await getDocs(q);
      const productsRetrieved = [];
      querySnapshot.forEach((doc) => {
        productsRetrieved.push(doc.data());
      });
      console.log(productsRetrieved);
      setOrders(productsRetrieved);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <View style={{ flexDirection: "row-reverse", elevation: 5 }}>
        <IconButton
          icon="ios-refresh" // Ajusta el nombre del icono y otros estilos según tus necesidades
          action={handleReload}
        />
      </View>
      <ScrollView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Text style={styles.titulo}>Pedidos</Text>
            {orders.map((order) => (
              <View key={order.id} style={styles.card}>
                <Text style={styles.titulo}>Dirección</Text>
                <Text style={{textAlign: 'center'}}>{order.address}</Text>
                <Text style={{textAlign: 'center'}}>{order.country}</Text>
                <Text style={{textAlign: 'center'}}>{order.postalCode}</Text>
                <Text style={{textAlign: 'center'}}>{order.province}</Text>
                <Text style={{textAlign: 'center'}}>{order.total} €</Text>
                <Text style={styles.titulo}>Productos</Text>
                {order.products.map((item) => (
                  <View key={item.product.id}>
                    <Text style={{textAlign: 'center'}}>{item.product.name}</Text>
                    <Text style={{textAlign: 'center'}}>{item.product.price} €</Text>
                    <Text style={{textAlign: 'center'}}>Uds: {item.product.quantity}</Text>
                  </View>
                ))}
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default ProfileScreen;

ProfileScreen.navigationOptions = {
  title: "Perfil",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    elevation: 0
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
  },
  card: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 15,
  },
});
