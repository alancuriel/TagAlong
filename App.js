import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import {apiKeys} from "./config"

import React from 'react';

import * as firebase from "firebase";

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}

export default class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.state.isLoggedIn = user ? true: false;
    });
  }

  state = {
    isLoggedIn: false
  };

  

  render () {
    return(
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.isLoggedIn? (
            <>
           
            </>
          ): (
            <>
            <Stack.Screen login={this.loginHandler} name="Login" component={LoginScreen} />
            <Stack.Screen login={this.loginHandler} name="load" component={LoadingScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


