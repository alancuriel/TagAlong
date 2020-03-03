import React from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker,
  ScrollView,
  Dimensions
} from "react-native";
import {Text} from 'react-native-elements'
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Fire from "../Fire";
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
    location: ""
  };

  componentDidMount() {
    this.getLocationPermissions();
  }

  getLocationPermissions = async() => {
    const {status} = await Permissions.getAsync(Permissions.LOCATION);

    if(status != "granted") {
      alert("We need permission access to your camera roll");
    }
  };

  createPostHandlerAsync = async () => {
    if (this.state.title == "") {
      this.setState({ error: "Please add a title." });
      return;
    } else if (this.state.description == "") {
      this.setState({ error: "Please add a description." });
      return;
    } else if (this.state.location == "") {
      this.setState({ error: "Please add the event address" });
      return;
    } else if (this.state.date < new Date().setHours(0, 0, 0, 0)) {
      this.setState({ error: "Please enter a valid date in the future" });
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

    Fire.shared
      .addPost({
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
      })
      .then(value => {
        this.props.navigation.navigate("Post");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text h5 style={styles.textCategory}>Title:</Text>
        <TextInput
          style={styles.input}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        ></TextInput>
        <Picker
          selectedValue={this.state.category}
          style={styles.categorySelect}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ category: itemValue })
          }
          itemStyle={{color:'white'}}
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

        <Text h5 style={styles.textCategory}>Description:</Text>
        <TextInput
          style={styles.input}
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
        ></TextInput>

        <Text h5 style={styles.textCategory}>Address,City,State:</Text>
        <TextInput
          style={styles.input}
          onChangeText={location => this.setState({ location })}
          value={this.state.location}
        ></TextInput>

        <DateTimePicker
          style={styles.date}
          value={this.state.date}
          onChange={(event, date) => this.setState({ date })}
          mode="date"
          timeZoneOffsetInMinutes={0}
          minimumDate={new Date().setHours(0, 0, 0, 0)}
          itemStyle={{color:'white'}}
        ></DateTimePicker>

        <TouchableOpacity onPress={this.createPostHandlerAsync} style={styles.logoffButton}>
          <Text style={{ color: "white", fontWeight: '500'}}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#2E2C3A",
    alignItems: "center",
    justifyContent: "center"
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
  textCategory: {
  color: '#FFFFFF'
},
  input: {
    backgroundColor: "#E9446A",
    height: height * 0.04,
    width: width * 0.8,
    borderRadius: 5
  },
  categorySelect: {
    width: height * 0.3,
    fontSize: 12,
    color: "white"
  },
  date: {
    height: height * 0.3,
    width: width * 0.8,
    color:"#FFFFFF"
  }
});
