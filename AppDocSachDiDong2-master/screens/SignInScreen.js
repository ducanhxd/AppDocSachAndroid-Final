import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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
import SignUpScreen from "./SignUpScreen";
const URL = "localhost:3000/login";
let urluser = `https://didong-api.onrender.com/user`;

export default function SignInScreen({ navigation }) {
  const [Email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const goToHome = () => {
    if (Email.trim() == "" || !Email) {
      alert("Không được để trống email !");
    } else if (password.trim() == "" || !password) {
      alert("Không được để trống mật khẩu ! ");
      // alert('Không được để trống mật khẩu ! ' + password.trim());
    } else {
      login();
    }
  };

  const login = async () => {
    try {
      const res = await axios.get(
        `https://didong-api.onrender.com/user/${Email.trim()}`
      );

      if (res.data.password == password.trim()) {
        navigation.navigate("Home");
      } else {
        alert(`Email hoặc mật khẩu không chính xác!`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const goToSignUp = async () => {
    navigation.navigate("SignUpScreen");
  };
  const checkLogin = async () => {
    let userData = await AsyncStorage.getItem("curUser");
    if (userData) navigation.replace("Home");
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.header}>
        <Header
          centerComponent={{ text: "Đăng nhập", style: { color: "#fff" } }}
        />
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
              Đăng Nhập Tài Khoản
            </Text>
            <Input
              placeholder="Tài Khoản"
              Text="Username"
              onChangeText={setemail}
              leftIcon={<Icon name="user" size={24} color="blue" />}
            />

            <Input
              placeholder="Mật Khẩu"
              secureTextEntry={true}
              Text="Password"
              onChangeText={setpassword}
              leftIcon={<Icon name="lock" size={24} color="blue" />}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                // onPress={() => {
                //   navigation.navigate("Home");
                // }}
                onPress={goToHome}
                style={{
                  borderWidth: 1,
                  height: 42,
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 40,
                }}
              >
                <Text>Đăng Nhập</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
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
                <Text>Đăng Kí Tài Khoản</Text>
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
