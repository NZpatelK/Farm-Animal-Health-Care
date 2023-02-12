import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet} from 'react-native';
import DashboardScreen from "./screens/DashboardScreen";
import AnimalHealthScreen from "./screens/AnimalHealthScreen";

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="dashboard" component={DashboardScreen} />
            <Tab.Screen name="Animal Health" component={AnimalHealthScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})