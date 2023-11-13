import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsView from "./screens/ProductsView";
import ProductsDetail from "./screens/ProductsDetail";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CarroView from "./screens/CarroView";
import { CarritoProvider } from "./context/CarritoState";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Catálogo" component={CatalogoStack} />
      <Tab.Screen name="Carrito" component={CarroView} />
    </Tab.Navigator>
  );
}

function CatalogoStack() {
    return(
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Catálogo2" component={ProductsView}/>
        <Stack.Screen name="ProductsDetail" component={ProductsDetail}/>
      </Stack.Navigator>);

}

function MainStack() {
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={RegisterScreen} />
      <Stack.Screen name="MainApp" component={MainTab} />
    </Stack.Navigator>);
}

export default function App() {
  return (
    <NavigationContainer>
      <CarritoProvider>
        <MainStack />
      </CarritoProvider>

    </NavigationContainer>
  );
}
