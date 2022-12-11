import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookDetailsScreen({ navigation, route }) {
  const params = route.params;
  const { item } = params;
  const onGoBack = () => {
    navigation.goBack();
  };
  const Separator = () => <View style={styles.separator} />;
  const showAlert = () => Alert.alert("Bạn đã gửi bình luận thành công");
  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={{ position: "relative" }}>
        <Image
          style={{ width: "100%", height: 550 }}
          source={{ uri: item.image }}
        />
        <TouchableOpacity
          onPress={onGoBack}
          style={{
            position: "absolute",
            top: 30,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
        >
          <Image
            style={{ height: 37, width: 37, color: "white" }}
            source={require("../assets/back-button.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: "#000",
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 24,
          }}
        >
          MÔ TẢ:
        </Text>
        <Text
          style={{
            color: "gray",
            fontSize: 20,
          }}
        >
          {item.description}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View>
            <View
              style={{
                backgroundColor: "#f4f4f4",
                borderRadius: 100,
                paddingHorizontal: 8,
              }}
            ></View>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <Button
          title="Đọc sách bản đầy đủ ngay!"
          onPress={() => WebBrowser.openBrowserAsync(item.url)}
        />
        <Separator />
        <View style={styles.commentContainer}>
          <Text style={styles.titleComment}>
            Để lại bình luận của bạn tại đây
          </Text>
          <TextInput style={styles.input} placeholder="Bình luận của bạn" />
          <Button
            styles={styles.buttonComment}
            onPress={showAlert}
            title="Bình luận"
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  commentContainer: {
    margin: 10,
    padding: 20,
  },
  titleComment: {
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    top: 20,
    marginBottom: 50,
    multiline: true,
  },
  buttonComment: {},
});
