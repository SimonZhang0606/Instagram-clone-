import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAlCIRSgj8lx3K-uKeZHhJ4hu7EtaD2xR8",
  authDomain: "instagram-demo-3418b.firebaseapp.com",
  projectId: "instagram-demo-3418b",
  storageBucket: "instagram-demo-3418b.appspot.com",
  messagingSenderId: "482691623522",
  appId: "1:482691623522:web:1d67049d0ea99415663f3b",
  measurementId: "G-SZRFEYVFR6"
};

if (firebase.app.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Userr is logged in</Text>
      </View>
    );
  }
}

export default App;
