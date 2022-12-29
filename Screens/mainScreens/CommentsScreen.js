import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import db from "../../firebase/config";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { createContext, useState, useEffect } from "react";
const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { nickname } = useSelector((state) => state.auth);
  const postId = route.params.postId;
  const photo=route.params.photo
  console.log(postId);
  const addComment = () => {
    if (!comment) {
      console.log("H");
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "ERROR",
        textBody: "Enter your comment",
      });
      return;
    }
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, nickname });
    setComment("");
  };
  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setComments(data.docs.map((doc) => ({ ...doc.data(),id:doc.id})))
      );
  };
  useEffect(() => {
    getAllPosts();
    console.log(comments);
  }, [comment]);
  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
       <View style={{marginHorizontal:16}}>
       <Image source={{ uri: photo }} style={styles.image}/>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View style={styles.commentsField}>
              <Text style={styles.author}>{item.nickname}</Text>
              <View  style={styles.comment}><Text>{item.comment}</Text></View>
            </View>
          )}
          keyExtractor={(item)=>item.id.toString()}
        />
       </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Comment"
            value={comment}
            onChangeText={setComment}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={addComment}>
            <AntDesign name="arrowup" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </AlertNotificationRoot>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    padding: 16,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },
  form: {
    position: "relative",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  author:{
    fontFamily:"roboto-bold",
  },
  comment:{
    backgroundColor:"rgba(0, 0, 0, 0.03)",
    minHeight:30,
    justifyContent:"center"
  },
  commentsField:{
    marginBottom:24,
    borderColor:"#000",
    borderWidth:1,
    padding:5
  },
  image:{
    marginBottom:32,
    height:240,
    borderRadius:8
  }
});
export default CommentsScreen;
