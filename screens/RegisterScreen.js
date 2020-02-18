import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class RegisterScreen extends React.Component {
  render() {
    return (
    <View>
        <Text>Register Screen</Text>
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