import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

function BookItem(props) {
  const { item, navigation, index } = props;
  const goToDetail = () => {
    if (navigation) {
      navigation.navigate("BookDetailsScreen", {
        item: item,
      });
    }
  };
  return (
    <TouchableOpacity style={{ ...styles.container }} onPress={goToDetail}>
      <Image style={styles.imageStyle} source={{ uri: item?.image }} />
      <View style={styles.infoContainer}>
        <Text
          numberOfLines={2}
          style={{
            color: "#000",
            fontWeight: "bold",
            marginVertical: 10,
            textAlign: "center",
          }}
        >
          {item?.name}
        </Text>
        <View style={styles.rating}>
          <FontAwesome
            style={styles.star}
            name="star"
            size={18}
            color={"#e47911"}
          />
          <FontAwesome
            style={styles.star}
            name="star"
            size={18}
            color={"#e47911"}
          />
          <FontAwesome
            style={styles.star}
            name="star"
            size={18}
            color={"#e47911"}
          />
          <FontAwesome
            style={styles.star}
            name="star"
            size={18}
            color={"#e47911"}
          />
          <FontAwesome
            style={styles.star}
            name="star"
            size={18}
            color={"#e47911"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default BookItem;

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: 150,
    borderRadius: 14,
  },
  container: {
    width: 150,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginLeft: 12,
    flex: 1,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  infoContainer: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  rating: {
    flexDirection: "row",
  },
  star: {
    left: 10,
    margin: 3.5,
    marginBottom: 10,
  },
});
