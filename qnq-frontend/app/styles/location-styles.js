import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { minHeight: "100%", backgroundColor: "white" },
  locationRatingView: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  locationRating: {
    fontWeight: "bold",
  },
  myImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  myReviewContainer: {
    padding: 10,
    paddingBottom: 10,
    backgroundColor: "#fcf3f0",
    alignItems: "center",
    width: "100%",
  },
  myReviewBannerPrimary: {
    justifyContent: "center",
    fontWeight: "bold",
  },
  myReviewBannerSecondary: {
    justifyContent: "center",
    textAlign: "center",
  },
  reviewsContainer: {
    backgroundColor: "white",
  },
  reviewList: {},
  reviewsHeader: {
    fontSize: 20,
    padding: 13,
    paddingTop: 3,
  },
  noReviewsBanner: {
    textAlign: "center",
    color: "gray",
  },
});

export default styles;
