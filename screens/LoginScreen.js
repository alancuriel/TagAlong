import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  LayoutAnimation
} from "react-native";

import * as firebase from "firebase"

export default class LoginScreen extends React.Component {

  state = {
    email: "",
    password: "",
    errorMessage: null
  };

  handleLogin = () => {
    const {email, password} = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
      <Image style={styles.image}
      source={require("../assets/biglogo.png")}
      resizeMode="contain">
      </Image>

        <View style={styles.error}>

          {this.state.errorMessage && (
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>
          <View style={styles.passwordForm}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin} >
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: "center", marginTop: 20 }} onPress={ () => this.props.navigation.push("register")} >
          <Text style={{ color: "#000000", fontSize: 13 }}>
            New to TagAlong?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign Up</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
    width: width * 0.5,
    height: width * 0.5,
    marginHorizontal: width * 0.25
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
    color: "#000000",
    fontSize: 10,
    textTransform: "uppercase"
  },
  passwordForm: {
    marginTop: height * 0.04
  },
  input: {
    borderBottomColor: "#000000",
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
