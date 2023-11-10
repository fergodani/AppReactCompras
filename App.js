import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CreateUserScreen from "./screens/CreateUserScreen";
import UsersList from "./screens/UserList"

export default createAppContainer(
  createStackNavigator( {CreateUserScreen, UsersList},{initialRouteName: "CreateUserScreen"}));