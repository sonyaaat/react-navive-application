import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  CameraType,
  TextInput,
} from "react-native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import db from "../../firebase/config";
const CreatePostsScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const { userId, nickname } = useSelector((state) => state.auth);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    console.log(photo.uri);
    setPhoto(photo.uri);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    await db.storage().ref(`postImage/${uniquePostId}`).put(file);
    const processedPhoto = await db
      .storage()
      .ref(`postImage`)
      .child(uniquePostId)
      .getDownloadURL();
    return processedPhoto;
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "ERROR",
          textBody: "Permission to access location was denied",
        });
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location", location);
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);
  const reset = () => {
    setLocationName("");
    setName("");
    setPhoto(null);
  };

  const onSubmit = () => {
    if (!name || !locationName || !photo) {
      console.log("H");
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "ERROR",
        textBody: "Fill in all fields",
      });
      return;
    }
    uploadPostToServer();
    console.log("location", location);
    console.log("locationname", name, locationName);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "Congrats! Your post was created!",
    });
    navigation.navigate("Home");
    reset();
  };
  const uploadPostToServer = async () => {
    try {
      const uploadedPhoto = await uploadPhotoToServer();
      const createPost = await db
        .firestore()
        .collection("posts")
        .add({
          photo: uploadedPhoto,
          name,
          locationName,
          location,
          userId,
          nickname,
        });
      console.log("written");
    } catch (error) {
      console.log(error);
    }
  };
  function toggleCameraType() {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
    console.log(type);
  }
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission((cameraStatus.status = "granted"));
    })();
  }, []);
  if (!hasCameraPermission) {
    return <Text>There isnґt permission</Text>;
  }
  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera} type={type}>
          {photo && (
            <View style={styles.takenPhoto}>
              <Image
                source={{ uri: photo }}
                style={{ height: 50, width: 70 }}
              />
            </View>
          )}

          <TouchableOpacity style={styles.photo} onPress={takePhoto}>
            <Feather name="camera" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flip} onPress={toggleCameraType}>
            <MaterialCommunityIcons
              name="camera-flip-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </Camera>
        <Text style={styles.downloadInfo}>
          {!photo ? "Download Photo" : "Change Photo"}
        </Text>
        <View style={styles.form}>
          <View style={{ marginBottom: 31 }}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={{ marginBottom: 32 }}>
            <TextInput
              style={styles.input}
              placeholder="Geolocation"
              value={locationName}
              onChangeText={setLocationName}
            />
          </View>
          <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
            <Text style={styles.btnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
    // justifyContent: "center",
    // alignItems: "center",
  },
  camera: {
    borderRadius: 8,
    height: 240,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: 60,
    height: 50,
    backgroundColor: "rgba(200, 195, 196, 0.37)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  takenPhoto: {
    position: "absolute",
    top: 10,
    left: 10,
    height: 50,
    width: 70,
    // borderColor: "#fff",
    borderWidth: 1,
  },
  flip: {
    position: "absolute",
    top: 200,
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "rgba(200, 195, 196, 0.37)",
  },
  form: {
    marginTop: 32,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  submitBtn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "roboto-regular",

    color: "#fff",
  },
  downloadInfo: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "roboto-regular",
    color: "#BDBDBD",
    marginTop: 8,
  },
});

export default CreatePostsScreen;
