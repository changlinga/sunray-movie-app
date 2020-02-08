import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  View
} from "react-native";
import { Avatar } from "react-native-elements";
import moment from "moment";

import { TMDB_IMAGE_BASE_URL } from "../constants/general";
import { moderateScale } from "../utility/UIScale";

export default class Person extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  });

  state = {
    person: {}
  };

  componentDidMount() {
    this.reload();
  }

  render() {
    const { person } = this.state;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl
            refreshing={this.props.people.loading}
            onRefresh={this.reload.bind(this)}
          />
        }
      >
        <View style={styles.topContainer}>
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri: TMDB_IMAGE_BASE_URL + "/w500" + person.profile_path
            }}
          />
          <Text style={styles.name}>{person.name}</Text>
          <Text style={styles.caption}>
            {person.birthday
              ? `Birthday: ${moment(person.birthday, "YYYY-MM-DD").format(
                  "D MMMM YYYY"
                )}`
              : ""}
          </Text>
          <Text style={styles.caption}>
            {person.place_of_birth
              ? `Place of birth: ${person.place_of_birth}`
              : ""}
          </Text>
        </View>
        <Text style={styles.biography}>{person.biography}</Text>
      </ScrollView>
    );
  }

  reload() {
    const { id } = this.props.navigation.state.params;

    this.props.personGetActions(id).then(() => {
      const { people, error } = this.props.people;

      if (error) {
        Alert.alert(
          error.title,
          error.message,
          [
            {
              text: "OK"
            }
          ],
          {
            cancelable: false
          }
        );
        return;
      }

      this.setState({
        person: people.find(person => person.id === id)
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  contentContainerStyle: {
    padding: moderateScale(15)
  },

  topContainer: {
    alignItems: "center"
  },

  name: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(25),
    fontWeight: "bold"
  },

  caption: {
    color: "grey",
    fontSize: moderateScale(15)
  },

  biography: {
    marginTop: moderateScale(15),
    fontSize: moderateScale(15),
    textAlign: "justify"
  }
});
