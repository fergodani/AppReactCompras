import { NavigationContainer } from "@react-navigation/native";
import UsersList from "./screens/UserList";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsView from "./screens/ProductsView";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CarroView from "./screens/CarroView";
import { CarritoProvider } from "./context/CarritoState";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCarrito } from "./context/CarritoState";
import OrderDetails from "./screens/OrderDetails"
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTab() {
  const { state} = useCarrito();
  return (
    <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Carrito') {
              iconName = focused
                ? 'ios-cart'
                : 'ios-cart-outline';
            } else if (route.name === 'Catálogo') {
              iconName = focused ? 'ios-pricetag' : 'ios-pricetag-outline';
            } else {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: 'gray',
          headerShown: true
        })}
      >
      <Tab.Screen name="Catálogo" component={ProductsView} />
      <Tab.Screen name="Carrito" component={CarritoStack} options={{ tabBarBadge: state.numElements }}/>
      <Tab.Screen name="Perfil" component={CarroView}/>
    </Tab.Navigator>
  );
}

function CarritoStack() {
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name= "Carrito 2" component={CarroView}/>
      <Stack.Screen name="Detalles Pedido" component={OrderDetails} />
      <Stack.Screen name="MainApp" component={MainTab} />
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
        <Toast />
      </CarritoProvider>

    </NavigationContainer>
  );
}
