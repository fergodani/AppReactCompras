import { NavigationContainer } from "@react-navigation/native";
import ProductsView from "./screens/ProductsView";
import UserList from "./screens/UserList";
import CreateUserScreen from "./screens/CreateUserScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="CreateUserScreen" component={CreateUserScreen} />
      <Tab.Screen name="ProductsView" component={ProductsView} />
      <Tab.Screen name="UserList" component={UserList} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
