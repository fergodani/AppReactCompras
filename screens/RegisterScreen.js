import React, { useState } from "react";
import { signup } from "../services/auth";
import { firestore } from "../services/firebase";
import { addDoc, collection } from "@firebase/firestore";
import {
  Button,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const user = await signup(email, password);
      const userData = {
        uid: user.uid,
        name,
        surname
      }
      console.log(userData)
      if (user) {
        const ref = collection(firestore, "users");
        try {
          addDoc(ref, userData);
        } catch (err) {
          console.error(err);
        }
        alert("Usuario guardado");
        navigation.navigate("Login");
      }
    } catch (error) {
      setIsLoading(false);
      if (error.code == "auth/email-already-in-use") {
        alert("El email ya está en uso");
      } else if (error.code == "auth/weak-password") {
        alert("Contraseña débil");
      } else {
        alert("Error al iniciar sesion: " + error.message);
      }
    }
  };

  const handleLogin = async () => {
    navigation.navigate("Login");
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={surname}
          onChangeText={setSurname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleLogin}>
          <Text style={styles.title5}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
  );
};

export default RegisterScreen;

RegisterScreen.navigationOptions = {
  title: "Signup",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 35,
        gap: 10,
        justifyContent: 'center',
      },
      title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: 'center'
      },
      title5: {
        fontSize: 20,
        textAlign: 'center'
      },
      input: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
      },
      buttonContainer: {
        backgroundColor: "#333",
        borderRadius: 5,
        paddingHorizontal: 30,
        paddingVertical: 10,
      },
      buttonText: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
      },
      buttonSecondary: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 30,
        paddingVertical: 10
      }
});
