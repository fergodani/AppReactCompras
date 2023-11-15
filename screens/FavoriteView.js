import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import Button from "../components/Button";
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
  updateDoc
} from "@firebase/firestore";
import IconButtonFav from "../components/IconButtonFav";

import { useRoute, useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCarrito } from "../context/CarritoState";

const FavoriteView = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  // Pillo los productos
  const listProducts = collection(firestore, "products");
  // Pillo los productos favoritos
  const favsCollection = collection(firestore, "userFavs");

  const [favs, setFavorites] = useState([]);

  const [products, setProducts] = useState([]);

  // Esto para la navegacion
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userRef = doc(collection(firestore, "users"), auth.currentUser.uid);
      const q = query(favsCollection, where("user", "==", userRef));
      const querySnapshot = await getDocs(q);
      let productsRetrieved = [];
      querySnapshot.forEach((doc) => {
        productsRetrieved = doc.data().products;
      });
      setFavorites(productsRetrieved);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  //Para el reload
  const onRefresh = useCallback(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userRef = doc(collection(firestore, "users"), auth.currentUser.uid);
      const q = query(favsCollection, where("user", "==", userRef));
      const querySnapshot = await getDocs(q);
      let productsRetrieved = [];
      querySnapshot.forEach((doc) => {
        productsRetrieved = doc.data().products;
      });
      setFavorites(productsRetrieved);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleRemoveToFavs = async (product) => {
    try {
      setIsLoading(true)
      const userRef = doc(collection(firestore, "users"), auth.currentUser.uid);

      const q = query(favsCollection, where("user", "==", userRef));

        // Actualizar la colección userFavs y elimina
        console.log("actualiza y elimina FV");

        const userFavsDoc = await getDocs(q);
        let productsRetrieved = favs.filter(p => p.name!= product.name);
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


  return (
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
        <Text style={styles.titulo1}>Tus productos favoritos</Text>
      </View>
      {!isLoading && favs.length == 0 && (<Text style={{textAlign: 'center', marginTop: 30}}>¡Añade tus productos favoritos!</Text>)}
      {!isLoading && (
         <> 
         {favs.map((productFav, index) => (
           <View key={index} style={styles.productItem}>
           <View style={styles.flexRow}>
             <View>
               <Text style={styles.titulo}>{productFav.name}</Text>
               <Text style={{ fontSize: 20, marginTop: 3 }}>
                 {productFav.price} €
               </Text>
             </View>
             <View style={{ flexDirection: "column" }}>
                 <IconButtonFav
                   icon={"ios-star"}
                   action={() => handleRemoveToFavs(productFav)}
                 />
               <Button
                 texto="Detalles"
                 action={() => {
                   navigation.navigate("ProductsDetail", {
                     name: productFav.name,
                     price: productFav.price,
                     description: productFav.description,
                   });
                 }}
               />
             </View>
           </View>
         </View>
         ))}
       </>
      )}
    </ScrollView>
  );
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
  titulo1: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    
  },
  description: {
    fontSize: 16,
    marginTop: 10,
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
    flex: 1,
  },
});

export default FavoriteView;

FavoriteView.navigationOptions = {
  title: "Favoritos",
};
