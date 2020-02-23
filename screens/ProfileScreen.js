import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
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
    city: "",
    state: "",
    Interests: ""
  };

  componentDidMount() {
    const {email, displayName, photoURL} = firebase.auth().currentUser;
    
    this.setState({email,displayName, photoURL: photoURL ? photoURL: ""});
    this.getPhotoPermission();
  }

  getPhotoPermission = async () => {
    if(Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);

      if(status != "granted") {
        alert("We need permission access to your camera roll");
      }
    }
  };

  pickImage = async() => {
    let result = await ImagePicker.launchCameraAsync({
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
        {this.state.photoURL == "" ? (
          <TouchableOpacity onPress={this.pickImage} style={styles.imagePlaceHolder}>
            <Ionicons f name="ios-person" size={35}/>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.pickImage} >
            <Image source={{uri: this.state.photoURL}} style={styles.profilePic} />
          </TouchableOpacity>
        )}


        <Text style={{fontSize: 14}}>Hi! {this.state.email}</Text>

        <TouchableOpacity>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>

        <Text>First Name</Text>
        <Text>{this.state.firstName}</Text>

        <Text>Last Name</Text>
        <Text>{this.state.lastName}</Text>

        <Text>City</Text>
        <Text>{this.state.city}</Text>

        <Text>State</Text>
        <Text>{this.state.state}</Text>

        <Text>About Me</Text>
        <Text>{this.state.Interests}</Text>
        

      <TouchableOpacity style={{marginTop: 32}} onPress={this.signOutUser}>
        <Text>Sign Out</Text>
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
  },
  imagePlaceHolder: {
    width: 75,
    height: 75,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  profilePic: {
    width: 75,
    height: 75,
    borderRadius: 30,
  },
  edit: {
    color: "blue"
  }
});
