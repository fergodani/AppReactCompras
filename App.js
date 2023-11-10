import { NavigationContainer } from "@react-navigation/native";
import UsersList from "./screens/UserList";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="UsersList" component={UsersList} />
      <Tab.Screen name="UsersList" component={UsersList} />
    </Tab.Navigator>
  );
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
      <MainStack />
    </NavigationContainer>
  );
}
