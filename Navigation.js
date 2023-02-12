import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
    style={{
        top: 0,
        justifyContent: "center",
        alignContent:"center",
        ...style.shadow
    }}
    onPress={onPress}
    >
        <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

export default function Navigation() {
  return (
    <View>
      <Text>Navigation</Text>
    </View>
  )
}

const styles = StyleSheet.create({})