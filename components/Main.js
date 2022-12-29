import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import useRoute from "../router";
import db from "../firebase/config";
import { useState, useEffect } from "react";
import { authStateChangeUser } from "../redux/auth/authOperations";
const Main = () => {
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);
  useEffect(() => {

    dispatch(authStateChangeUser());
  }, [stateChange]);
  

  useEffect(() => {});
  const routing = useRoute(stateChange);
  return <NavigationContainer>{routing}</NavigationContainer>;
};
export default Main;
