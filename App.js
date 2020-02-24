import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BottomTabNavigator from "./navigation/BottomTabNavigator"
import {apiKeys} from "./config"

import {Platform, View, StatusBar, StyleSheet} from 'react-native'
import React from 'react';

import * as firebase from "firebase";

const Stack = createStackNavigator();

export default class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isLoggedIn: user?true:false});
    });
  }

  state = {
    isLoggedIn: undefined
  };



  render () {
    return(
      <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="load">
        <Stack.Screen name="home" component={BottomTabNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="load" component={LoadingScreen} options={{headerShown:false}}/>
        <Stack.Screen name="register" component={RegisterScreen}/>
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
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
