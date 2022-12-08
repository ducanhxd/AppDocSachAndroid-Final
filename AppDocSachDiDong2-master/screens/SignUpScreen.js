import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header, Input, Button } from "react-native-elements";
import logo from "../assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import { withNavigation } from "react-navigation";
import axios from "axios";

export default function SignUpScreen({ navigation }) {
  const [Email, setemail] = useState("");
  const [Name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [Phone, setphone] = useState("");
  const onGoBack = () => {
    navigation.goBack();
  };
  const onSignUp = () => {
    if (Name.trim() == "" || !Name) {
      alert("Không được để trống họ và tên !");
    } else if (Email.trim() == "" || !Email) {
      alert("Không được để trống email !");
    } else if (password.trim() == "" || !password) {
      alert("Không được để trống mật khẩu !");
    } else if (Phone.trim() == "" || !Phone) {
      alert("Không được để trống số điện thoại !");
    } else {
      createAccount();
    }
  };
  const createAccount = async () => {
    try {
      const res = await axios.get(
        `https://didong-api.onrender.com/user/${Email.trim()}`
      );
      if (res.data.Email == Email.trim()) {
        alert("Email đã được đăng ký!");
        return;
      } else {
        const res = await axios.post("https://didong-api.onrender.com/user", {
          Name: Name.trim(),
          Email: Email.trim(),
          password: password.trim(),
          Phone: Phone.trim(),
        });
        alert("Đăng ký thành công!");
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.header}>
        <Header
          centerComponent={{ text: "Đăng ký", style: { color: "#fff" } }}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Image
            source={require("../assets/back-button.png")}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>

        <View style={styles.container}>
          <View>
            <Image
              source={logo}
              style={{
                width: 200,
                height: 150,
                marginLeft: 100,
                marginTop: -90,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            />
            <Text
              style={{ marginBottom: 20, textAlign: "center", fontSize: 25 }}
            >
              Đăng Ký Tài Khoản
            </Text>
            <Input
              placeholder="Tài Khoản"
              leftIcon={<Icon name="user" size={24} color="blue" />}
              onChangeText={setname}
            />

            <Input
              placeholder="Số Điện Thoại"
              leftIcon={<Icon name="phone" size={24} color="blue" />}
              onChangeText={setphone}
            />

            <Input
              placeholder="Email"
              leftIcon={<Icon name="lock" size={24} color="blue" />}
              onChangeText={setemail}
            />

            <Input
              placeholder="Mật Khẩu"
              secureTextEntry={true}
              leftIcon={<Icon name="lock" size={24} color="blue" />}
              onChangeText={setpassword}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
                style={{
                  borderWidth: 1,
                  height: 42,
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 40,
                }}
              >
                <Text>Trở Lại Đăng Nhập</Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => {
                //   navigation.navigate("SignUp");
                // }}
                onPress={onSignUp}
                style={{
                  borderWidth: 1,
                  height: 42,
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 40,
                  display: "flex",
                }}
              >
                <Text>Đăng Kí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 100,
    justifyContent: "center",
    flexDirection: "column",
  },

  Button: {
    backgroundColor: "black",
  },
});
