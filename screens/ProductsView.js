import React, { useState, useEffect, useCallback } from "react";
import { getStorage, ref } from "firebase/storage";
import { Dropdown } from "react-native-element-dropdown";
import { firestore, auth } from "../services/firebase";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  getDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDocFromServer,
  updateDoc,
} from "@firebase/firestore";

import {
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import IconButtonFav from "../components/IconButtonFav";

const ProductsView = (props) => {
  const [products, setProducts] = useState([]);
  const [favs, setFavorites] = useState([]);
  const navigation = useNavigation();

 

  //const [favsCollection, setFavs] = useState([]);
  const favsCollection = collection(firestore, "userFavs");
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
          const { name, price, description, image } = doc.data();
          return { name, price, description, image };
        });
        setProducts(datosProd);

        const userRef = doc(
          collection(firestore, "users"),
          auth.currentUser.uid
        );
        const q = query(favsCollection, where("user", "==", userRef));
        const querySnapshot = await getDocs(q);
        let productsRetrieved = [];
        querySnapshot.forEach((doc) => {
          productsRetrieved = doc.data().products;
        });

        setFavorites(productsRetrieved);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  //Para el reload
  const onRefresh = useCallback(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const consultaProds = await getDocs(listProducts);
        const datosProd = consultaProds.docs.map((doc) => {
          const { name, price, description, image } = doc.data();
          return { name, price, description, image };
        });
        setProducts(datosProd);

        const userRef = doc(
          collection(firestore, "users"),
          auth.currentUser.uid
        );
        const q = query(favsCollection, where("user", "==", userRef));
        const querySnapshot = await getDocs(q);
        let productsRetrieved = [];
        querySnapshot.forEach((doc) => {
          productsRetrieved = doc.data().products;
        });

        setFavorites(productsRetrieved);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  function includesWithLooseEquality(array, target) {
    for (let element of array) {
      if (element.name == target.name) {
        return true;
      }
    }
    return false;
  }

  const handleAddToFavs = async (product) => {
    try {
      setIsLoading(true);
      const userRef = doc(collection(firestore, "users"), auth.currentUser.uid);

      const q = query(favsCollection, where("user", "==", userRef));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.size < 1) {
        console.log("crea y agrega");
        // Crear la colección userFavs y agregar el primer producto
        await setDoc(doc(collection(firestore, "userFavs")), {
          user: userRef,
          products: [product],
        });
      } else {
        // Actualizar la colección userFavs y agregar el nuevo producto
        console.log("actualiza y agrega");

        const userFavsDoc = await getDocs(q);
        let productsRetrieved = [];
        let docRef = {};
        userFavsDoc.forEach((doc) => {
          docRef = doc.ref;
          productsRetrieved = doc.data().products;
          productsRetrieved.push(product);
        });
        await updateDoc(docRef, {
          products: productsRetrieved,
        });

        onRefresh();
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleRemoveToFavs = async (product) => {
    try {
      setIsLoading(true);
      const userRef = doc(collection(firestore, "users"), auth.currentUser.uid);

      const q = query(favsCollection, where("user", "==", userRef));

      // Actualizar la colección userFavs y elimina
      console.log("actualiza y elimina PV");

      const userFavsDoc = await getDocs(q);
      let productsRetrieved = favs.filter((p) => p.name != product.name);
      let docRef = {};
      userFavsDoc.forEach((doc) => {
        docRef = doc.ref;
      });
      await updateDoc(docRef, {
        products: productsRetrieved,
      });

      onRefresh();
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  
  //Funcion para el filtrado de productos por categoría
  const prodFilter = async (categoryValue) => {
    setIsLoading(true);
    try {
      // Aquí actualizamos la consulta para filtrar por la categoría seleccionada
      if (categoryValue == "Todos") {
        const consultaProds = await getDocs(listProducts);
        const datosProd = consultaProds.docs.map((doc) => {
          const { name, price, description, image } = doc.data();
          return { name, price, description, image };
        });
        setProducts(datosProd);
        setIsLoading(false);
        return;
      }
      const querySnapshot = await getDocs(
        query(listProducts, where("category", "==", categoryValue))
      );
  
      const filteredProducts = querySnapshot.docs.map((doc) => {
        const { name, price, description, image, category } = doc.data();
        return { name, price, description, image, category };
      });
  
      setProducts(filteredProducts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={["#333"]}
            progressBackgroundColor="#ffffff"
          />
        }
      >
        <View style={styles.inputGroup}>
          <Text style={styles.titulo}>Lista de Productos</Text>
        </View>
        {!isLoading && (
          <>
            {products.map((product, index) => (
              <TouchableOpacity
                key={index}
                style={styles.productItem}
                underlayColor="#efefef"
                onPress={() => {
                  navigation.navigate("ProductsDetail", {
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    image: product.image,
                  });
                }}
              >
                <View style={styles.flexRow}>
                  <View style={{ flexDirection: "row", gap: 25 }}>
                    <Image
                      style={styles.image}
                      source={{ uri: product.image }}
                    />
                    <View>
                      <Text style={styles.titulo}>{product.name}</Text>
                      <Text style={{ fontSize: 20, marginTop: 3 }}>
                        {product.price} €
                      </Text>
                    </View>
                  </View>
                  {includesWithLooseEquality(favs, product) ? (
                    <IconButtonFav
                      icon={"ios-star"}
                      action={() => handleRemoveToFavs(product)}
                    />
                  ) : (
                    <IconButtonFav
                      icon={"ios-star-outline"}
                      action={() => handleAddToFavs(product)}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
      <View style={styles.dropView}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        placeholder="Categorías"
        labelField="label"
        valueField="value"
        onChange={(item) => {//aqui cambia segun el item.value
          prodFilter(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={15}
          />
        )}
      />
      </View>
      
    </>
  );
};

export default ProductsView;

ProductsView.navigationOptions = {
  title: "ProductsView",
};

const data = [
  { label: "Todos", value: "Todos" },
  { label: "Fruta", value: "Fruta" },
  { label: "Carbohidratos", value: "Carbohidrato" },
];

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
    backgroundColor: "white",
    borderRadius: 5
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
    flex: 1,
  },
  image: {
    width: 70,
    aspectRatio: 1,
    borderRadius: 5,
  },
  dropdown: {
    margin: 20,
    height: 50,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 300,
  },
  dropView: {
    alignItems: "center",
    backgroundColor: "white",
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 10
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 10
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
