import React, { useState } from "react";
import { login } from "../services/auth";
import {
  Button,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async (props) => {
    setIsLoading(true);
    try {
      const user = await login(email, password);
      if (user) {
        /*
            if (!user.emailVerified) {
                setShowEmailMessage(true);
                await emailVerification();
                await logout();
                setIsLoading(false)
            }
            */
            setIsLoading(false);
            navigation.navigate("MainApp");
      }
    } catch (error) {
      setIsLoading(false);
      if (
        error.code == "auth/user-not-found" ||
        error.code == "auth/wrong-password"
      ) {
        Toast.show({type: 'error', text1: 'Usuario o contraseña inválidos.', position: 'bottom'})
      } else if (error.code === "auth/too-many-requests") {
        alert("Demasiados intentos");
        Toast.show({type: 'error', text1: 'Demasiados intentos', position: 'bottom'})
      } else {
        Toast.show({type: 'error', text1: "Usuario o contraseña inválidos." , position: 'bottom'})
      }
    }
    
  };

  const handleSignup = async () => {
    navigation.navigate("Signup");
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleSignup}>
          <Text style={styles.title5}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

LoginScreen.navigationOptions = {
  title: "Login",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 35,
    gap: 10,
    justifyContent: 'center'
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
    paddingVertical: 10,
  }
});
