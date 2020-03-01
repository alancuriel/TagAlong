import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import EventCategories from "../constants/EventCategories";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";

const Post = props => {
  const getCategory = category => {
    switch (category) {
      case EventCategories.CONCERT:
        return "Concert";
      case EventCategories.BROADWAY_SHOWS:
        return "Broadway Show";
      case EventCategories.COMEDY:
        return "Comedy";
      case EventCategories.MUSIC_FESTIVALS:
        return "Music Festival";
      case EventCategories.SPORTS:
        return "Sports";
      default:
        return "No Category";
    }
  };

  const composeMailAsync = async () => {
    await MailComposer.composeAsync({
      recipients: [props.postData.email],
      subject: props.postData.title
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        {props.postData.userPic ? (
          <Image
            style={styles.pic}
            source={{ uri: props.postData.userPic }}
          ></Image>
        ) : (
          <Image
            style={styles.pic}
            source={require("../assets/default.jpg")}
          ></Image>
        )}
        <Text>{props.postData.userName}</Text>
      </View>
      <Text>{props.postData.title}</Text>
      <Text>{moment(props.postData.timestamp).fromNow()}</Text>
      <Text>{getCategory(props.postData.category)}</Text>
      <Text>{props.postData.description}</Text>
      <Text>{props.postData.date}</Text>

      <TouchableOpacity onPress={composeMailAsync}>
        <MaterialCommunityIcons name="email" style={styles.email} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    backgroundColor: "#9999",
    width: "100%"
  },
  user: {
    flexDirection: "row"
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  email: {
    width: "20",
    height: "20"
  }
});

export default Post;
