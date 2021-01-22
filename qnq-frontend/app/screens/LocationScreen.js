import React, { useEffect, useState } from "react";

import { StatusBar, setStatusBarStyle } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";

import ReviewItem from "../components/ReviewItem";
import styles from "../styles/location-styles";
import { API_URL, USER_TOKEN } from "../constants";

export default function LocationScreen({ route, navigation }) {
  const [reviews, setReviews] = useState([]);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const {
    place: { id }
  } = route.params;

  const loadReviewsAsync = async () => {
    fetch(API_URL + `reviews/location/${id}?page=${reviewsPage}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(jsonResponse => jsonResponse.json())
      .then(response => {
        if (response.error) {
          return;
        }

        appendReviews(response);
        setIsLoadingReviews(false);
        if (response.length > 0) setReviewsPage(reviewsPage + 1);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const appendReviews = newReviews => {
    setReviews([...reviews, ...newReviews]);
  };
  const renderReview = ({ item }) => <ReviewItem review={item} />;

  useEffect(() => {
    loadReviewsAsync();
  }, []);

  return (
    <View>
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsHeader}>Reviews</Text>
        {isLoadingReviews ? (
          <ActivityIndicator size="large" color="lightgray" />
        ) : reviews.length == 0 ? (
          <Text style={styles.noReviewsBanner}>No reviews yet</Text>
        ) : (
          <FlatList
            data={reviews}
            renderItem={renderReview}
            keyExtractor={item => item._id}
          />
        )}
      </View>
    </View>
  );
}
