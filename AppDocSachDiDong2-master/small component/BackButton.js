import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { Image } from "react-native";

export default function BackButton ({ navigation }) {
    return (
      <View>
        <Image source={require('../assets/back-button.png')} />
      </View>
    )
}

const styles = StyleSheet.create({})