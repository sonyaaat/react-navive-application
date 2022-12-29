import React, { useEffect, useState } from "react";
import { EvilIcons } from '@expo/vector-icons'; 
import { View, Text, StyleSheet,Button,FlatList,Image } from "react-native";
import {useDispatch,useSelector} from "react-redux"
import db from "../../firebase/config"
import {authSignOutUser} from "../../redux/auth/authOperations"
const ProfileScreen = ({navigation}) => {
  const [posts,setPosts]=useState([])
  const {userId}=useSelector(state=>state.auth)
  const getUsePosts=async()=>{
try {
  await db.firestore().collection("posts").where("userId","==", userId).onSnapshot((data) =>
setPosts(data.docs.map((doc) => ({ ...doc.data()}))))
} catch (error) {
  console.log(error)
}
  }
  useEffect(()=>{
    getUsePosts()
  },[])
  const signOut=()=>{
    dispatch(authSignOutUser())
  }
  const dispatch=useDispatch()
  return (
    <View style={styles.container}>
       <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postWrapper}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <Text style={styles.name}>{item.name}</Text>
            <View style={{flex:1,flexDirection:"row"}}>
              <View><EvilIcons  onPress={() => navigation.navigate("Comments",{postId:item.id,photo:item.photo})} name="comment" size={24} color="grey" /></View>
              <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end"}}>
                <EvilIcons name="location" size={24} color="grey" />
                <Text onPress={() => navigation.navigate("Map",{location:item.location})}>{item.locationName}</Text>
              </View>
            </View>
          </View>
        )}
      />
      
    </View>
      <Button title="Sign Out" onPress={signOut}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 8,
    // alignItems: "center",
  },
  postWrapper: {
    marginBottom: 32,
  },
  photo: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "roboto-regular",
    marginBottom: 8,
  },
});
export default ProfileScreen;