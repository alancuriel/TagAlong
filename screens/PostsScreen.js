import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import * as firebase from "firebase";
import * as Location from "expo-location";
import GeoHash from "../constants/GeoHash";
import Fire from "../Fire";
import Post from "../components/Post";

export default class PostsScreen extends React.Component {
  state = {
    miles: 10,
    error: null,
    posts: null
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const userLocation = await Location.getCurrentPositionAsync();

    const range = GeoHash.shared.getGeohashRange(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      this.state.miles
    );

    Fire.shared
      .getNearbyPosts({
        lower: range.lower,
        upper: range.upper
      })
      .then(data => {
        if (data)
          this.setState({
            posts: data.map(d => {
              return { key: d[0], value: d[1] };
            })
          });
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>Hi! {this.state.email}</Text>

        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Post")}
        >
          <Text style={{ color: "lightblue" }}>Create Post</Text>
        </TouchableOpacity>

        <FlatList
          style={styles.posts}
          data={this.state.posts}
		  renderItem={itemData => <Post postData={itemData.item.value} />}
		  refreshing={false}
		  onRefresh={() => this.loadPosts()}
        />
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
  posts: {
    width: "95%"
  }
});
