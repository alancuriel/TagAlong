import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image} from "react-native";
import * as firebase from 'firebase'
import {StackActions} from "@react-navigation/native"

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "home" : "login");
    });
  }

  render() {
    return (
    <View style={styles.container}>
        <Image
        source={require("../assets/biglogo.png")}
        resizeMode="center">
        </Image>
        <ActivityIndicator size="large" color="#000000"></ActivityIndicator>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(255,249,82,1)",
      alignItems: "center",
      justifyContent: "center"
    }
  });
