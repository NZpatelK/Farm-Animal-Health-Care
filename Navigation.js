import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet} from 'react-native';
import DashboardScreen from "./screens/DashboardScreen";
import AnimalNav from "./AnimalNav";

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="dashboard" component={DashboardScreen} />
            <Tab.Screen name="Animals" component={AnimalNav} options={{headerShown: false}} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})