import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import DashboardScreen from "./screens/DashboardScreen";
import AnimalNav from "./AnimalNav";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: 0,
            justifyContent: "center",
            alignContent: "center",
            ...styles.shadow
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
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    // bottom: 25,
                    // left: 20,
                    // right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    // borderRadius: 15,
                    height: 80,
                    ...styles.shadow
                }
            }}>

            <Tab.Screen name="dashboard" component={DashboardScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image
                                source={require("./assets/dashboard.png")}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94' }}> DASHBOARD </Text>

                        </View>
                    )
                }} />


            <Tab.Screen name="Animals" component={AnimalNav}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image
                                source={require("./assets/livestock.png")}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94' }}> ANIMALS </Text>

                        </View>
                    )
                }} />


        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }})