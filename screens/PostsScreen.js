import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions
} from "react-native";
import * as firebase from "firebase";
import * as Location from "expo-location";
import GeoHash from "../constants/GeoHash";
import Fire from "../Fire";
import Post from "../components/Post";
import { TextInput } from "react-native-gesture-handler";

export default class PostsScreen extends React.Component {
  state = {
    miles: 10,
    error: null,
    posts: null,
    showMileSelector: false
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
      console.log(this.state.posts);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", marginTop: 35 }}>
          <TouchableOpacity
            onPress={() => this.setState({ showMileSelector: true })}
          >
            <Text style={{ color: "blue" }}>
              Around {this.state.miles} Miles
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Post")}
          >
            <Text style={{ color: "lightblue" }}>Create Post</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.posts}
          data={this.state.posts}
          renderItem={itemData => <Post postData={itemData.item.value} />}
          refreshing={false}
          onRefresh={() => this.loadPosts()}
        />
        <Modal
          visible={this.state.showMileSelector}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.miles}>
            <TouchableOpacity
              onPress={async () => {
                this.setState({ miles: 10, showMileSelector: false });
                await this.loadPosts();
              }}
            >
              <Text>10 Miles</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                this.setState({ miles: 15, showMileSelector: false });
                await this.loadPosts();
              }}
            >
              <Text>15 Miles</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                this.setState({ miles: 30, showMileSelector: false });
                await this.loadPosts();
              }}
            >
              <Text>30 Miles</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                this.setState({ miles: 50, showMileSelector: false });
                await this.loadPosts();
              }}
            >
              <Text>50 Miles</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                this.setState({ miles: 100, showMileSelector: false });
                await this.loadPosts();
              }}
            >
              <Text>100 Miles</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E2C3A",
    alignItems: "center",
    justifyContent: "center"
  },
  posts: {
    width: width * 0.95
  },
  miles: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#717171",
    padding: 20,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    position: "absolute"
  }
});
