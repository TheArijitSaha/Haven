import React, { useContext, useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useIsDrawerOpen } from "@react-navigation/drawer";
import { StackActions } from "@react-navigation/native";

import StarRating from "../components/StarRating";
import { API_URL } from "../constants";
import { UserContext } from "../contexts/UserContext";

export default function LocationScreen({ route, navigation }) {
  const maxScore = 5;

  const [isPosting, setIsPosting] = useState(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewScore, setReviewScore] = useState(0);
  const { place } = route.params;
  const { user } = useContext(UserContext);
  const isDrawerOpen = useIsDrawerOpen();

  const postReview = async () => {
    if (isPosting) return;
    if (reviewTitle.length < 1) {
      Alert.alert("Title must be there!");
      return;
    }

    if (reviewScore < 1 || reviewScore > maxScore) {
      Alert.alert("Score must be there!");
      return;
    }

    setIsPosting(true);

    fetch(API_URL + `reviews/location/${place.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify({
        score: reviewScore,
        title: reviewTitle,
        text: reviewText,
        creator: user._id,
      }),
    })
      .then((jsonResponse) => jsonResponse.json())
      .then((response) => {
        if (response.error) {
          //TODO: change this alert to reflect in UI
          Alert.alert(response.error);
          setIsPosting(false);
          return;
        }

        navigation.dispatch(StackActions.pop(2));
        navigation.dispatch(StackActions.push("Location", { place: place }));
        navigation.navigate("Review", { review: response });
      })
      .catch((error) => {
        console.error(error);
        setIsPosting(false);
      });
  };

  return (
    <SafeAreaView style={styles.createReviewContainer}>
      <StatusBar style={isDrawerOpen ? "light" : "dark"} />

      <ScrollView style={styles.createReviewScrollView}>
        <View style={styles.scorer}>
          <StarRating
            initialRating={0}
            starCount={maxScore}
            onRatingChange={setReviewScore}
          />
        </View>

        <TextInput
          placeholder={"Review Title"}
          style={styles.reviewTitleInput}
          onChangeText={(text) => setReviewTitle(text)}
        />

        <TextInput
          placeholder={"Write something"}
          style={styles.reviewTextInput}
          multiline={true}
          numberOfLines={3}
          scrollEnabled={false}
          onChangeText={(text) => setReviewText(text)}
        />
        <View style={styles.postView}>
          <Button
            style={styles.postButton}
            onPress={postReview}
            title="Post"
            color="#2979ba"
            disabled={isPosting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  createReviewContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  createReviewScrollView: { flex: 1 },
  postView: {
    paddingLeft: 25,
    paddingRight: 25,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  postButton: {},
  reviewTitleInput: {
    fontSize: 18,
    marginHorizontal: 20,
    marginTop: 7,
    padding: 10,
    paddingBottom: 0,
    fontWeight: "bold",
  },

  scorer: {
    paddingHorizontal: "20%",
    paddingTop: 10,
    marginTop: 10,
  },

  reviewTextInput: {
    textAlignVertical: "top",
    fontSize: 18,
    margin: 20,
    marginBottom: 13,
    padding: 10,
    borderColor: "lightgray",
    borderWidth: 2,
    borderRadius: 5,
  },
});
