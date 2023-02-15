import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AnimalHealthScreen from './screens/AnimalHealthScreen';
import ListAnimalScreen from './screens/ListAnimalScreen';



export default function AnimalNav() {
 
    const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='Animal Health'>
        <Stack.Screen name="Animal Health" component={AnimalHealthScreen} />
        <Stack.Screen name="List of Animal" component={ListAnimalScreen} options={({ route }) => ({ title: route.params?.title ?? 'List of Animal' },{headerBackTitle: "Back"})}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})