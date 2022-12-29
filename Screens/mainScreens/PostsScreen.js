import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList,Image } from "react-native";
import {createStackNavigator} from "@react-navigation/stack"
import Home from "./Home";
import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";
const NestedScreen=createStackNavigator()
const PostsScreen=()=>{
    return(
<NestedScreen.Navigator>
    <NestedScreen.Screen name="Home" component={Home}/>
    <NestedScreen.Screen name="Map" component={MapScreen}/>
    <NestedScreen.Screen name="Comments" component={CommentsScreen}/>
</NestedScreen.Navigator>)
}
export default PostsScreen;
