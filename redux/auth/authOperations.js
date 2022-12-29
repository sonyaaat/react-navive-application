import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../../firebase/config";
import { authSlice } from "./authReducer";
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await db
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
      console.log("user", user);
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const authSignUpUser =
  ({ nickname, password, email }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;
      await user.updateProfile({ displayName: nickname });
      const { uid, displayName } = await db.auth().currentUser;
      const userUpdateProfile = {
        userId: uid,
        nickname: displayName,
      };

      dispatch(
        authSlice.actions.updateUserProfile({
          ...userUpdateProfile,
        })
      );
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch) => {
 try {
    await db.auth().signOut();
    dispatch(authSlice.actions.authSignOut())
 } catch (error) {
    
 }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await db.auth().onAuthStateChanged((user) => {
      if (user) {
        const userUpdateProfile = {
            userId: user.uid,
            nickname: user.displayName,
          };
        dispatch(
          authSlice.actions.updateUserProfile({
            ...userUpdateProfile,
          })
        );
        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      }
      
    });
  } catch (error) {
    console.log("error", error.message);
  }
};
