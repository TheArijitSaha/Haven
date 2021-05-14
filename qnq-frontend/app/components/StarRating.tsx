import React, { useState } from "react";

import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

type StarRatingProps = {
  starSize?: number;
  starCount?: number;
  initialRating?: number;
  disabled?: boolean;
  onRatingChange?: (_: number) => void;
};

const StarRating = ({
  onRatingChange = (_: number) => {},
  initialRating = 0,
  starSize = 30,
  starCount = 5,
  disabled = true,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);

  const stars = [];
  for (let index = 0; index < starCount; ++index) {
    stars.push(
      <View key={index + 1} style={styles.starView}>
        <Icon
          name="star"
          color="#dddddd"
          size={starSize}
          style={styles.starBackground}
          onPress={
            disabled
              ? () => {}
              : rating > index
              ? () => {}
              : () => {
                  setRating(index + 1);
                  onRatingChange(index + 1);
                }
          }
        />
        {Math.floor(rating) > index && (
          <Icon
            name="star"
            color="gold"
            size={starSize}
            style={styles.starForeground}
            onPress={
              disabled
                ? () => {}
                : () => {
                    setRating(index + 1);
                    onRatingChange(index + 1);
                  }
            }
          />
        )}
      </View>
    );
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 30,
  },
  starView: {},
  starBackground: { position: "relative" },
  starForeground: { position: "absolute" },
});

export default StarRating;
