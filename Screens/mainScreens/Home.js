import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, Button } from "react-native";
import db from "../../firebase/config";
import { EvilIcons } from '@expo/vector-icons'; 
const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  console.log("posts", posts);
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
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

export default Home;
