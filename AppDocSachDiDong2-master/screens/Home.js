import {
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header, Input, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookItem from "./../small component/BookItem";
import sach from "../data/sach.json";
import { render } from "react-dom";

export default function Home({ navigation }) {
  const [user, setuser] = useState(null);
  const renderItem = ({ item, index }) => {
    return <BookItem item={item} index={index} navigation={navigation} />;
  };
  const getUserData = async () => {
    let curUser = await AsyncStorage.getItem("curUser");
    curUser = JSON.parse(curUser);
    setuser(curUser);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <ScrollView>
      <View style={styles.header}>
        <Header
          centerComponent={{ text: "Trang Chủ", style: { color: "#fff" } }}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Sách Mới</Text>
        <FlatList
          style={{ marginRight: 15 }}
          columnWrapperStyle={{ flexWrap: "wrap", flex: 2, marginTop: 15 }}
          data={sach}
          horizontal={false}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
