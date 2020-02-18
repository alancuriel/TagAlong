import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class LoginScreen extends React.Component {
  render() {
    return (
    <View style={styles.container}>
        <Text style={styles.greeting}>{'Hello,\nWelcome Back!'}</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    greeting: {
      marginTop: 32,
      fontSize: 18,
      fontWeight: "400",
      textAlign: "center"
    },
    error: {
      height: 72,
      alignItems: "center"
    }
  });