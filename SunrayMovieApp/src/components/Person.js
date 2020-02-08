import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  View,
  Alert,
  SafeAreaView
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import moment from "moment";
import { StackActions } from "react-navigation";

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
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          refreshControl={
            <RefreshControl
              refreshing={this.props.people.loading}
              onRefresh={this.reload.bind(this)}
            />
          }
        >
          <View style={styles.mainContainer}>
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
            <Text style={styles.itemSubtitle}>Movies</Text>
          </View>
          {person.cast &&
            person.cast.map(c => (
              <ListItem
                key={c.id}
                leftAvatar={{
                  rounded: false,
                  source: { uri: TMDB_IMAGE_BASE_URL + "/w500" + c.poster_path }
                }}
                title={c.title}
                subtitle={c.character}
                bottomDivider
                chevron
                onPress={() => {
                  this.props.navigation.dispatch(
                    StackActions.push({
                      routeName: "MediaItemDetails",
                      params: {
                        item: {
                          id: c.id,
                          title: c.title,
                          release_date: c.release_date,
                          backdrop_path: c.backdrop_path
                        }
                      }
                    })
                  );
                }}
              />
            ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  reload() {
    const { id } = this.props.navigation.state.params;

    this.props.personGetActions(id).then(this.processDetails.bind(this));
    this.props
      .personMovieCreditsAction(id)
      .then(this.processDetails.bind(this));
  }

  processDetails() {
    const { id } = this.props.navigation.state.params;
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  contentContainerStyle: {
    paddingVertical: moderateScale(15)
  },

  mainContainer: {
    paddingHorizontal: moderateScale(15)
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
  },

  itemSubtitle: {
    marginTop: moderateScale(15),
    marginBottom: moderateScale(5),
    fontSize: moderateScale(20),
    fontWeight: "bold"
  }
});
