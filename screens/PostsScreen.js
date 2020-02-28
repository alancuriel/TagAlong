import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase"

export default class PostsScreen extends React.Component {
    state = {
        email: "",
        displayName: ""
    };


    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });
    }


  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>Hi! {this.state.email}</Text>

        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("createPost")}
        >
          <Text style={{ color: "lightblue" }}>Create Post</Text>
        </TouchableOpacity>
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
