import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, ScrollView } from "react-native";
import {Divider, Text} from 'react-native-elements'
import {Ionicons} from "@expo/vector-icons";
import * as firebase from "firebase";
import Constants from "expo-constants";
import * as Permissions from 'expo-permissions';
import Fire from '../Fire';
import * as ImagePicker from 'expo-image-picker'


export default class HomeScreen extends React.Component {
  state = {
    email: "",
    displayName: "",
    photoURL: "",
    firstName: "",
    lastName: "",
    Interests: ""
  };

  componentDidMount() {
    const {email, displayName, photoURL} = firebase.auth().currentUser;
    Fire.shared.getUserInfo().then(data => {
      this.setState({
        firstName: data.firstName,
        lastName: data.lastName,
        Interests: data.aboutMe
      });
    });

    this.setState({email, displayName, photoURL: photoURL ? photoURL: ""});
  }

  getPhotoPermission = async () => {
    if(Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if(status != "granted") {
        alert("We need permission access to your camera roll");
      }
    }
  };

  pickImage = async() => {
    this.getPhotoPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,5]
    });

    if(!result.cancelled) {
      this.setState({photoURL: result.uri});
      await Fire.shared.uploadProfilePic(result.uri);
    }
  };



  signOutUser = () => {
	  firebase.auth().signOut();
  };

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
      <View style={styles.imageContainer}>
      {this.state.photoURL == "" ? (

          <TouchableOpacity onPress={this.pickImage}>
            <Image source={require("../assets/profilet.png")} style={styles.image} />
          </TouchableOpacity>

        ) : (
          <TouchableOpacity onPress={this.pickImage} >
            <Image source={{uri: this.state.photoURL}} style={styles.image} />
          </TouchableOpacity>
        )}
        </View>
        <Text h3 style={styles.name}>
          {this.state.firstName + " " + this.state.lastName}
        </Text>
        <Text h5 style={styles.desc}>{this.state.email}</Text>
        <Divider style={styles.divider} />
        <Text h5 style={styles.about}>
        About me:
        </Text>
        <Text style={styles.desc}>
          {this.state.Interests}
        </Text>
        <Divider style={styles.divider} />
        <TouchableOpacity style={styles.logoffButton} onPress={this.signOutUser} >
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign Out</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2E2C3A'
  },
  logoffButton: {
    marginHorizontal: width * 0.06,
    backgroundColor: "#E9446A",
    borderRadius: 40,
    height: height * 0.06,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.3
  },
  imageContainer: {
    margin: 20,
  },
  image: {
    marginTop: height * 0.05,
    width: width - 50, // device width - some margin
    height: height / 2 - 60, // device height / 2 - some margin
    borderRadius: 20,
  },
  name: {
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  desc: {
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,
  },
  about: {
    color: '#E9446A',
    alignSelf: 'flex-start',
    marginHorizontal: 30,
    fontSize: 14,
  },
  divider: {
    backgroundColor: '#C0C0C0',
    width: width - 60,
    margin: 20,
  },
  socialLinks: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: width,
    marginLeft: 40,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
})
