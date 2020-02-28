import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import CreatePostScreen from "./CreatePostScreen";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "./PostsScreen";

const Stack = createStackNavigator();

export default class HomeScreen extends React.Component {
  componentDidMount() {
    this.getLocationPermissions();
  }

  getLocationPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status != "granted") {
      alert("We need your permission to show the posts around your area.");
    }
  };

  render() {
    return (
      <Stack.Navigator initialRouteName="posts">
        <Stack.Screen
          name="createPost"
          component={CreatePostScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="posts" component={PostsScreen} />
      </Stack.Navigator>
    );
  }
}
