import React from "react";
import { View, Text, StyleSheet, ActivityIndicator} from "react-native";
import * as firebase from 'firebase'
import {StackActions} from "@react-navigation/native"

export default class LoadingScreen extends React.Component {

  render() {
    return (
    <View style={styles.container}>
        <Text>Loading ...</Text>
        <ActivityIndicator size="large"></ActivityIndicator>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    }
  });