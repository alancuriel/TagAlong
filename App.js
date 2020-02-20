import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import {apiKeys} from "./config"

import {Platform, View, StatusBar, StyleSheet} from 'react-native'
import React from 'react';

import * as firebase from "firebase";

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}

export default class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isLoggedIn: user?true:false});
    });
  }

  state = {
    isLoggedIn: false
  };

  

  render () {
    return(
      <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          {this.state.isLoggedIn? (
            <Stack.Screen name="home" component={HomeScreen}/>
          ): (
            <>
            <Stack.Screen name="login" component={LoginScreen}
              options={{title:""}} />
            <Stack.Screen name="register" component={RegisterScreen}/>
            <Stack.Screen name="load" component={LoadingScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});