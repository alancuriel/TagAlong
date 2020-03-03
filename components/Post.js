import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import {Text} from "react-native-elements"
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
      <View style={styles.containerin}>
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
        <Text h4 style={styles.txt}>{props.postData.userName}</Text>
        <TouchableOpacity onPress={composeMailAsync} style={styles.mail}> 
        <MaterialCommunityIcons name="email" size={25} color="pink"/>
      </TouchableOpacity>
      </View>
      <Text style={styles.txt}>{moment(props.postData.timestamp).fromNow()}</Text>
      <Text style={styles.txt}>{props.postData.title}</Text>
      <Text style={styles.txt}>{getCategory(props.postData.category)}</Text>
      <Text style={styles.txt}>{props.postData.description}</Text>
      <Text style={styles.txt}>{props.postData.date}</Text>
      </View>
    </View>
  );
};

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    backgroundColor: "#E9446A",
    width: width * 0.95,
    borderRadius: 20
  },
  containerin:{
    width: width * 0.9,
    marginLeft: width * 0.02
  },
  user: {
    flexDirection: "row",
    width: width * 0.9,
    alignItems: "flex-end"
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  txt:{
    color:"white"
  },
  mail:{
    alignItems: "flex-end"
  }
});

export default Post;
