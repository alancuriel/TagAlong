import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";

import * as firebase from "firebase";
import Fire from "../Fire";

export default class RegisterScreen extends React.Component {
  state = {
	firstName: "",
	lastName: "",
	aboutMe: "",
    email: "",
    password: "",
    errorMessage: null
  };

  handleLogin = () => {
	if (this.state.firstName == "") {
		this.setState({errorMessage: "First Name is empty"});
	} else if (this.state.lastName == "") {
		this.setState({errorMessage: "Last Name is empty"});
	} else if (this.state.aboutMe == "") {
		this.setState({errorMessage: "About me is empty"});
	} else if (this.state.email == "") {
		this.setState({errorMessage: "Email is empty"});
	} else if (this.state.password == "") {
		this.setState({errorMessage: "Password is empty"});
	}else {
		firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
		  Fire.shared.createUserInfo({
			  firstName: this.state.firstName,
			  lastName: this.state.lastName,
			  aboutMe: this.state.aboutMe
		  });
        return userCredentials.user.updateProfile({
          displayName: this.state.firstName
        });
      })
      .catch(error => this.setState({ errorMessage: error.message }));
	}
  };

  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.image}
      source={require("../assets/biglogo.png")}
      resizeMode="contain">
      </Image>
        <Text style={styles.greeting}>{"Welcome to TagAlong!"}</Text>

        <View style={styles.error}>
          {this.state.errorMessage && (
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style ={styles.wrapper}>
        <ScrollView style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>First Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
            ></TextInput>
          </View>

		  <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Last Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
            ></TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
		  <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>About Me</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={aboutMe => this.setState({ aboutMe })}
              value={this.state.aboutMe}
            ></TextInput>
          </View>
        </ScrollView>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: "center", marginTop: 20 }} onPress={ () => this.props.navigation.push("login")} >
          <Text style={{ color: "#000000", fontSize: 13 }}>
            Already registered?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,249,82,1)",
    flexDirection:'column'
  },
  image: {
    marginTop: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.5,
    height: width * 0.5,
    marginHorizontal: width * 0.25
  },
  wrapper: {
    height: height * 0.45
  },
  greeting: {
    marginBottom: height * 0.01,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center"
  },
  error: {
    height: height * 0.03,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  errorMessage: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  form: {
    marginBottom: height * 0.05,
    marginHorizontal: 30
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D"
  },
  loginButton: {
    marginHorizontal: width * 0.06,
    backgroundColor: "#E9446A",
    borderRadius: 40,
    height: height * 0.06,
    alignItems: "center",
    justifyContent: "center"
  }
});
