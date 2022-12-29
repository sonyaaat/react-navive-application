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
import { authSignUpUser } from "../../redux/auth/authOperations";
const RegistrationScreen = ({navigation}) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [nickname, setNickname] = useState("");
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
    const data = { nickname, password, email };
    dispatch(authSignUpUser(data))
    console.log(data);
    setNickname("");
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
          <View
            style={{ ...styles.form, paddingBottom: isShowKeyboard ? 20 : 78 ,width:dimensions+20*2}}
          >
            <Text style={styles.title}>Реєстрація</Text>
            <View style={{ ...styles.field, width: dimensions }}>
              <TextInput
                style={styles.input}
                placeholder="Логін"
                onFocus={() => setIsShowKeyboard(true)}
                value={nickname}
                onChangeText={(value) => setNickname(value)}
              />
            </View>
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
              <Text style={styles.btnTitle}>Register</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={()=>navigation.navigate("Login")} >
               <Text style={styles.link}> Already have an account? log in.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
export default RegistrationScreen;

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
    // marginHorizontal: 16,
  },
  btnTitle: {
    fontFamily: "roboto-regular",
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
  link: {
    textAlign: "center",
    alignItems: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "roboto-regular",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
