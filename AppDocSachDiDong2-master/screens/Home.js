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
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header, Input, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookItem from "./../small component/BookItem";
import sach from "../data/sach.json";
import sachhot from "../data/sachhot.json";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { render } from "react-dom";
import { FontAwesome } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const [apidata, setApidata] = useState([]);
  const [apidata2, setApidata2] = useState([]);
  const [apidata3, setApidata3] = useState([]);
  const [search, setsearch] = useState("");
  const [user, setuser] = useState(null);
  const [namebook, setnamebook] = useState("");
  let urlpro = `https://63783b1e0992902a25181978.mockapi.io/Books`;
  let urlpro2 = `https://63783b1e0992902a25181978.mockapi.io/HotBooks`;
  let urlpro3 = `https://63783b1e0992902a25181978.mockapi.io/ForYou`;
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
    axios
      .get(`https://63783b1e0992902a25181978.mockapi.io/ForYou`)
      .then((Response) => {
        setApidata3(Response.data);
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
  useEffect(function () {
    fetch(urlpro3)
      .then((e) => e.json())
      .then((rep) => setApidata3(rep))
      .catch((err) => {
        setApidata3([]);
      });
  }, []);
  const Separator = () => <View style={styles.separator} />;
  return (
    <ScrollView>
      <View style={styles.header}>
        <Header
          centerComponent={{ text: "Trang Chủ", style: { color: "#fff" } }}
        />
      </View>
      <View>
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
            horizontal={true}
            renderItem={renderItem}
            contentContainerStyle={{ marginBottom: -10 }}
            data={apidata3}
          />
        </View>
        <View>
          <Button
            title="Xem tất cả sách!"
            name="search"
            onPress={() => {
              navigation.navigate("BookSearch", { name: namebook });
            }}
          />
        </View>
        <Separator />
        <View>
          <Button
            title="Đăng xuất"
            color="#000000"
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          />
        </View>
      </View>
    </ScrollView>
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
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
