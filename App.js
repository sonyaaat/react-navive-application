import { StyleSheet} from "react-native";
import { useState,useEffect } from "react";

import useRoute from "./router";
import {Provider} from "react-redux"
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { store } from "./redux/store";
import { authStateChangeUser } from "./redux/auth/authOperations";
import Main from "./components/Main";

const fonts = async () => {
  await Font.loadAsync({
    "roboto-regular": require("./fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./fonts/Roboto-Bold.ttf"),
    "roboto-medium": require("./fonts/Roboto-Medium.ttf"),
  });
};




export default function App() {
  const [font, setFont] = useState(false);
 
 
  
  if (!font) {
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={() => setFont(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <>
    <Provider store={store}>
     <Main/>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "roboto-regular",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
});
