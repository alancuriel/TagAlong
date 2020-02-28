import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker
} from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";
import EventCategories from "../constants/EventCategories";
import GeoHash from "../constants/GeoHash";
import DateTimePicker from "@react-native-community/datetimepicker";

export default class CreatePostScreen extends React.Component {
  state = {
    error: "",
    title: "",
    date: new Date(),
    description: "",
    category: 0,
    location: "",
    localUri: "../assets/splash.png" // Default Image
  };

  createPostHandlerAsync = async () => {
    if (this.state.title == "") {
      this.setState({error: "Please add a title."});
      return;
    } else if(this.state.description == "") {
      this.setState({error: "Please add a description."});
      return;
    } else if(this.state.location == "") {
      this.setState({error: "Please add the event address"});
      return;
    } else if(this.state.date < new Date().setHours(0,0,0,0)){
      this.setState({error: "Please enter a valid date in the future"});
      return;
    }


    const eventLocation = await Location.geocodeAsync(this.state.location);
    if (eventLocation.length <= 0) {
      this.setState({ error: "Invalid address" });
      return;
    }

    const userLocation = await Location.getCurrentPositionAsync();
    const eventGeoHash = GeoHash.shared.getGeoHash(
      eventLocation[0].latitude,
      eventLocation[0].longitude
    );
    const userGeoHash = GeoHash.shared.getGeoHash(
      userLocation.coords.latitude.toString(),
      userLocation.coords.longitude.toString()
    );

    Fire.shared.addPost({
      title: this.state.title,
      description: this.state.description,
      date: this.state.date.toDateString(),
      category: this.state.category,
      localUri: this.state.localUri,
      eventAddress: this.state.location,
      eventLatitude: eventLocation[0].latitude,
      eventLongitude: eventLocation[0].longitude,
      eventGeoHash: eventGeoHash,
      userGeoHash: userGeoHash
    }).then(value => {
      this.props.navigation.navigate("posts");
    }).catch(error => {
      this.setState({error});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        ></TextInput>

        <Text>Category</Text>
        <Picker
          selectedValue={this.state.category}
          style={styles.categorySelect}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ category: itemValue })
          }
        >
          <Picker.Item label="Concert" value={EventCategories.CONCERT} />
          <Picker.Item label="Sports" value={EventCategories.SPORTS} />
          <Picker.Item
            label="Broadway Shows"
            value={EventCategories.BROADWAY_SHOWS}
          />
          <Picker.Item label="Comedy" value={EventCategories.COMEDY} />
          <Picker.Item
            label="Music Festival"
            value={EventCategories.MUSIC_FESTIVALS}
          />
        </Picker>

        <Text>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
        ></TextInput>

        <Text>Address City,State</Text>
        <TextInput
          style={styles.input}
          onChangeText={location => this.setState({ location })}
          value={this.state.location}
        ></TextInput>

        <DateTimePicker
          style={styles.date}
          value={this.state.date}
          onChange={(event,date) => this.setState({date})}
          mode="date"
          timeZoneOffsetInMinutes={0}
          minimumDate={new Date().setHours(0,0,0,0)}
        ></DateTimePicker>

        <TouchableOpacity onPress={this.createPostHandlerAsync}>
          <Text style={{ color: "blue" }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    backgroundColor: "white"
  },
  categorySelect: {
    width: "80%",
    fontSize: 12
  },
  date: {
    height: 100,
    width: 300,
    marginHorizontal: 25,
    position: "relative"
  }
});
