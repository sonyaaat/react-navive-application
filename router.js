import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./Screens/mainScreens/PostsScreen";
import CreatePostsScreen from "./Screens/mainScreens/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreens/ProfileScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";

import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 


const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const useRoute = (isAuth) => {
    if (!isAuth) {
      return (
        <AuthStack.Navigator >
          <AuthStack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
        </AuthStack.Navigator>
      );
    }
    return (
      <MainTab.Navigator  screenOptions={{showLabel:false}}>
        <MainTab.Screen  options={{headerShown: false ,tabBarIcon:({focused,size,color})=><AntDesign name="appstore-o" size={24} color={color} />}} name="Posts" component={PostsScreen} />
        <MainTab.Screen options={{tabBarIcon:({focused,size,color})=> <Ionicons name="add" size={30} color={color} />}} name="CreatePosts" component={CreatePostsScreen} />
        <MainTab.Screen options={{tabBarIcon:({focused,size,color})=> <Ionicons name="ios-person-outline" size={24} color={color} />}}name="Profile" component={ProfileScreen} />
      </MainTab.Navigator>
    );
  };
  export default useRoute