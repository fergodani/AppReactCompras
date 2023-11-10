import { NavigationContainer } from "@react-navigation/native";
import UsersList from "./screens/UserList";
import CreateUserScreen from "./screens/CreateUserScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="CreateUserScreen" component={CreateUserScreen} />
      <Tab.Screen name="UsersList" component={UsersList} />
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
