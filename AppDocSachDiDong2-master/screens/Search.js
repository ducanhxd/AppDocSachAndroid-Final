import axios from "axios";
import { memo, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Keyboard,
  LogBox,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import BookItem from "./../small component/BookItem";

export default function Search({ route }) {
  const navigation = useNavigation();

  const url = "https://63783b1e0992902a25181978.mockapi.io";
  const [data, setdata] = useState([]);
  const [datasearch, setdatasearch] = useState([]);
  LogBox.ignoreLogs([
    "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
  ]);

  const renderItem = ({ item, index }) => {
    return <BookItem item={item} index={index} navigation={navigation} />;
  };

  function format(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    axios
      .get(`https://63783b1e0992902a25181978.mockapi.io/Book`)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        setdata([]);
      });
  }, []);

  return (
    <ScrollView>
      <View>
        <View style={{ marginTop: 50 }}>
          <Text style={{ textAlign: "center", fontSize: 30 }}>
            Tất cả các sách:
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          <FlatList
            data={data}
            // renderItem={({ item }) => <Item name={item.name} />}
            renderItem={renderItem}
            numColumns={2}
            horizontal={false}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  wrap: {
    flex: 1,
  },
  list: {
    backgroundColor: "#fff",
    margin: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#cccc",
    borderRadius: 5,
    justifyContent: "center",
    height: 250,
  },
  img: {
    width: 150,
    height: 150,
  },
  icon: {
    backgroundColor: "#F0FFF0",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
