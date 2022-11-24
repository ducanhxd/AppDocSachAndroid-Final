import {
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header, Input, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookItem from "./../small component/BookItem";
import sach from "../data/sach.json";
import sachhot from "../data/sachhot.json";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { render } from "react-dom";

export default function Home({ navigation }) {
  const [apidata, setApidata] = useState([]);
  const [apidata2, setApidata2] = useState([]);
  const [search, setsearch] = useState("");
  const [user, setuser] = useState(null);
  const [namebook, setnamebook] = useState("");
  let urlpro = `https://63783b1e0992902a25181978.mockapi.io/Books`;
  let urlpro2 = `https://63783b1e0992902a25181978.mockapi.io/HotBooks`;
  const renderItem = ({ item, index }) => {
    return <BookItem item={item} index={index} navigation={navigation} />;
  };
  const getUserData = async () => {
    let curUser = await AsyncStorage.getItem("curUser");
    curUser = JSON.parse(curUser);
    setuser(curUser);
  };
  const getapi = () => {
    axios
      .get(`https://63783b1e0992902a25181978.mockapi.io/Books`)
      .then((Response) => {
        setApidata(Response.data);
      });
    axios
      .get(`https://63783b1e0992902a25181978.mockapi.io/HotBooks`)
      .then((Response) => {
        setApidata2(Response.data);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);
  useEffect(function () {
    fetch(urlpro)
      .then((e) => e.json())
      .then((rep) => setApidata(rep))
      .catch((err) => {
        setApidata([]);
      });
  }, []);
  useEffect(function () {
    fetch(urlpro2)
      .then((e) => e.json())
      .then((rep) => setApidata2(rep))
      .catch((err) => {
        setApidata2([]);
      });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Header
          centerComponent={{ text: "Trang Chủ", style: { color: "#fff" } }}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View>
            <TextInput button
            
              style={styles.TextInputStyle}
              placeholder="Tìm kiếm sách"
              underlineColorAndroid="transparent"
              onChangeText={setnamebook}
              onPress={() => {
                navigation.navigate("BookSearch", { name: namebook });
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.sectionContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/new-icon.gif")}
            style={{ height: 40, width: 40 }}
          />
          <Text style={styles.title}>Sách Mới</Text>
          <Image
            source={require("../assets/new-icon.gif")}
            style={{ height: 40, width: 40 }}
          />
        </View>
        <FlatList
          style={{ marginRight: 15 }}
          data={apidata}
          horizontal={true}
          renderItem={renderItem}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/hot-icon.gif")}
            style={{ height: 50, width: 50 }}
          />
          <Text style={styles.title}>Sách Hot</Text>
          <Image
            source={require("../assets/hot-icon.gif")}
            style={{ height: 50, width: 50 }}
          />
        </View>
        <FlatList
          style={{ marginRight: 15 }}
          data={apidata2}
          horizontal={true}
          renderItem={renderItem}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/heart-icon.gif")}
            style={{ height: 50, width: 50 }}
          />
          <Text style={styles.title}>Dành cho bạn</Text>
          <Image
            source={require("../assets/heart-icon.gif")}
            style={{ height: 50, width: 50 }}
          />
        </View>
        <FlatList
          style={{ marginRight: 15 }}
          data={sachhot}
          horizontal={true}
          renderItem={renderItem}
          contentContainerStyle={{ marginBottom: -10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  TextInputStyle: {
    height: 35,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",
  },
});
