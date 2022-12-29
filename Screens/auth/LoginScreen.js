import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
} from "react-native";
import {useDispatch} from "react-redux"
import { authSignInUser } from "../../redux/auth/authOperations";
const LoginScreen = ({navigation}) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const dispatch=useDispatch()
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    // return () => {
    //     Dimensions.removeEventListener("change", onChange);
    //   };
  }, []);
  const onSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    const data = { password, email };
    dispatch(authSignInUser(data))
    console.log(data);
    setEmail("");
    setPassword("");
  };
  const onClose = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <ImageBackground
        style={styles.image}
        source={require("../../img/background.jpg")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          {/* <View style={styles.container}> */}

          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 20 : 78,
            }}
          >
            <Text style={styles.title}>Увійти</Text>
            <View style={{ ...styles.field, width: dimensions }}>
              <TextInput
                style={styles.input}
                placeholder="Адреса електронної пошти"
                onFocus={() => setIsShowKeyboard(true)}
                value={email}
                onChangeText={(value) => setEmail(value)}
              />
            </View>
            <View
              style={{ ...styles.field, marginBottom: 20, width: dimensions }}
            >
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
            </View>
            <TouchableOpacity
              style={{
                ...styles.button,
                width: dimensions,
                marginTop: isShowKeyboard ? 10 : 43,
              }}
              activeOpacity={0.8}
              onPress={onSubmit}
            >
              <Text style={styles.btnTitle}>Log in</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={()=>navigation.navigate("Register")} >
               <Text style={styles.link}>  Don't have an account? Register.</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* </View> */}
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 92,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    padding: 16,
    fontFamily: "roboto-regular",
  },
  field: {
    // marginHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    padding: 16,
    // marginTop: 43,
    marginBottom: 16,
    height: 51,
    marginHorizontal: 16,
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "roboto-regular",
  },
  link: {
    textAlign: "center",
    alignItems: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "roboto-regular",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "roboto-regular",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
