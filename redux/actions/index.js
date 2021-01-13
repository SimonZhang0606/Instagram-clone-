import firebase from "firebase";

export function fetchUser() {
  return dispatch => {
    firebase
      .firebase()
      .collection("user")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        }
      });
  };
}
